# 🚀 Setup Guide - What You Need to Do

## Step-by-Step Setup Instructions

### Step 1: Install Dependencies

```bash
# From the project root directory
pnpm install
```

This will install all dependencies for:
- All services (auth, marketplace, orders, wallet, logistics)
- API Gateway
- All shared packages (types, utils, config, ui)
- Web and mobile apps

**Time**: 2-5 minutes

---

### Step 2: Set Up Supabase

You have two options:

#### Option A: Use Supabase Cloud (Recommended for Development)

1. **Create a Supabase Project**
   - Go to https://supabase.com
   - Sign up or log in
   - Click "New Project"
   - Choose a name (e.g., "linked-all-dev")
   - Set a database password (save this!)
   - Choose a region (closest to you)
   - Click "Create new project"

2. **Get Your Credentials**
   - Once the project is ready, go to **Settings** → **API**
   - Copy these values:
     - **Project URL** (e.g., `https://xxxxx.supabase.co`)
     - **anon/public key** (starts with `eyJ...`)
     - **service_role key** (starts with `eyJ...`) - ⚠️ Keep this secret!

3. **Apply Database Migrations**
   - Install Supabase CLI (if not installed):
     ```bash
     npm install -g supabase
     ```
   
   - Link your project:
     ```bash
     cd supabase
     supabase link --project-ref your-project-ref
     ```
     (You can find your project ref in the Supabase dashboard URL)
   
   - Push the schema:
     ```bash
     supabase db push
     ```

#### Option B: Use Local Supabase (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Start local Supabase (requires Docker)
cd supabase
supabase start

# This will start:
# - PostgreSQL database (port 54322)
# - API server (port 54321)
# - Studio UI (port 54323)
```

---

### Step 3: Create Environment File

Create a `.env.local` file in the project root:

```bash
# From project root
cp .env.example .env.local
# (If .env.example doesn't exist, create .env.local manually)
```

**Minimum Required Configuration** (`.env.local`):

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_KEY=your-service-role-key-here

# Service URLs (for API Gateway)
AUTH_SERVICE_URL=http://localhost:3005
MARKETPLACE_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
LOGISTICS_SERVICE_URL=http://localhost:3006

# API Gateway
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Node Environment
NODE_ENV=development
```

**Where to find these values:**
- `SUPABASE_URL`: From Supabase Dashboard → Settings → API → Project URL
- `SUPABASE_ANON_KEY`: From Supabase Dashboard → Settings → API → anon/public key
- `SUPABASE_SERVICE_KEY`: From Supabase Dashboard → Settings → API → service_role key

---

### Step 4: Verify Your Setup

#### Check Node.js Version
```bash
node --version
# Should be >= 20.0.0
```

#### Check pnpm Version
```bash
pnpm --version
# Should be >= 10.0.0
```

#### Type Check (Optional)
```bash
pnpm type-check
# Should complete without errors
```

---

### Step 5: Start the Services

You have two options:

#### Option A: Start All Services with Turbo (Recommended)

```bash
# From project root
pnpm dev
```

This will start all services in parallel. You'll see output from all services.

#### Option B: Start Services Individually

Open multiple terminal windows/tabs:

**Terminal 1 - Auth Service:**
```bash
cd services/auth
pnpm dev
```

**Terminal 2 - Marketplace Service:**
```bash
cd services/marketplace
pnpm dev
```

**Terminal 3 - Orders Service:**
```bash
cd services/orders
pnpm dev
```

**Terminal 4 - API Gateway:**
```bash
cd services/api-gateway
pnpm dev
```

**Terminal 5 - Wallet Service (Optional):**
```bash
cd services/wallet
pnpm dev
```

**Terminal 6 - Logistics Service (Optional):**
```bash
cd services/logistics
pnpm dev
```

---

### Step 6: Verify Services Are Running

Check that all services are responding:

```bash
# API Gateway
curl http://localhost:3001/health

# Auth Service
curl http://localhost:3005/health

# Marketplace Service
curl http://localhost:3002/health

# Orders Service
curl http://localhost:3003/health
```

You should see responses like:
```json
{
  "status": "ok",
  "service": "auth",
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

---

### Step 7: Test the API (Optional but Recommended)

#### Test User Registration
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

You should get a response with user data and session tokens.

#### Test User Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Test Product Listing (After creating a product)
```bash
curl http://localhost:3001/api/v1/products
```

---

### Step 8: Access Services

Once everything is running, you can access:

- 🌐 **API Gateway**: http://localhost:3001
- 📚 **API Docs** (Swagger): http://localhost:3001/docs
- 🔐 **Auth Service**: http://localhost:3005
- 🛍️ **Marketplace Service**: http://localhost:3002
- 📦 **Orders Service**: http://localhost:3003
- 💰 **Wallet Service**: http://localhost:3004
- 🚚 **Logistics Service**: http://localhost:3006
- 🗄️ **Supabase Studio** (if local): http://localhost:54323

---

## 🎯 What to Do Next

### For Backend Development:
1. ✅ Services are running and accessible
2. ✅ Test endpoints using curl or Postman
3. ✅ Check database in Supabase Studio
4. ⏭️ Continue implementing Wallet and Logistics services
5. ⏭️ Add payment provider integrations

### For Frontend Development:
1. ✅ Backend API is ready
2. ✅ Use these endpoints in your UI:
   - `http://localhost:3001/api/v1/auth/*` - Authentication
   - `http://localhost:3001/api/v1/products/*` - Products
   - `http://localhost:3001/api/v1/orders/*` - Orders
3. ⏭️ Upload your UI reference designs
4. ⏭️ I'll help integrate the UI with the backend

---

## 🔧 Troubleshooting

### Issue: Port Already in Use
**Solution:**
```bash
# Windows (PowerShell)
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3001 | xargs kill -9
```

### Issue: pnpm install fails
**Solution:**
```bash
# Clear pnpm cache
pnpm store prune

# Remove node_modules and reinstall
rm -rf node_modules
pnpm install
```

### Issue: Supabase connection fails
**Solution:**
1. Verify your `.env.local` has correct credentials
2. Check Supabase project is active (not paused)
3. Verify network connectivity
4. Check Supabase dashboard for any errors

### Issue: Database migration fails
**Solution:**
```bash
# Reset local database
cd supabase
supabase db reset

# Or for remote
supabase db push --force
```

### Issue: Services won't start
**Solution:**
1. Check Node.js version: `node --version` (should be >= 20)
2. Check pnpm version: `pnpm --version` (should be >= 10)
3. Verify all dependencies installed: `pnpm install`
4. Check for TypeScript errors: `pnpm type-check`

---

## 📋 Checklist

Use this checklist to track your progress:

- [ ] Installed dependencies (`pnpm install`)
- [ ] Created Supabase project (cloud or local)
- [ ] Applied database migrations
- [ ] Created `.env.local` file with credentials
- [ ] Verified environment variables are set
- [ ] Started all services (`pnpm dev`)
- [ ] Verified services are running (health checks)
- [ ] Tested API endpoints (registration, login)
- [ ] Can access Supabase Studio
- [ ] Ready for UI development

---

## 🆘 Need Help?

If you encounter issues:

1. **Check the logs** - Each service outputs logs to the console
2. **Verify environment variables** - Make sure `.env.local` is correct
3. **Check service health** - Use the `/health` endpoints
4. **Review error messages** - They usually indicate what's wrong
5. **Check Supabase dashboard** - Verify database is accessible

---

## 📚 Next Steps After Setup

Once everything is running:

1. **Test the API** - Use Postman or curl to test endpoints
2. **Create test data** - Register users, create products, place orders
3. **Review API documentation** - Check `BACKEND_IMPLEMENTATION.md`
4. **Plan UI integration** - Prepare your UI reference designs
5. **Continue development** - Start building features

---

**You're all set!** 🎉

Once you complete these steps, your backend will be fully operational and ready for UI development.
