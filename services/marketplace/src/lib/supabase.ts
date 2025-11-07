import { createClient } from "@supabase/supabase-js";
import { config as loadEnv } from "dotenv";

loadEnv();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase credentials. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY environment variables."
  );
}

// Create Supabase client with service key for admin operations
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
