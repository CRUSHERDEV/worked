# ⚡ Quick Start - Get Running in 5 Minutes

## Prerequisites Check
```bash
node --version  # Should be >= 20
pnpm --version  # Should be >= 10
```

## 1. Install Dependencies
```bash
pnpm install
```

## 2. Set Up Supabase

### Quick Setup (Supabase Cloud)
1. Go to https://supabase.com and create a project
2. Go to Settings → API
3. Copy: Project URL, anon key, service_role key

## 3. Create Environment File
Create `.env.local` in project root:
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

AUTH_SERVICE_URL=http://localhost:3005
MARKETPLACE_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
LOGISTICS_SERVICE_URL=http://localhost:3006

PORT=3001
NODE_ENV=development
```

## 4. Apply Database Schema
```bash
# Install Supabase CLI
npm install -g supabase

# Link project
cd supabase
supabase link --project-ref your-project-ref

# Push schema
supabase db push
```

## 5. Start Services
```bash
# From project root
pnpm dev
```

## 6. Verify It Works
```bash
# Check API Gateway
curl http://localhost:3001/health

# Test registration
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## ✅ Done!
- API Gateway: http://localhost:3001
- API Docs: http://localhost:3001/docs
- All services running and ready for UI development!

For detailed instructions, see `SETUP_GUIDE.md`
