/**
 * Product Types
 * Type definitions for products and related entities
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  image?: string;
  images?: string[];
  category?: string;
  categoryId?: string;
  vendorId?: string;
  vendor?: {
    id: string;
    name: string;
    rating?: number;
  };
  stock?: number;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  shipping: number;
  tax: number;
  status: OrderStatus;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentMethod?: string;
  paymentStatus?: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Address {
  id?: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
}

