# @linked-all/cache

Redis cache client and caching strategies for Linked All platform.

## Installation

```bash
pnpm add @linked-all/cache
```

## Usage

### Basic Cache Operations

```typescript
import { CacheAside } from "@linked-all/cache";

// Set value
await CacheAside.set("user:123", { name: "John", email: "john@example.com" }, {
  ttl: 3600, // 1 hour
  prefix: "cache"
});

// Get value
const user = await CacheAside.get("user:123", { prefix: "cache" });

// Delete value
await CacheAside.delete("user:123", "cache");

// Get or set (cache-aside pattern)
const products = await CacheAside.getOrSet(
  "products:all",
  async () => {
    // Fetch from database
    return await db.getProducts();
  },
  { ttl: 3600 }
);
```

### Cache Strategies

#### Cache-Aside (Most Common)
```typescript
import { CacheAside } from "@linked-all/cache";

// Check cache first, then database
const data = await CacheAside.getOrSet(
  "key",
  async () => fetchFromDatabase(),
  { ttl: 3600 }
);
```

#### Write-Through
```typescript
import { WriteThrough } from "@linked-all/cache";

// Write to both cache and database
await WriteThrough.set(
  "key",
  value,
  async (val) => await db.save(val),
  { ttl: 3600 }
);
```

## Environment Variables

```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your-password
REDIS_DB=0
REDIS_KEY_PREFIX=linked-all:
REDIS_DEFAULT_TTL=3600
```

## Features

- ✅ Cache-aside strategy
- ✅ Write-through strategy
- ✅ Write-back strategy
- ✅ Pattern-based invalidation
- ✅ Automatic JSON serialization
- ✅ Configurable TTL
- ✅ Key prefix support
- ✅ Error handling
- ✅ Connection management

