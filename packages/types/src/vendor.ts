import type { UUID, Timestamp, Status, Address } from "./common";

export enum VendorTier {
  STARTER = "starter",
  GROWTH = "growth",
  ENTERPRISE = "enterprise",
}

export enum VendorType {
  INDIVIDUAL = "individual",
  SMALL_BUSINESS = "small_business",
  ENTERPRISE = "enterprise",
  FARMER = "farmer",
}

export interface Vendor {
  id: UUID;
  userId: UUID;
  businessName: string;
  type: VendorType;
  tier: VendorTier;
  status: Status;
  verificationStatus: "pending" | "verified" | "rejected";
  profile: VendorProfile;
  settings: VendorSettings;
  analytics: VendorAnalytics;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface VendorProfile {
  logo?: string;
  banner?: string;
  description: string;
  category: string[];
  businessAddress: Address;
  contactEmail: string;
  contactPhone: string;
  businessRegistrationNumber?: string;
  taxId?: string;
  bankAccount?: {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
  };
  trustBadges: string[];
}

export interface VendorSettings {
  autoAcceptOrders: boolean;
  minOrderAmount?: number;
  maxOrderAmount?: number;
  processingTime: number; // in hours
  returnPolicy: string;
  shippingPolicy: string;
  operatingHours?: {
    monday: { open: string; close: string };
    tuesday: { open: string; close: string };
    wednesday: { open: string; close: string };
    thursday: { open: string; close: string };
    friday: { open: string; close: string };
    saturday?: { open: string; close: string };
    sunday?: { open: string; close: string };
  };
}

export interface VendorAnalytics {
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  totalReviews: number;
  fulfillmentRate: number;
  responseTime: number; // in hours
}
