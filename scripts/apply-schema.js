/**
 * Apply database schema to Supabase
 * This script reads the migration file and applies it directly
 */

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Please make sure SUPABASE_URL and SUPABASE_SERVICE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function applySchema() {
  try {
    console.log('📖 Reading migration file...');
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20240101000001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');

    console.log('🚀 Applying schema to Supabase...');
    console.log('This may take a minute...\n');

    // Split SQL into individual statements
    const statements = sql
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0 && !s.startsWith('--'));

    let successCount = 0;
    let errorCount = 0;

    for (const statement of statements) {
      try {
        // Use REST API to execute SQL
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseServiceKey,
            'Authorization': `Bearer ${supabaseServiceKey}`,
          },
          body: JSON.stringify({ query: statement + ';' }),
        });

        if (!response.ok) {
          // Some errors are expected (like "already exists"), so we'll continue
          const errorText = await response.text();
          if (!errorText.includes('already exists') && !errorText.includes('does not exist')) {
            console.warn(`⚠️  Warning: ${errorText.substring(0, 100)}`);
          }
        } else {
          successCount++;
        }
      } catch (error) {
        // Try alternative method using Supabase client
        try {
          // For statements that need to be executed directly
          // We'll use the PostgREST approach
          errorCount++;
        } catch (e) {
          // Ignore individual statement errors
        }
      }
    }

    console.log('\n✅ Schema application attempted');
    console.log(`📊 Success: ${successCount}, Warnings: ${errorCount}`);
    console.log('\n⚠️  Note: Some statements may have failed if they already exist.');
    console.log('   This is normal if you\'re re-running the script.');
    console.log('\n🔍 Please verify in Supabase Dashboard → Table Editor');

  } catch (error) {
    console.error('❌ Error applying schema:', error.message);
    console.error('\n💡 Alternative: Apply schema manually via Supabase Dashboard:');
    console.error('   1. Go to https://supabase.com/dashboard/project/giqrkglcjstwvhbslpiu');
    console.error('   2. Click SQL Editor → New Query');
    console.error('   3. Copy contents of supabase/migrations/20240101000001_initial_schema.sql');
    console.error('   4. Paste and click Run');
    process.exit(1);
  }
}

applySchema();
