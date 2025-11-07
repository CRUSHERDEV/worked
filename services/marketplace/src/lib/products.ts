import { supabase } from "./supabase";
import type { Product, ProductCategory, ProductCondition } from "@linked-all/types";
import { generateSlug } from "@linked-all/utils";

export interface CreateProductInput {
  vendorId: string;
  name: string;
  description: string;
  category: ProductCategory;
  subCategory?: string;
  condition: ProductCondition;
  basePrice: number;
  currency: string;
  compareAtPrice?: number;
  costPrice?: number;
  sku: string;
  barcode?: string;
  quantity: number;
  trackInventory: boolean;
  lowStockThreshold?: number;
  allowBackorder?: boolean;
  weight?: number;
  images?: string[];
  specifications?: Record<string, string>;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
}

/**
 * Create a new product
 */
export async function createProduct(input: CreateProductInput) {
  const slug = generateSlug(input.name);

  // Check if slug already exists
  const { data: existing } = await supabase
    .from("products")
    .select("id")
    .eq("slug", slug)
    .single();

  let finalSlug = slug;
  if (existing) {
    finalSlug = `${slug}-${Date.now()}`;
  }

  const productData = {
    vendor_id: input.vendorId,
    name: input.name,
    description: input.description,
    category: input.category,
    sub_category: input.subCategory || null,
    condition: input.condition,
    status: "active",
    base_price: input.basePrice,
    currency: input.currency,
    compare_at_price: input.compareAtPrice || null,
    cost_price: input.costPrice || null,
    sku: input.sku,
    barcode: input.barcode || null,
    quantity: input.quantity,
    track_inventory: input.trackInventory,
    low_stock_threshold: input.lowStockThreshold || 10,
    allow_backorder: input.allowBackorder || false,
    weight: input.weight || null,
    images: input.images || [],
    specifications: input.specifications || {},
    meta_title: input.metaTitle || null,
    meta_description: input.metaDescription || null,
    slug: finalSlug,
    keywords: input.keywords || [],
  };

  const { data, error } = await supabase
    .from("products")
    .insert(productData)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductFromDb(data);
}

/**
 * Get product by ID
 */
export async function getProductById(productId: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      vendor:vendors!products_vendor_id_fkey(
        id,
        business_name,
        verification_status,
        average_rating
      )
    `)
    .eq("id", productId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductFromDb(data);
}

/**
 * Get product by slug
 */
export async function getProductBySlug(slug: string) {
  const { data, error } = await supabase
    .from("products")
    .select(`
      *,
      vendor:vendors!products_vendor_id_fkey(
        id,
        business_name,
        verification_status,
        average_rating
      )
    `)
    .eq("slug", slug)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductFromDb(data);
}

/**
 * List products with filters
 */
export interface ProductFilters {
  category?: ProductCategory;
  vendorId?: string;
  status?: "active" | "inactive";
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export async function listProducts(filters: ProductFilters = {}) {
  const page = filters.page || 1;
  const limit = filters.limit || 20;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("products")
    .select(`
      *,
      vendor:vendors!products_vendor_id_fkey(
        id,
        business_name,
        verification_status,
        average_rating
      )
    `, { count: "exact" });

  if (filters.category) {
    query = query.eq("category", filters.category);
  }

  if (filters.vendorId) {
    query = query.eq("vendor_id", filters.vendorId);
  }

  if (filters.status) {
    query = query.eq("status", filters.status);
  } else {
    // Default to active products only
    query = query.eq("status", "active");
  }

  if (filters.minPrice) {
    query = query.gte("base_price", filters.minPrice);
  }

  if (filters.maxPrice) {
    query = query.lte("base_price", filters.maxPrice);
  }

  if (filters.search) {
    query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  query = query.order("created_at", { ascending: false });
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return {
    products: data.map(mapProductFromDb),
    pagination: {
      page,
      limit,
      total: count || 0,
      totalPages: Math.ceil((count || 0) / limit),
    },
  };
}

/**
 * Update product
 */
export async function updateProduct(input: UpdateProductInput) {
  const updateData: any = {};

  if (input.name !== undefined) {
    updateData.name = input.name;
    if (input.name) {
      const slug = generateSlug(input.name);
      updateData.slug = slug;
    }
  }
  if (input.description !== undefined) updateData.description = input.description;
  if (input.category !== undefined) updateData.category = input.category;
  if (input.subCategory !== undefined) updateData.sub_category = input.subCategory;
  if (input.condition !== undefined) updateData.condition = input.condition;
  if (input.status !== undefined) updateData.status = input.status;
  if (input.basePrice !== undefined) updateData.base_price = input.basePrice;
  if (input.currency !== undefined) updateData.currency = input.currency;
  if (input.compareAtPrice !== undefined) updateData.compare_at_price = input.compareAtPrice;
  if (input.costPrice !== undefined) updateData.cost_price = input.costPrice;
  if (input.sku !== undefined) updateData.sku = input.sku;
  if (input.barcode !== undefined) updateData.barcode = input.barcode;
  if (input.quantity !== undefined) updateData.quantity = input.quantity;
  if (input.trackInventory !== undefined) updateData.track_inventory = input.trackInventory;
  if (input.lowStockThreshold !== undefined) updateData.low_stock_threshold = input.lowStockThreshold;
  if (input.allowBackorder !== undefined) updateData.allow_backorder = input.allowBackorder;
  if (input.weight !== undefined) updateData.weight = input.weight;
  if (input.images !== undefined) updateData.images = input.images;
  if (input.specifications !== undefined) updateData.specifications = input.specifications;
  if (input.metaTitle !== undefined) updateData.meta_title = input.metaTitle;
  if (input.metaDescription !== undefined) updateData.meta_description = input.metaDescription;
  if (input.keywords !== undefined) updateData.keywords = input.keywords;

  updateData.updated_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("products")
    .update(updateData)
    .eq("id", input.id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapProductFromDb(data);
}

/**
 * Delete product (soft delete by setting status to inactive)
 */
export async function deleteProduct(productId: string, vendorId: string) {
  // Verify ownership
  const { data: product } = await supabase
    .from("products")
    .select("vendor_id")
    .eq("id", productId)
    .single();

  if (!product || product.vendor_id !== vendorId) {
    throw new Error("Product not found or access denied");
  }

  const { error } = await supabase
    .from("products")
    .update({ status: "inactive", updated_at: new Date().toISOString() })
    .eq("id", productId);

  if (error) {
    throw new Error(error.message);
  }

  return { success: true };
}

/**
 * Map database product to API format
 */
function mapProductFromDb(dbProduct: any): Product {
  return {
    id: dbProduct.id,
    vendorId: dbProduct.vendor_id,
    name: dbProduct.name,
    description: dbProduct.description,
    category: dbProduct.category as ProductCategory,
    subCategory: dbProduct.sub_category || undefined,
    condition: dbProduct.condition as ProductCondition,
    status: dbProduct.status,
    pricing: {
      basePrice: parseFloat(dbProduct.base_price),
      currency: dbProduct.currency,
      compareAtPrice: dbProduct.compare_at_price ? parseFloat(dbProduct.compare_at_price) : undefined,
      costPrice: dbProduct.cost_price ? parseFloat(dbProduct.cost_price) : undefined,
    },
    inventory: {
      sku: dbProduct.sku,
      barcode: dbProduct.barcode || undefined,
      trackInventory: dbProduct.track_inventory,
      quantity: dbProduct.quantity,
      lowStockThreshold: dbProduct.low_stock_threshold,
      allowBackorder: dbProduct.allow_backorder,
      weight: dbProduct.weight ? parseFloat(dbProduct.weight) : undefined,
    },
    media: {
      images: dbProduct.images || [],
      thumbnails: dbProduct.images || [],
      primaryImageIndex: 0,
    },
    specifications: dbProduct.specifications || {},
    seo: {
      metaTitle: dbProduct.meta_title || undefined,
      metaDescription: dbProduct.meta_description || undefined,
      slug: dbProduct.slug,
      keywords: dbProduct.keywords || [],
    },
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  };
}
