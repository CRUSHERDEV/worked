# API Reference

## Base URL

```
Development: http://localhost:3001/api/v1
Production: https://api.linkedall.africa/v1
```

## Authentication

All protected endpoints require a Bearer token:

```
Authorization: Bearer <token>
```

## Common Response Format

### Success Response

```json
{
  "success": true,
  "data": { /* response data */ },
  "meta": { /* optional metadata */ }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": { /* optional error details */ }
  }
}
```

## Pagination

Paginated endpoints accept:

```
?page=1&limit=20
```

Response includes pagination metadata:

```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

## API Endpoints

### Authentication

#### POST /auth/register
Register a new user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "phoneNumber": "+2341234567890",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /auth/login
Login user

**Request:**
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

### Products

#### GET /marketplace/products
List products

**Query Parameters:**
- `category`: Filter by category
- `vendor_id`: Filter by vendor
- `search`: Search query
- `page`, `limit`: Pagination

#### GET /marketplace/products/:id
Get product details

#### POST /marketplace/products
Create a product (vendor only)

### Orders

#### GET /orders
List user orders

#### POST /orders
Create an order

#### GET /orders/:id
Get order details

### Wallet

#### GET /wallet
Get wallet balance

#### POST /wallet/transactions
Create transaction

#### GET /wallet/transactions
List transactions

For complete API documentation, visit:
- Development: http://localhost:3001/docs
- Production: https://api.linkedall.africa/docs
