/**
 * Redis Client Setup
 * Creates and manages Redis connection for caching
 */

import Redis, { RedisOptions } from "ioredis";

export interface CacheConfig {
  host?: string;
  port?: number;
  password?: string;
  db?: number;
  keyPrefix?: string;
  ttl?: number; // Default TTL in seconds
  retryStrategy?: (times: number) => number | null;
}

const defaultConfig: CacheConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: parseInt(process.env.REDIS_PORT || "6379", 10),
  password: process.env.REDIS_PASSWORD,
  db: parseInt(process.env.REDIS_DB || "0", 10),
  keyPrefix: process.env.REDIS_KEY_PREFIX || "linked-all:",
  ttl: parseInt(process.env.REDIS_DEFAULT_TTL || "3600", 10),
  retryStrategy: (times: number) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
};

let redisClient: Redis | null = null;

/**
 * Get or create Redis client instance
 */
export function getRedisClient(config?: CacheConfig): Redis {
  if (redisClient) {
    return redisClient;
  }

  const redisConfig: RedisOptions = {
    host: config?.host || defaultConfig.host,
    port: config?.port || defaultConfig.port,
    password: config?.password || defaultConfig.password,
    db: config?.db || defaultConfig.db,
    keyPrefix: config?.keyPrefix || defaultConfig.keyPrefix,
    retryStrategy: config?.retryStrategy || defaultConfig.retryStrategy,
    enableReadyCheck: true,
    maxRetriesPerRequest: 3,
    lazyConnect: true,
  };

  redisClient = new Redis(redisConfig);

  redisClient.on("error", (error) => {
    console.error("Redis Client Error:", error);
  });

  redisClient.on("connect", () => {
    console.log("Redis Client Connected");
  });

  redisClient.on("ready", () => {
    console.log("Redis Client Ready");
  });

  redisClient.on("close", () => {
    console.log("Redis Client Closed");
  });

  return redisClient;
}

/**
 * Close Redis connection
 */
export async function closeRedisClient(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
    redisClient = null;
  }
}

/**
 * Check if Redis is available
 */
export async function isRedisAvailable(): Promise<boolean> {
  try {
    const client = getRedisClient();
    await client.ping();
    return true;
  } catch (error) {
    return false;
  }
}

// Export default client
export const redis = getRedisClient();

