import { supabase } from "./supabase";
import type { Order, OrderStatus } from "@linked-all/types";

export interface CreateOrderInput {
  userId: string;
  vendorId: string;
  items: {
    productId: string;
    variantId?: string;
    quantity: number;
    unitPrice: number;
  }[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
  };
  subtotal: number;
  tax?: number;
  shippingFee?: number;
  discount?: number;
  linkedCoinDiscount?: number;
  currency?: string;
  notes?: string;
}

/**
 * Generate unique order number
 */
function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `LA-${timestamp}-${random}`;
}

/**
 * Create a new order
 */
export async function createOrder(input: CreateOrderInput) {
  // Generate order number
  const orderNumber = generateOrderNumber();

  // Calculate total
  const tax = input.tax || 0;
  const shippingFee = input.shippingFee || 0;
  const discount = input.discount || 0;
  const linkedCoinDiscount = input.linkedCoinDiscount || 0;
  const total =
    input.subtotal + tax + shippingFee - discount - linkedCoinDiscount;

  // Verify products exist and get details
  const productIds = input.items.map((item) => item.productId);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, name, sku, images, vendor_id, quantity")
    .in("id", productIds);

  if (productsError || !products || products.length !== productIds.length) {
    throw new Error("One or more products not found");
  }

  // Verify all products belong to the same vendor
  const vendorIds = new Set(products.map((p) => p.vendor_id));
  if (vendorIds.size > 1 || !vendorIds.has(input.vendorId)) {
    throw new Error("All products must belong to the same vendor");
  }

  // Check inventory
  for (const item of input.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    if (product.quantity < item.quantity) {
      throw new Error(
        `Insufficient inventory for product ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`
      );
    }
  }

  // Create order
  const { data: orderData, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      user_id: input.userId,
      vendor_id: input.vendorId,
      status: "pending",
      subtotal: input.subtotal,
      tax: tax,
      shipping_fee: shippingFee,
      discount: discount,
      linked_coin_discount: linkedCoinDiscount,
      total: total,
      currency: input.currency || "NGN",
      shipping_address: input.shippingAddress,
      notes: input.notes || null,
    })
    .select()
    .single();

  if (orderError) {
    throw new Error(orderError.message);
  }

  // Create order items and update inventory
  const orderItems = [];
  for (const item of input.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) continue;

    // Create order item
    const { data: orderItem, error: itemError } = await supabase
      .from("order_items")
      .insert({
        order_id: orderData.id,
        product_id: item.productId,
        variant_id: item.variantId || null,
        name: product.name,
        sku: product.sku,
        quantity: item.quantity,
        unit_price: item.unitPrice,
        total_price: item.unitPrice * item.quantity,
        thumbnail_url: product.images?.[0] || null,
      })
      .select()
      .single();

    if (itemError) {
      // Rollback order if item creation fails
      await supabase.from("orders").delete().eq("id", orderData.id);
      throw new Error(itemError.message);
    }

    orderItems.push(orderItem);

    // Update product inventory
    await supabase
      .from("products")
      .update({
        quantity: product.quantity - item.quantity,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.productId);
  }

  return {
    ...orderData,
    items: orderItems,
  };
}

/**
 * Get order by ID
 */
export async function getOrderById(orderId: string, userId?: string) {
  let query = supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*),
      vendor:vendors!orders_vendor_id_fkey(
        id,
        business_name,
        verification_status
      )
    `)
    .eq("id", orderId);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query.single();

  if (error) {
    throw new Error(error.message);
  }

  return mapOrderFromDb(data);
}

/**
 * Get order by order number
 */
export async function getOrderByNumber(
  orderNumber: string,
  userId?: string
) {
  let query = supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*),
      vendor:vendors!orders_vendor_id_fkey(
        id,
        business_name,
        verification_status
      )
    `)
    .eq("order_number", orderNumber);

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query.single();

  if (error) {
    throw new Error(error.message);
  }

  return mapOrderFromDb(data);
}

/**
 * List orders with filters
 */
export interface OrderFilters {
  userId?: string;
  vendorId?: string;
  status?: OrderStatus;
  page?: number;
  limit?: number;
}

export async function listOrders(filters: OrderFilters = {}) {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("orders")
    .select(
      `
      *,
      items:order_items(*),
      vendor:vendors!orders_vendor_id_fkey(
        id,
        business_name,
        verification_status
      )
    `,
      { count: "exact" }
    );

  if (filters.userId) {
    query = query.eq("user_id", filters.userId);
  }

  if (filters.vendorId) {
    query = query.eq("vendor_id", filters.vendorId);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  }

  query = query.order("created_at", { ascending: false });
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    orders: data.map(mapOrderFromDb),
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

/**
 * Update order status
 */
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  userId?: string
) {
  // Verify ownership if userId provided
  if (userId) {
    const { data: order } = await supabase
      .from("orders")
      .select("user_id, vendor_id")
      .eq("id", orderId)
      .single();

    if (!order || (order.user_id !== userId && order.vendor_id !== userId)) {
      throw new Error("Order not found or access denied");
    }
  }

  const updateData: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  // Set status-specific timestamps
  if (status === "confirmed") {
    updateData.confirmed_at = new Date().toISOString();
  } else if (status === "processing") {
    updateData.processing_at = new Date().toISOString();
  } else if (status === "out_for_delivery") {
    updateData.shipped_at = new Date().toISOString();
  } else if (status === "delivered") {
    updateData.delivered_at = new Date().toISOString();
  } else if (status === "cancelled") {
    updateData.cancelled_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", orderId)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapOrderFromDb(data);
}

/**
 * Cancel order
 */
export async function cancelOrder(orderId: string, userId: string) {
  // Get order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .eq("user_id", userId)
    .single();

  if (orderError || !order) {
    throw new Error("Order not found or access denied");
  }

  // Only allow cancellation of pending or confirmed orders
  if (!["pending", "confirmed"].includes(order.status)) {
    throw new Error(
      `Cannot cancel order with status: ${order.status}. Only pending or confirmed orders can be cancelled.`
    );
  }

  // Restore inventory
  const { data: items } = await supabase
    .from("order_items")
    .select("product_id, quantity")
    .eq("order_id", orderId);

  if (items) {
    for (const item of items) {
      // Get current quantity and increment
      const { data: product } = await supabase
        .from("products")
        .select("quantity")
        .eq("id", item.product_id)
        .single();

      if (product) {
        await supabase
          .from("products")
          .update({
            quantity: product.quantity + item.quantity,
            updated_at: new Date().toISOString(),
          })
          .eq("id", item.product_id);
      }
    }
  }

  // Update order status
  return updateOrderStatus(orderId, "cancelled", userId);
}

/**
 * Map database order to API format
 */
function mapOrderFromDb(dbOrder: any): any {
  return {
    id: dbOrder.id,
    orderNumber: dbOrder.order_number,
    userId: dbOrder.user_id,
    vendorId: dbOrder.vendor_id,
    status: dbOrder.status as OrderStatus,
    pricing: {
      subtotal: parseFloat(dbOrder.subtotal),
      tax: parseFloat(dbOrder.tax || 0),
      shippingFee: parseFloat(dbOrder.shipping_fee || 0),
      discount: parseFloat(dbOrder.discount || 0),
      linkedCoinDiscount: parseFloat(dbOrder.linked_coin_discount || 0),
      total: parseFloat(dbOrder.total),
      currency: dbOrder.currency,
    },
    items: (dbOrder.items || []).map((item: any) => ({
      id: item.id,
      productId: item.product_id,
      variantId: item.variant_id,
      name: item.name,
      sku: item.sku,
      quantity: item.quantity,
      unitPrice: parseFloat(item.unit_price),
      totalPrice: parseFloat(item.total_price),
      thumbnail: item.thumbnail_url,
    })),
    fulfillment: {
      method: "delivery" as const,
      shippingAddress: dbOrder.shipping_address,
    },
    payment: {
      paymentId: dbOrder.id, // Placeholder, will be updated when payment is created
      method: "pending",
      status: "pending" as const,
    },
    timeline: {
      createdAt: dbOrder.created_at,
      confirmedAt: dbOrder.confirmed_at,
      processingAt: dbOrder.processing_at,
      shippedAt: dbOrder.shipped_at,
      deliveredAt: dbOrder.delivered_at,
      cancelledAt: dbOrder.cancelled_at,
    },
    notes: dbOrder.notes || undefined,
    createdAt: dbOrder.created_at,
    updatedAt: dbOrder.updated_at,
  };
}
