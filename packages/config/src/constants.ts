/**
 * Application-wide constants for Linked All platform
 */

export const APP_NAME = "Linked All";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION =
  "A pan-African, multi-vertical digital ecosystem connecting consumers, vendors, and producers";

// API Configuration
export const API_VERSION = "v1";
export const API_TIMEOUT = 30000; // 30 seconds

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
export const MAX_PRODUCT_IMAGES = 10;

// Product
export const MIN_PRODUCT_PRICE = 0.01;
export const MAX_PRODUCT_PRICE = 10000000;
export const LOW_STOCK_THRESHOLD = 10;

// Order
export const ORDER_CANCELLATION_WINDOW = 24; // hours
export const ORDER_RETURN_WINDOW = 7; // days
export const ORDER_REVIEW_WINDOW = 30; // days

// Payment
export const MIN_WALLET_BALANCE = 0;
export const MAX_WALLET_BALANCE = 10000000;
export const TRANSACTION_FEE_PERCENTAGE = 2.5;
export const MIN_PAYOUT_AMOUNT = 1000;

// Rewards
export const LINKED_COIN_CONVERSION_RATE = 100; // 100 LinkedCoin = 1 unit of fiat
export const SIGNUP_REWARD = 100; // LinkedCoin
export const REFERRAL_REWARD = 500; // LinkedCoin
export const REVIEW_REWARD = 50; // LinkedCoin
export const PURCHASE_REWARD_PERCENTAGE = 1; // 1% of purchase value

// Ratings
export const MIN_RATING = 1;
export const MAX_RATING = 5;

// Search
export const SEARCH_DEBOUNCE_MS = 300;
export const SEARCH_MIN_CHARACTERS = 2;

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 60, // 1 minute
  MEDIUM: 300, // 5 minutes
  LONG: 3600, // 1 hour
  VERY_LONG: 86400, // 24 hours
};

// Rate Limiting
export const RATE_LIMIT = {
  PUBLIC_API: 60, // requests per minute
  AUTHENTICATED_API: 120,
  VENDOR_API: 300,
};

// OTP
export const OTP_LENGTH = 6;
export const OTP_EXPIRY_MINUTES = 10;
export const OTP_MAX_ATTEMPTS = 3;

// Session
export const SESSION_EXPIRY_DAYS = 30;
export const REFRESH_TOKEN_EXPIRY_DAYS = 90;
