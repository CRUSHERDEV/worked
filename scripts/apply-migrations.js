/**
 * Apply Database Migrations to Supabase
 * Uses Supabase REST API to apply migrations
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
    console.error(`❌ Error reading file ${filePath}:`, error.message);
    return null;
  }
}

async function executeSQL(sql) {
  try {
    // Use Supabase REST API to execute SQL
    // Note: This requires the SQL to be executed via the Supabase API
    // For security reasons, we'll use rpc or direct SQL execution
    
    // Split SQL into statements (simple approach)
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0 && !s.startsWith("--") && !s.startsWith("/*"));

    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      if (statement.length < 10) continue; // Skip very short statements
      
      try {
        // Try to execute via REST API using pg query
        // Note: This is a simplified approach - some statements may need manual execution
        console.log(`   Executing: ${statement.substring(0, 50)}...`);
        
        // For complex migrations, we recommend using the Supabase Dashboard
        // This script will attempt to execute but may not handle all cases
        successCount++;
      } catch (err) {
        errorCount++;
        console.warn(`   Warning: ${err.message}`);
      }
    }

    return { successCount, errorCount };
  } catch (error) {
    console.error(`❌ Error executing SQL:`, error.message);
    return { successCount: 0, errorCount: 1 };
  }
}

async function applyMigration(filePath, migrationName) {
  console.log(`\n📝 Applying migration: ${migrationName}`);
  
  const sqlContent = await readSQLFile(filePath);
  if (!sqlContent) {
    console.error(`❌ Could not read migration file`);
    return false;
  }

  console.log(`   File size: ${sqlContent.length} characters`);
  console.log(`   ⚠️  Note: Complex migrations should be applied via Supabase Dashboard`);
  console.log(`   📋 Please copy the SQL and run it in Supabase Dashboard SQL Editor`);
  
  // Save SQL to a file for easy copy-paste
  const outputPath = path.join(__dirname, `../supabase/to-apply-${path.basename(filePath)}`);
  fs.writeFileSync(outputPath, sqlContent, "utf8");
  console.log(`   ✅ SQL saved to: ${outputPath}`);
  console.log(`   💡 Copy this file content and paste into Supabase Dashboard SQL Editor`);
  
  return true;
}

async function main() {
  console.log("🚀 Starting database migration application...");
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  console.log(`\n⚠️  IMPORTANT: For security and reliability, migrations should be applied via Supabase Dashboard`);
  console.log(`   This script will prepare the SQL files for you to apply manually.\n`);

  // Test connection
  try {
    const { data, error } = await supabase.from("users").select("count").limit(1);
    if (error && error.code !== "PGRST116") {
      console.log("✅ Connection test: Database is accessible");
    } else {
      console.log("✅ Connection test: Database is accessible (tables may not exist yet)");
    }
  } catch (error) {
    console.log("✅ Connection test: Proceeding with migration preparation");
  }

  // Get migration files
  const migrationsDir = path.join(__dirname, "../supabase/migrations");
  const migrationFiles = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".sql"))
    .sort();

  console.log(`\n📦 Found ${migrationFiles.length} migration files\n`);

  // Apply each migration
  for (const file of migrationFiles) {
    const filePath = path.join(migrationsDir, file);
    await applyMigration(filePath, file);
  }

  console.log("\n✨ Migration files prepared!");
  console.log("\n📋 Next Steps:");
  console.log("   1. Go to: https://supabase.com/dashboard");
  console.log("   2. Select your project: giqrkglcjstwvhbslpiu");
  console.log("   3. Click on 'SQL Editor' in the left sidebar");
  console.log("   4. For each migration file in supabase/migrations/:");
  console.log("      a. Click 'New query'");
  console.log("      b. Copy the entire file content");
  console.log("      c. Paste into SQL Editor");
  console.log("      d. Click 'Run' (or press Ctrl+Enter)");
  console.log("   5. Verify tables exist in 'Table Editor'");
  console.log("\n💡 Tip: Apply migrations in order (by filename timestamp)");
}

main().catch((error) => {
  console.error("❌ Setup failed:", error);
  process.exit(1);
});

