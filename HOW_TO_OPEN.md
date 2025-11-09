# 🚀 How to Open and Run Linked All Platform

## Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
pnpm install
```

### Step 2: Set Up Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase (Required)
SUPABASE_URL=https://giqrkglcjstwvhbslpiu.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcXJrZ2xjanN0d3ZoYnNscGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0OTUzODQsImV4cCI6MjA3ODA3MTM4NH0.hFmUK2jpm64soZPb8LCKUtXmh99wkXEHy1CriOYFeyA
SUPABASE_SERVICE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpcXJrZ2xjanN0d3ZoYnNscGl1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MjQ5NTM4NCwiZXhwIjoyMDc4MDcxMzg0fQ.Zkj41lLJITCHDID8SYCWjgiDTc9PlHGArHj_kRlnJgU

# API Gateway
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Service URLs
MARKETPLACE_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
AUTH_SERVICE_URL=http://localhost:3005
LOGISTICS_SERVICE_URL=http://localhost:3006

# Next.js Public API URL
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

### Step 3: Start All Services
```bash
pnpm dev
```

This will start:
- ✅ Web App on http://localhost:3000
- ✅ API Gateway on http://localhost:3001
- ✅ Marketplace Service on http://localhost:3002
- ✅ Orders Service on http://localhost:3003
- ✅ Wallet Service on http://localhost:3004
- ✅ Auth Service on http://localhost:3005
- ✅ Logistics Service on http://localhost:3006

## 🌐 Open in Browser

### Main Application
**Web App**: http://localhost:3000

### API Documentation
**API Gateway**: http://localhost:3001
**API Docs**: http://localhost:3001/docs
**Health Check**: http://localhost:3001/health

## 📱 What You Can Do

### 1. Browse Products
- Visit: http://localhost:3000/products
- Browse available products
- Search and filter products
- View product details

### 2. Shopping Cart
- Click the cart icon in the navigation
- Add products to cart
- Update quantities
- Remove items

### 3. Checkout
- Go to cart page
- Click "Proceed to Checkout"
- Fill in contact and shipping information
- Place order

### 4. View Orders
- After checkout, you'll be redirected to order confirmation
- View order details

## 🛠️ Troubleshooting

### Services Not Starting

**Check if ports are available:**
```bash
# Windows PowerShell
netstat -ano | findstr :3000
netstat -ano | findstr :3001
```

**If ports are in use:**
- Close other applications using these ports
- Or change ports in `.env.local`

### API Gateway Not Working

**Check if services are running:**
- Visit http://localhost:3001/health
- Check service logs in terminal

### Products Not Loading

**Check database:**
1. Verify Supabase credentials in `.env.local`
2. Check if products table exists in Supabase
3. Add some products to the database

### Frontend Not Connecting to Backend

**Check API URL:**
1. Verify `NEXT_PUBLIC_API_URL` in `.env.local`
2. Check browser console for errors
3. Verify API Gateway is running on port 3001

## 🔍 Verify Everything is Working

### 1. Check Services
```bash
# API Gateway
curl http://localhost:3001/health

# Marketplace Service
curl http://localhost:3002/health

# Products API
curl http://localhost:3001/api/v1/marketplace/products
```

### 2. Check Web App
- Open http://localhost:3000
- Check browser console for errors
- Try navigating to /products page

### 3. Check Database
- Go to Supabase Dashboard
- Verify products table exists
- Add test products if needed

## 🎯 Next Steps

1. **Add Products**: Add products to your Supabase database
2. **Upload Images**: Upload product images to Supabase storage
3. **Test Features**: Test shopping cart, checkout, and orders
4. **Customize**: Customize the design and add your branding

## 📝 Development Tips

- **Hot Reload**: Services will automatically reload on file changes
- **Logs**: Check terminal logs for errors and debugging
- **Browser DevTools**: Use browser console to debug frontend issues
- **API Testing**: Use http://localhost:3001/docs to test API endpoints

## 🆘 Need Help?

- Check `QUICK_START.md` for detailed setup instructions
- Check `FRONTEND_IMPLEMENTATION_SUMMARY.md` for frontend features
- Check `SERVER_URLS.md` for all service URLs
- Check service READMEs for service-specific documentation

---

**Ready to go!** 🚀 Open http://localhost:3000 in your browser to start using the application!

