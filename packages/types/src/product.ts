import type { UUID, Timestamp, Status, Currency } from "./common";

export enum ProductCategory {
  ELECTRONICS = "electronics",
  FASHION = "fashion",
  HOME_GARDEN = "home_garden",
  HEALTH_BEAUTY = "health_beauty",
  FOOD_BEVERAGES = "food_beverages",
  AGRICULTURE = "agriculture",
  AUTOMOTIVE = "automotive",
  BOOKS_MEDIA = "books_media",
  SPORTS = "sports",
  TOYS_GAMES = "toys_games",
  OTHER = "other",
}

export enum ProductCondition {
  NEW = "new",
  REFURBISHED = "refurbished",
  USED_LIKE_NEW = "used_like_new",
  USED_GOOD = "used_good",
  USED_ACCEPTABLE = "used_acceptable",
}

export interface Product {
  id: UUID;
  vendorId: UUID;
  name: string;
  description: string;
  category: ProductCategory;
  subCategory?: string;
  condition: ProductCondition;
  status: Status;
  pricing: ProductPricing;
  inventory: ProductInventory;
  media: ProductMedia;
  specifications: Record<string, string>;
  seo: ProductSEO;
  provenance?: ProductProvenance;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface ProductPricing {
  basePrice: number;
  currency: Currency;
  compareAtPrice?: number;
  costPrice?: number;
  taxRate?: number;
  discount?: {
    type: "percentage" | "fixed";
    value: number;
    startDate?: Timestamp;
    endDate?: Timestamp;
  };
}

export interface ProductInventory {
  sku: string;
  barcode?: string;
  trackInventory: boolean;
  quantity: number;
  lowStockThreshold: number;
  allowBackorder: boolean;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: "cm" | "in";
  };
}

export interface ProductMedia {
  images: string[];
  thumbnails: string[];
  videos?: string[];
  primaryImageIndex: number;
}

export interface ProductSEO {
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  keywords?: string[];
}

export interface ProductProvenance {
  origin: string;
  farmId?: UUID;
  harvestDate?: Timestamp;
  certifications?: string[];
  traceabilityCode?: string;
  verified: boolean;
}

export interface ProductVariant {
  id: UUID;
  productId: UUID;
  name: string;
  options: Record<string, string>; // e.g., { color: "red", size: "M" }
  sku: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface ProductReview {
  id: UUID;
  productId: UUID;
  userId: UUID;
  orderId: UUID;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean;
  helpful: number;
  createdAt: Timestamp;
}
