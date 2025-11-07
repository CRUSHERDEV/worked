# 🚀 APPLY DATABASE - SINGLE FILE METHOD

## Quick & Easy - One File Application

### Step 1: Open Supabase Dashboard
1. Visit: https://supabase.com/dashboard
2. Select your project: **giqrkglcjstwvhbslpiu**
3. Click on **SQL Editor** in the left sidebar

### Step 2: Apply the Complete Setup
1. Click **New query**
2. Open the file: `supabase/ALL_MIGRATIONS_COMBINED.sql`
3. **Copy the ENTIRE file content** (Ctrl+A, Ctrl+C)
4. **Paste into the SQL Editor** (Ctrl+V)
5. Click **Run** (or press Ctrl+Enter)
6. Wait for the success message: `✅ Linked All database setup complete!`

### Step 3: Verify
1. Go to **Table Editor** in the left sidebar
2. You should see all 16 tables:
   - ✅ users
   - ✅ user_addresses
   - ✅ kyc_data
   - ✅ vendors
   - ✅ vendor_bank_accounts
   - ✅ products
   - ✅ product_variants
   - ✅ product_reviews
   - ✅ orders
   - ✅ order_items
   - ✅ wallets
   - ✅ transactions
   - ✅ payments
   - ✅ shipments
   - ✅ shipment_events
   - ✅ referrals

## ✅ What Gets Created

- **16 Tables** - Complete database schema
- **10+ Functions** - Business logic functions
- **6+ Triggers** - Automated processes
- **RLS Policies** - Security policies
- **Views** - Dashboard views
- **Indexes** - Performance optimizations

## ⚠️ Important Notes

- The file uses `CREATE TABLE IF NOT EXISTS` and `CREATE OR REPLACE FUNCTION` so it's safe to run multiple times
- If you see "already exists" errors, that's normal and safe to ignore
- The script will create everything in one go

## 🎯 File Location

The combined migration file is located at:
**`supabase/ALL_MIGRATIONS_COMBINED.sql`**

## ✅ Success Message

After running, you should see:
```
✅ Linked All database setup complete! All tables, functions, triggers, and RLS policies have been created.
```

## 🚀 Next Steps

Once the database is set up:
1. ✅ Verify all tables exist
2. ✅ Test your services: `pnpm dev`
3. ✅ Test API endpoints
4. ✅ Create test data (optional)

---

**Ready?** Open `supabase/ALL_MIGRATIONS_COMBINED.sql` and apply it now! 🚀

