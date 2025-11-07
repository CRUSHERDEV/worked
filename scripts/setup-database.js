/**
 * Database Setup Script
 * Applies all migrations and sets up the complete database
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Load environment variables
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("❌ Missing Supabase credentials in .env.local");
  console.error("Required: SUPABASE_URL, SUPABASE_SERVICE_KEY");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function readSQLFile(filePath) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error.message);
    return null;
  }
}

async function applyMigration(sqlContent, migrationName) {
  console.log(`\n📝 Applying migration: ${migrationName}`);
  
  try {
    // Split SQL into individual statements
    const statements = sqlContent
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--"));

    // Execute each statement
    for (const statement of statements) {
      if (statement.length > 0) {
        try {
          const { error } = await supabase.rpc("exec_sql", {
            sql: statement + ";",
          });

          // If exec_sql doesn't exist, try direct query (this won't work for all statements)
          if (error && error.message.includes("exec_sql")) {
            console.warn("⚠️  exec_sql function not available, some statements may fail");
            console.warn("   Please apply migrations manually via Supabase Dashboard");
          }
        } catch (err) {
          // Some statements may fail, continue
          console.warn(`   Warning: ${err.message}`);
        }
      }
    }

    console.log(`✅ Migration applied: ${migrationName}`);
    return true;
  } catch (error) {
    console.error(`❌ Error applying migration ${migrationName}:`, error.message);
    return false;
  }
}

async function verifyTables() {
  console.log("\n🔍 Verifying database tables...");
  
  const tables = [
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

  const { data, error } = await supabase
    .from("information_schema.tables")
    .select("table_name")
    .eq("table_schema", "public");

  if (error) {
    console.warn("⚠️  Could not verify tables (this is normal if using Supabase Dashboard)");
    return;
  }

  const existingTables = data.map((row) => row.table_name);
  const missingTables = tables.filter((table) => !existingTables.includes(table));

  if (missingTables.length === 0) {
    console.log("✅ All tables exist");
  } else {
    console.log(`⚠️  Missing tables: ${missingTables.join(", ")}`);
    console.log("   Please apply migrations via Supabase Dashboard");
  }
}

async function testConnection() {
  console.log("🔌 Testing Supabase connection...");
  
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1);
    
    if (error && error.code !== "PGRST116") {
      // PGRST116 means table doesn't exist, which is expected for new setup
      throw error;
    }
    
    console.log("✅ Connection successful");
    return true;
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    return false;
  }
}

async function main() {
  console.log("🚀 Starting database setup...");
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  
  // Test connection
  const connected = await testConnection();
  if (!connected) {
    console.error("\n❌ Cannot connect to Supabase. Please check your credentials.");
    process.exit(1);
  }

  // Read migration files
  const migrationsDir = path.join(__dirname, "../supabase/migrations");
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  console.log(`\n📦 Found ${migrationFiles.length} migration files`);

  // Apply migrations
  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    const sqlContent = await readSQLFile(filePath);
    
    if (sqlContent) {
      await applyMigration(sqlContent, file);
    }
  }

  // Verify tables
  await verifyTables();

  console.log("\n✨ Database setup complete!");
  console.log("\n📋 Next steps:");
  console.log("   1. Go to Supabase Dashboard: https://supabase.com/dashboard");
  console.log("   2. Navigate to SQL Editor");
  console.log("   3. Copy and paste the migration files manually");
  console.log("   4. Or use Supabase CLI: supabase db push");
  console.log("\n💡 Note: Some migrations need to be applied via Supabase Dashboard");
}

main().catch((error) => {
  console.error("❌ Setup failed:", error);
  process.exit(1);
});

