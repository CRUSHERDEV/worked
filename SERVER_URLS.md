# 🌐 Server URLs Reference

## All Server URLs for Linked All v1

### Frontend (Web Application)

**Web App (Next.js)**
- **Development**: `http://localhost:3000`
- **Production**: (To be configured)
- **Description**: Main web application frontend
- **Tech**: Next.js 14, React, TypeScript

---

### Backend Services

#### API Gateway
- **URL**: `http://localhost:3001`
- **Health Check**: `http://localhost:3001/health`
- **API Docs**: `http://localhost:3001/docs` (Swagger/OpenAPI)
- **Root**: `http://localhost:3001/`
- **API Base**: `http://localhost:3001/api/v1`
- **Description**: Main entry point for all API requests, routes to microservices
- **Tech**: Fastify, TypeScript

#### Marketplace Service
- **URL**: `http://localhost:3002`
- **Health Check**: `http://localhost:3002/`
- **API Gateway Route**: `http://localhost:3001/api/v1/marketplace`
- **Description**: Product catalog, vendor management, product search
- **Tech**: Fastify, TypeScript

#### Orders Service
- **URL**: `http://localhost:3003`
- **Health Check**: `http://localhost:3003/`
- **API Gateway Route**: `http://localhost:3001/api/v1/orders`
- **Description**: Order management, order processing, order history
- **Tech**: Fastify, TypeScript

#### Wallet Service
- **URL**: `http://localhost:3004`
- **Health Check**: `http://localhost:3004/`
- **API Gateway Route**: `http://localhost:3001/api/v1/wallet`
- **Description**: Wallet management, transactions, payments
- **Tech**: Fastify, TypeScript

#### Auth Service
- **URL**: `http://localhost:3005`
- **Health Check**: `http://localhost:3005/`
- **API Gateway Route**: `http://localhost:3001/api/v1/auth`
- **Description**: Authentication, authorization, user management
- **Tech**: Fastify, TypeScript

#### Logistics Service
- **URL**: `http://localhost:3006`
- **Health Check**: `http://localhost:3006/`
- **API Gateway Route**: `http://localhost:3001/api/v1/logistics`
- **Description**: Shipping, delivery, tracking, logistics management
- **Tech**: Fastify, TypeScript

---

## 📋 Quick Reference Table

| Service | Port | URL | API Gateway Route |
|---------|------|-----|-------------------|
| **Web App** | 3000 | `http://localhost:3000` | N/A |
| **API Gateway** | 3001 | `http://localhost:3001` | N/A |
| **Marketplace** | 3002 | `http://localhost:3002` | `/api/v1/marketplace` |
| **Orders** | 3003 | `http://localhost:3003` | `/api/v1/orders` |
| **Wallet** | 3004 | `http://localhost:3004` | `/api/v1/wallet` |
| **Auth** | 3005 | `http://localhost:3005` | `/api/v1/auth` |
| **Logistics** | 3006 | `http://localhost:3006` | `/api/v1/logistics` |

---

## 🔗 External Services

### Supabase
- **URL**: `https://giqrkglcjstwvhbslpiu.supabase.co`
- **Dashboard**: `https://supabase.com/dashboard/project/giqrkglcjstwvhbslpiu`
- **Description**: Database, authentication, storage
- **Tech**: PostgreSQL, Supabase Auth

---

## 🚀 How to Access

### Development Mode

1. **Start all services**:
   ```bash
   pnpm dev
   ```

2. **Access Web App**:
   - Open: `http://localhost:3000`

3. **Access API Gateway**:
   - Open: `http://localhost:3001`
   - API Docs: `http://localhost:3001/docs`

4. **Access Individual Services**:
   - Marketplace: `http://localhost:3002`
   - Orders: `http://localhost:3003`
   - Wallet: `http://localhost:3004`
   - Auth: `http://localhost:3005`
   - Logistics: `http://localhost:3006`

### Production Mode

Production URLs will be configured when deploying to:
- **Frontend**: Vercel, Netlify, or custom domain
- **Backend**: AWS, Google Cloud, or custom infrastructure

---

## 📝 API Gateway Routes

All microservices are accessible through the API Gateway:

- **Marketplace**: `http://localhost:3001/api/v1/marketplace/*`
- **Orders**: `http://localhost:3001/api/v1/orders/*`
- **Wallet**: `http://localhost:3001/api/v1/wallet/*`
- **Auth**: `http://localhost:3001/api/v1/auth/*`
- **Logistics**: `http://localhost:3001/api/v1/logistics/*`

### Example API Calls

```bash
# Get products through API Gateway
curl http://localhost:3001/api/v1/marketplace/products

# Create order through API Gateway
curl -X POST http://localhost:3001/api/v1/orders \
  -H "Content-Type: application/json" \
  -d '{"productId": "123", "quantity": 1}'

# Get wallet balance through API Gateway
curl http://localhost:3001/api/v1/wallet/balance \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 🔧 Environment Variables

Make sure your `.env.local` file includes:

```bash
# Supabase
SUPABASE_URL=https://giqrkglcjstwvhbslpiu.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key

# Service URLs (for API Gateway)
MARKETPLACE_SERVICE_URL=http://localhost:3002
ORDER_SERVICE_URL=http://localhost:3003
WALLET_SERVICE_URL=http://localhost:3004
AUTH_SERVICE_URL=http://localhost:3005
LOGISTICS_SERVICE_URL=http://localhost:3006

# API Gateway
PORT=3001
HOST=0.0.0.0
CORS_ORIGIN=http://localhost:3000
```

---

## ✅ Health Check Endpoints

Check if services are running:

```bash
# API Gateway
curl http://localhost:3001/health

# Marketplace
curl http://localhost:3002/

# Orders
curl http://localhost:3003/

# Wallet
curl http://localhost:3004/

# Auth
curl http://localhost:3005/

# Logistics
curl http://localhost:3006/
```

---

## 📱 Web App Routes

- **Home**: `http://localhost:3000/`
- **Login**: `http://localhost:3000/login`
- **Signup**: `http://localhost:3000/signup`
- **Dashboard**: `http://localhost:3000/dashboard`

---

## 🎯 Important Notes

1. **API Gateway is the main entry point** - All client requests should go through the API Gateway at port 3001
2. **Direct service access** - Services can be accessed directly for debugging, but production should use API Gateway
3. **CORS** - API Gateway is configured to accept requests from `http://localhost:3000`
4. **Port conflicts** - Make sure no other applications are using these ports
5. **Environment variables** - Each service needs proper environment variables configured

---

**All servers are ready to use!** 🚀

