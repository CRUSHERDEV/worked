import type { UUID, Timestamp, Currency, Address } from "./common";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  READY_FOR_PICKUP = "ready_for_pickup",
  OUT_FOR_DELIVERY = "out_for_delivery",
  DELIVERED = "delivered",
  CANCELLED = "cancelled",
  REFUNDED = "refunded",
  FAILED = "failed",
}

export enum FulfillmentMethod {
  DELIVERY = "delivery",
  PICKUP = "pickup",
}

export interface Order {
  id: UUID;
  orderNumber: string;
  userId: UUID;
  vendorId: UUID;
  status: OrderStatus;
  items: OrderItem[];
  pricing: OrderPricing;
  fulfillment: OrderFulfillment;
  payment: OrderPaymentInfo;
  timeline: OrderTimeline;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface OrderItem {
  id: UUID;
  productId: UUID;
  variantId?: UUID;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnail?: string;
}

export interface OrderPricing {
  subtotal: number;
  tax: number;
  shippingFee: number;
  discount: number;
  linkedCoinDiscount?: number;
  total: number;
  currency: Currency;
}

export interface OrderFulfillment {
  method: FulfillmentMethod;
  shippingAddress?: Address;
  pickupLocation?: {
    name: string;
    address: Address;
  };
  estimatedDeliveryDate?: Timestamp;
  actualDeliveryDate?: Timestamp;
  trackingNumber?: string;
  carrierId?: UUID;
  shipmentId?: UUID;
}

export interface OrderPaymentInfo {
  paymentId: UUID;
  method: string;
  status: "pending" | "processing" | "completed" | "failed" | "refunded";
  paidAt?: Timestamp;
}

export interface OrderTimeline {
  createdAt: Timestamp;
  confirmedAt?: Timestamp;
  processingAt?: Timestamp;
  shippedAt?: Timestamp;
  deliveredAt?: Timestamp;
  cancelledAt?: Timestamp;
}

export interface Cart {
  id: UUID;
  userId: UUID;
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  currency: Currency;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface CartItem {
  id: UUID;
  productId: UUID;
  variantId?: UUID;
  vendorId: UUID;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  thumbnail?: string;
  available: boolean;
}
