/**
 * Common types used across the Linked All platform
 */

export type UUID = string;
export type Timestamp = Date | string;

export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
  SUSPENDED = "suspended",
  DELETED = "deleted",
}

export enum Currency {
  NGN = "NGN", // Nigerian Naira
  KES = "KES", // Kenyan Shilling
  GHS = "GHS", // Ghanaian Cedi
  ZAR = "ZAR", // South African Rand
  USD = "USD", // US Dollar
  EUR = "EUR", // Euro
}

export enum Country {
  NG = "NG", // Nigeria
  KE = "KE", // Kenya
  GH = "GH", // Ghana
  ZA = "ZA", // South Africa
}

export enum Language {
  EN = "en", // English
  SW = "sw", // Swahili
  HA = "ha", // Hausa
  YO = "yo", // Yoruba
  IG = "ig", // Igbo
  FR = "fr", // French
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: Country;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta?: Record<string, unknown>;
}
