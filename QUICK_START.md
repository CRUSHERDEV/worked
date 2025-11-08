# 🚀 Quick Start Guide - Linked All Platform

## Prerequisites

1. **Node.js** (v18 or higher)
2. **pnpm** (package manager)
3. **Docker** (optional, for Redis, Kafka, etc.)
4. **Supabase Account** (for database)

## Step 1: Install Dependencies

```bash
# Install pnpm if you don't have it
npm install -g pnpm

# Install all dependencies
pnpm install
```

## Step 2: Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# API Gateway
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Service URLs
MARKETPLACE_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
AUTH_SERVICE_URL=http://localhost:3005
LOGISTICS_SERVICE_URL=http://localhost:3006

# Redis (optional, for caching)
REDIS_URL=redis://localhost:6379

# Next.js Public API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## Step 3: Start Docker Services (Optional)

If you want to use Redis for caching:

```bash
# Start Redis, Kafka, Prometheus, Grafana
docker-compose up -d
```

## Step 4: Start Development Servers

### Option 1: Start All Services (Recommended)

```bash
# Start all services at once
pnpm dev
```

This will start:
- **Web App**: http://localhost:3000
- **API Gateway**: http://localhost:3001
- **Marketplace Service**: http://localhost:3002
- **Orders Service**: http://localhost:3003
- **Wallet Service**: http://localhost:3004
- **Auth Service**: http://localhost:3005
- **Logistics Service**: http://localhost:3006

### Option 2: Start Services Individually

```bash
# Terminal 1: Web App
cd apps/web
pnpm dev

# Terminal 2: API Gateway
cd services/api-gateway
pnpm dev

# Terminal 3: Marketplace Service
cd services/marketplace
pnpm dev

# Terminal 4: Orders Service
cd services/orders
pnpm dev

# Terminal 5: Wallet Service
cd services/wallet
pnpm dev

# Terminal 6: Auth Service
cd services/auth
pnpm dev

# Terminal 7: Logistics Service
cd services/logistics
pnpm dev
```

## Step 5: Access the Application

### Web Application
- **URL**: http://localhost:3000
- **Features**:
  - Home page
  - Products listing
  - Product details
  - Shopping cart
  - Checkout
  - Order confirmation

### API Gateway
- **URL**: http://localhost:3001
- **API Docs**: http://localhost:3001/docs
- **Health Check**: http://localhost:3001/health

### Service Health Checks
- **Marketplace**: http://localhost:3002/health
- **Orders**: http://localhost:3003/health
- **Wallet**: http://localhost:3004/health
- **Auth**: http://localhost:3005/health
- **Logistics**: http://localhost:3006/health

## Step 6: Test the Application

### 1. Browse Products
- Visit http://localhost:3000/products
- Browse available products
- Search and filter products

### 2. View Product Details
- Click on any product
- View product information
- Add to cart

### 3. Shopping Cart
- Click cart icon in navigation
- Update quantities
- Remove items
- Proceed to checkout

### 4. Checkout
- Fill in contact information
- Enter shipping address
- Select payment method
- Place order

## Troubleshooting

### Port Already in Use
If a port is already in use, you can change it in the service's `.env` file or `package.json`.

### Services Not Starting
1. Check if all dependencies are installed: `pnpm install`
2. Check if environment variables are set correctly
3. Check if Supabase credentials are valid
4. Check service logs for errors

### API Gateway Not Proxying
The API Gateway routes need to be updated to actually proxy requests. Currently, they return mock responses.

### Database Connection Issues
1. Verify Supabase credentials in `.env.local`
2. Check if database schema is applied
3. Check Supabase project status

## Next Steps

1. **Add Product Data**: Add products to your Supabase database
2. **Upload Images**: Upload product images to Supabase storage
3. **Configure API Gateway**: Update API Gateway to proxy requests properly
4. **Implement Orders**: Complete orders service implementation
5. **Add Authentication**: Implement user authentication
6. **Add Payments**: Integrate payment processing

## Development Tips

- Use `pnpm dev` to start all services in development mode
- Services will hot-reload on file changes
- Check browser console for errors
- Check service logs in terminal
- Use API Gateway docs to test API endpoints

## Need Help?

- Check `FRONTEND_IMPLEMENTATION_SUMMARY.md` for frontend details
- Check `SERVER_URLS.md` for all service URLs
- Check service READMEs for service-specific documentation

---

**Happy Coding! 🚀**

