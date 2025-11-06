import { config as loadEnv } from "dotenv";

loadEnv();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: parseInt(process.env.PORT || "3001", 10),
  HOST: process.env.HOST || "0.0.0.0",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
  CORS_ORIGIN: process.env.CORS_ORIGIN?.split(",") || ["http://localhost:3000"],
  RATE_LIMIT: parseInt(process.env.RATE_LIMIT || "100", 10),

  // Service URLs
  MARKETPLACE_SERVICE_URL: process.env.MARKETPLACE_SERVICE_URL || "http://localhost:3002",
  ORDER_SERVICE_URL: process.env.ORDER_SERVICE_URL || "http://localhost:3003",
  WALLET_SERVICE_URL: process.env.WALLET_SERVICE_URL || "http://localhost:3004",
  AUTH_SERVICE_URL: process.env.AUTH_SERVICE_URL || "http://localhost:3005",
  LOGISTICS_SERVICE_URL: process.env.LOGISTICS_SERVICE_URL || "http://localhost:3006",

  // Supabase
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
  SUPABASE_SERVICE_KEY: process.env.SUPABASE_SERVICE_KEY || "",
};
