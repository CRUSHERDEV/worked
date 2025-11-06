/**
 * Feature flags for the Linked All platform
 * Use environment variables to override defaults
 */

export interface FeatureFlags {
  // Marketplace
  enableMarketplace: boolean;
  enableProductSearch: boolean;
  enableProductReviews: boolean;
  enableWishlist: boolean;

  // Payments
  enableStripe: boolean;
  enablePaystack: boolean;
  enableFlutterwave: boolean;
  enableWallet: boolean;
  enableCashOnDelivery: boolean;

  // Rewards
  enableLinkedCoin: boolean;
  enableReferrals: boolean;
  enableStaking: boolean;
  enableGovernance: boolean;

  // Logistics
  enableDeliveryTracking: boolean;
  enablePickupPoints: boolean;
  enableSameDayDelivery: boolean;

  // AI & Personalization
  enableRecommendations: boolean;
  enableChatbot: boolean;
  enableDemandForecasting: boolean;

  // Verticals
  enableFarm: boolean;
  enableHealth: boolean;
  enableBusiness: boolean;

  // Admin
  enableVendorVerification: boolean;
  enableFraudDetection: boolean;
  enableAnalytics: boolean;
}

const getEnvBoolean = (key: string, defaultValue: boolean): boolean => {
  const value = process.env[key];
  if (value === undefined) return defaultValue;
  return value === "true" || value === "1";
};

export const featureFlags: FeatureFlags = {
  // Marketplace (MVP - all enabled)
  enableMarketplace: getEnvBoolean("FEATURE_MARKETPLACE", true),
  enableProductSearch: getEnvBoolean("FEATURE_PRODUCT_SEARCH", true),
  enableProductReviews: getEnvBoolean("FEATURE_PRODUCT_REVIEWS", true),
  enableWishlist: getEnvBoolean("FEATURE_WISHLIST", true),

  // Payments (Phase 1)
  enableStripe: getEnvBoolean("FEATURE_STRIPE", true),
  enablePaystack: getEnvBoolean("FEATURE_PAYSTACK", true),
  enableFlutterwave: getEnvBoolean("FEATURE_FLUTTERWAVE", false),
  enableWallet: getEnvBoolean("FEATURE_WALLET", true),
  enableCashOnDelivery: getEnvBoolean("FEATURE_COD", true),

  // Rewards (Phase 1-2)
  enableLinkedCoin: getEnvBoolean("FEATURE_LINKED_COIN", false),
  enableReferrals: getEnvBoolean("FEATURE_REFERRALS", true),
  enableStaking: getEnvBoolean("FEATURE_STAKING", false),
  enableGovernance: getEnvBoolean("FEATURE_GOVERNANCE", false),

  // Logistics (Phase 2)
  enableDeliveryTracking: getEnvBoolean("FEATURE_DELIVERY_TRACKING", true),
  enablePickupPoints: getEnvBoolean("FEATURE_PICKUP_POINTS", false),
  enableSameDayDelivery: getEnvBoolean("FEATURE_SAME_DAY_DELIVERY", false),

  // AI & Personalization (Phase 2)
  enableRecommendations: getEnvBoolean("FEATURE_RECOMMENDATIONS", false),
  enableChatbot: getEnvBoolean("FEATURE_CHATBOT", false),
  enableDemandForecasting: getEnvBoolean("FEATURE_DEMAND_FORECASTING", false),

  // Verticals (Phase 3)
  enableFarm: getEnvBoolean("FEATURE_FARM", false),
  enableHealth: getEnvBoolean("FEATURE_HEALTH", false),
  enableBusiness: getEnvBoolean("FEATURE_BUSINESS", false),

  // Admin (MVP onwards)
  enableVendorVerification: getEnvBoolean("FEATURE_VENDOR_VERIFICATION", true),
  enableFraudDetection: getEnvBoolean("FEATURE_FRAUD_DETECTION", false),
  enableAnalytics: getEnvBoolean("FEATURE_ANALYTICS", true),
};
