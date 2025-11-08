/**
 * Supabase Client
 * Marketplace service Supabase client initialization
 */

import { createClient } from "@supabase/supabase-js";
import { loadEnvironmentVariables } from "@linked-all/utils";

// Load environment variables
loadEnvironmentVariables();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    "Missing Supabase environment variables. Please set SUPABASE_URL and SUPABASE_SERVICE_KEY"
  );
}

export function getSupabaseClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

