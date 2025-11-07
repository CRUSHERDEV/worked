# Linked All Backend Services

Microservices architecture for the Linked All platform.

## Services

### API Gateway (Port 3001)
Central API gateway that routes requests to appropriate microservices.
- Request routing
- Rate limiting
- Authentication middleware
- API documentation

### Marketplace Service (Port 3002)
Handles product catalog, vendor management, and search.
- Product CRUD operations
- Vendor storefronts
- Search and filtering
- Inventory management

### Orders Service (Port 3003)
Manages order lifecycle and fulfillment.
- Order creation and management
- Order status tracking
- Shopping cart
- Order history

### Wallet Service (Port 3004)
Handles payments, wallets, and LinkedCoin.
- Payment processing
- Wallet management
- LinkedCoin transactions
- Payout management

### Auth Service (Port 3005)
Authentication, authorization, and KYC.
- User registration/login
- JWT token management
- KYC verification
- Role-based access control

### Logistics Service (Port 3006)
Shipping, tracking, and delivery management.
- Shipment creation
- Tracking updates
- Carrier integration
- Delivery partner management

## Getting Started

### Start All Services

```bash
# From monorepo root
pnpm dev
```

### Start Individual Services

```bash
# API Gateway
cd services/api-gateway && pnpm dev

# Marketplace
cd services/marketplace && pnpm dev

# Orders
cd services/orders && pnpm dev

# Wallet
cd services/wallet && pnpm dev

# Auth
cd services/auth && pnpm dev

# Logistics
cd services/logistics && pnpm dev
```

## Architecture

```
┌─────────────────────────────────────────────┐
│           API Gateway (3001)                │
│  - Routing, Rate Limiting, Auth Middleware  │
└────────────────┬────────────────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
┌─────▼──────┐      ┌──────▼─────┐
│ Marketplace│      │   Orders   │
│   (3002)   │      │   (3003)   │
└────────────┘      └────────────┘
      │                     │
┌─────▼──────┐      ┌──────▼─────┐
│   Wallet   │      │    Auth    │
│   (3004)   │      │   (3005)   │
└────────────┘      └────────────┘
                           │
                    ┌──────▼─────┐
                    │  Logistics │
                    │   (3006)   │
                    └────────────┘
```

## Technology Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Cache**: Redis
- **Message Queue**: Redis Streams / RabbitMQ
- **Logging**: Pino
- **Monitoring**: OpenTelemetry

## Development

Each service follows a similar structure:

```
service/
├── src/
│   ├── index.ts          # Entry point
│   ├── config.ts         # Configuration
│   ├── routes/           # Route handlers
│   ├── controllers/      # Business logic
│   ├── services/         # Database interactions
│   └── middleware/       # Custom middleware
├── package.json
├── tsconfig.json
└── .env.example
```

## Environment Variables

Each service requires its own `.env` file. Copy `.env.example` and configure:

```bash
cp services/{service}/.env.example services/{service}/.env
```

## Testing

```bash
# Test all services
pnpm test

# Test specific service
cd services/api-gateway && pnpm test
```

## Deployment

Services can be deployed independently using:
- Docker containers
- Kubernetes
- AWS ECS/Fargate
- Google Cloud Run

See `/infrastructure` for deployment configurations.
