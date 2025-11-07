# 🗄️ Database Setup Guide

## Quick Setup Instructions

### Option 1: Using Supabase Dashboard (Recommended)

1. **Go to Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project: `giqrkglcjstwvhbslpiu`

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Apply Migrations**
   - Copy the contents of `supabase/migrations/20240101000001_initial_schema.sql`
   - Paste into the SQL Editor
   - Click "Run" (or press Ctrl+Enter)
   - Repeat for `supabase/migrations/20240102000002_complete_schema.sql`
   - Repeat for `supabase/migrations/20240102000003_payment_functions.sql`

4. **Verify Setup**
   - Go to "Table Editor" in the left sidebar
   - You should see all tables: users, vendors, products, orders, etc.

### Option 2: Using Supabase CLI

```bash
# Install Supabase CLI (if not already installed)
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref giqrkglcjstwvhbslpiu

# Push migrations
supabase db push
```

### Option 3: Using psql (Direct PostgreSQL)

```bash
# Get connection string from Supabase Dashboard
# Settings > Database > Connection string (use service_role key)

# Apply migrations
psql "postgresql://postgres:[YOUR-PASSWORD]@db.giqrkglcjstwvhbslpiu.supabase.co:5432/postgres" -f supabase/migrations/20240101000001_initial_schema.sql
psql "postgresql://postgres:[YOUR-PASSWORD]@db.giqrkglcjstwvhbslpiu.supabase.co:5432/postgres" -f supabase/migrations/20240102000002_complete_schema.sql
psql "postgresql://postgres:[YOUR-PASSWORD]@db.giqrkglcjstwvhbslpiu.supabase.co:5432/postgres" -f supabase/migrations/20240102000003_payment_functions.sql
```

## Environment Variables

Make sure your `.env.local` file has:

```env
SUPABASE_URL=https://giqrkglcjstwvhbslpiu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema Overview

### Core Tables

1. **Users & Authentication**
   - `users` - User accounts
   - `user_addresses` - Shipping addresses
   - `kyc_data` - KYC verification

2. **Vendors**
   - `vendors` - Vendor profiles
   - `vendor_bank_accounts` - Payout accounts

3. **Products**
   - `products` - Product catalog
   - `product_variants` - Product variations
   - `product_reviews` - Reviews and ratings

4. **Orders**
   - `orders` - Order records
   - `order_items` - Order line items

5. **Payments & Wallet**
   - `wallets` - User wallets
   - `transactions` - Transaction ledger
   - `payments` - Payment records

6. **Logistics**
   - `shipments` - Shipment tracking
   - `shipment_events` - Status updates

7. **Rewards**
   - `referrals` - Referral program

### Functions

- `generate_order_number()` - Generates unique order numbers
- `generate_tracking_number()` - Generates tracking numbers
- `generate_referral_code()` - Generates referral codes
- `create_wallet_for_user()` - Auto-creates wallet for new users
- `process_payment()` - Processes payments
- `create_order_with_items()` - Creates orders with items

### Triggers

- Auto-create wallet on user creation
- Update vendor stats on order completion
- Update inventory on order creation
- Update timestamps automatically

### Row Level Security (RLS)

All tables have RLS enabled with policies for:
- Users can only access their own data
- Vendors can access their vendor data
- Public read access for active products
- Admin access for all data

## Verification

After applying migrations, verify:

1. **Check Tables**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **Check Functions**
   ```sql
   SELECT routine_name 
   FROM information_schema.routines 
   WHERE routine_schema = 'public';
   ```

3. **Check RLS Policies**
   ```sql
   SELECT tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

## Troubleshooting

### Error: "relation does not exist"
- Make sure migrations are applied in order
- Check that all migrations ran successfully

### Error: "permission denied"
- Use service_role key for migrations
- Check RLS policies are correct

### Error: "function does not exist"
- Apply function migrations
- Check function permissions

## Next Steps

1. ✅ Apply all migrations
2. ✅ Verify tables exist
3. ✅ Test connection from services
4. ✅ Set up edge functions (optional)
5. ✅ Configure storage buckets (optional)

---

**Status**: Ready for migration application
**Last Updated**: 2025-01-07

