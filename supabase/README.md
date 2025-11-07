# Supabase Configuration

Database schema, migrations, and configuration for the Linked All platform.

## Prerequisites

- Supabase CLI installed: `npm install -g supabase`
- Supabase account (https://supabase.com)

## Getting Started

### Local Development

1. **Initialize Supabase locally:**
```bash
supabase init
```

2. **Start local Supabase:**
```bash
supabase start
```

This will start:
- PostgreSQL database (port 54322)
- API server (port 54321)
- Studio (port 54323)

3. **Apply migrations:**
```bash
supabase db reset
```

### Remote Project

1. **Link to your Supabase project:**
```bash
supabase link --project-ref your-project-ref
```

2. **Push migrations to remote:**
```bash
supabase db push
```

## Database Schema

### Core Tables

#### Users & Authentication
- `users` - User accounts and profiles
- `user_addresses` - User shipping addresses
- `kyc_data` - KYC verification data

#### Vendors
- `vendors` - Vendor profiles
- `vendor_bank_accounts` - Vendor payout accounts

#### Products
- `products` - Product catalog
- `product_variants` - Product variations
- `product_reviews` - Product reviews and ratings

#### Orders
- `orders` - Order records
- `order_items` - Order line items

#### Payments & Wallet
- `wallets` - User wallets
- `transactions` - Transaction ledger
- `payments` - Payment records

#### Logistics
- `shipments` - Shipment tracking
- `shipment_events` - Shipment status updates

#### Rewards
- `referrals` - Referral program data

## Migrations

Migrations are stored in `/supabase/migrations/` and are applied in order by timestamp.

### Create a new migration:
```bash
supabase migration new migration_name
```

### Apply migrations:
```bash
# Local
supabase db reset

# Remote
supabase db push
```

## Security

### Row Level Security (RLS)

RLS is enabled on all tables. Policies control data access based on user authentication.

Example policies:
- Users can only view/update their own data
- Vendors can only manage their own products
- Orders are visible to buyers and vendors only

### Sensitive Data

- KYC documents are encrypted
- PII (Personally Identifiable Information) access is restricted
- API keys should never be committed to version control

## Backups

### Automated Backups
Supabase automatically backs up databases daily.

### Manual Backup
```bash
supabase db dump -f backup.sql
```

### Restore from Backup
```bash
psql -h localhost -U postgres -d postgres -f backup.sql
```

## Monitoring

- Check database health: https://app.supabase.com/project/your-project/database
- View logs: https://app.supabase.com/project/your-project/logs
- Monitor queries: https://app.supabase.com/project/your-project/database/query-performance

## API Access

### Environment Variables

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

### Client Usage

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)
```

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
