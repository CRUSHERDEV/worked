# API Gateway Service

Central API Gateway for the Linked All platform. Routes requests to appropriate microservices.

## Features

- Request routing and proxying
- Rate limiting
- CORS handling
- API documentation (Swagger/OpenAPI)
- Error handling
- Request logging

## Tech Stack

- Fastify (HTTP framework)
- TypeScript
- Pino (logging)
- Swagger/OpenAPI

## Getting Started

### Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

## API Documentation

Once running, visit:
- API Docs: http://localhost:3001/docs
- Health Check: http://localhost:3001/health

## Routes

- `GET /health` - Health check
- `GET /api/v1` - API info
- `GET /api/v1/marketplace/*` - Marketplace service routes
- `GET /api/v1/orders/*` - Order service routes
- `GET /api/v1/wallet/*` - Wallet service routes
- `POST /api/v1/auth/*` - Auth service routes
- `GET /api/v1/logistics/*` - Logistics service routes
