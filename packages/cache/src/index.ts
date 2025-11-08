/**
 * @linked-all/cache
 * Redis cache client and caching strategies
 */

export * from "./redis-client";
export * from "./cache-strategies";

// Default export
export { redis, getRedisClient, closeRedisClient, isRedisAvailable } from "./redis-client";
export { CacheAside, WriteThrough, WriteBack } from "./cache-strategies";

