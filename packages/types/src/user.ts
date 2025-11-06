import type { UUID, Timestamp, Status, Country, Language, Address } from "./common";

export enum UserRole {
  CONSUMER = "consumer",
  VENDOR = "vendor",
  DELIVERY_PARTNER = "delivery_partner",
  ADMIN = "admin",
  SUPER_ADMIN = "super_admin",
}

export interface User {
  id: UUID;
  email: string;
  phoneNumber: string;
  role: UserRole;
  status: Status;
  profile: UserProfile;
  preferences: UserPreferences;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastLoginAt?: Timestamp;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  avatar?: string;
  dateOfBirth?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  addresses: Address[];
  defaultAddressId?: UUID;
}

export interface UserPreferences {
  language: Language;
  currency: Currency;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  marketing: {
    email: boolean;
    sms: boolean;
  };
}

export interface KYCData {
  userId: UUID;
  status: "pending" | "verified" | "rejected";
  documentType: "national_id" | "passport" | "drivers_license" | "business_registration";
  documentNumber: string;
  documentImages: string[];
  verifiedAt?: Timestamp;
  rejectionReason?: string;
}
