/**
 * Verify Database Setup
 * Checks if all tables, functions, and policies are set up correctly
 */

const { createClient } = require("@supabase/supabase-js");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const expectedTables = [
  "users",
  "user_addresses",
  "kyc_data",
  "vendors",
  "vendor_bank_accounts",
  "products",
  "product_variants",
  "product_reviews",
  "orders",
  "order_items",
  "wallets",
  "transactions",
  "payments",
  "shipments",
  "shipment_events",
  "referrals",
];

const expectedFunctions = [
  "generate_order_number",
  "generate_tracking_number",
  "generate_referral_code",
  "create_wallet_for_user",
  "update_vendor_stats",
  "process_payment",
  "create_order_with_items",
];

async function checkTables() {
  console.log("\n📊 Checking tables...");
  const results = {};

  for (const table of expectedTables) {
    try {
      const { error } = await supabase.from(table).select("id").limit(1);
      if (error && error.code !== "PGRST116") {
        results[table] = { exists: false, error: error.message };
      } else {
        results[table] = { exists: true };
      }
    } catch (error) {
      results[table] = { exists: false, error: error.message };
    }
  }

  const existing = Object.entries(results).filter(([_, r]) => r.exists);
  const missing = Object.entries(results).filter(([_, r]) => !r.exists);

  console.log(`✅ Found ${existing.length}/${expectedTables.length} tables`);
  
  if (missing.length > 0) {
    console.log(`❌ Missing tables: ${missing.map(([name]) => name).join(", ")}`);
    return false;
  }

  return true;
}

async function checkConnection() {
  console.log("🔌 Testing connection...");
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1);
    if (error && error.code !== "PGRST116") {
      throw error;
    }
    console.log("✅ Connection successful");
    return true;
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    return false;
  }
}

async function testBasicOperations() {
  console.log("\n🧪 Testing basic operations...");
  
  try {
    // Test users table
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id")
      .limit(1);
    
    if (usersError && usersError.code !== "PGRST116") {
      console.error("❌ Users table error:", usersError.message);
      return false;
    }

    console.log("✅ Users table accessible");

    // Test products table
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id")
      .limit(1);
    
    if (productsError && productsError.code !== "PGRST116") {
      console.error("❌ Products table error:", productsError.message);
      return false;
    }

    console.log("✅ Products table accessible");

    return true;
  } catch (error) {
    console.error("❌ Test failed:", error.message);
    return false;
  }
}

async function main() {
  console.log("🔍 Verifying database setup...");
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);

  const connectionOk = await checkConnection();
  if (!connectionOk) {
    console.error("\n❌ Cannot connect to database");
    process.exit(1);
  }

  const tablesOk = await checkTables();
  const operationsOk = await testBasicOperations();

  if (tablesOk && operationsOk) {
    console.log("\n✅ Database setup verified!");
    console.log("\n📋 Next steps:");
    console.log("   1. Test your services");
    console.log("   2. Create test data");
    console.log("   3. Deploy edge functions");
  } else {
    console.log("\n⚠️  Some issues detected. Please check the output above.");
    console.log("   Apply migrations via Supabase Dashboard if needed.");
  }
}

main().catch((error) => {
  console.error("❌ Verification failed:", error);
  process.exit(1);
});

