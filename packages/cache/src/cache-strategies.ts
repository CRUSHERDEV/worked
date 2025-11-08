/**
 * Caching Strategies
 * Different caching strategies for various use cases
 */

import { redis } from "./redis-client";

export interface CacheOptions {
  ttl?: number; // Time to live in seconds
  prefix?: string; // Key prefix
  serialize?: boolean; // Whether to JSON serialize/deserialize
}

/**
 * Cache-aside strategy
 * Application checks cache first, then database
 */
export class CacheAside {
  /**
   * Get value from cache
   */
  static async get<T>(
    key: string,
    options?: CacheOptions
  ): Promise<T | null> {
    try {
      const fullKey = this.getKey(key, options?.prefix);
      const value = await redis.get(fullKey);

      if (!value) {
        return null;
      }

      if (options?.serialize !== false) {
        return JSON.parse(value) as T;
      }

      return value as T;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  static async set<T>(
    key: string,
    value: T,
    options?: CacheOptions
  ): Promise<boolean> {
    try {
      const fullKey = this.getKey(key, options?.prefix);
      const ttl = options?.ttl || 3600; // Default 1 hour

      let serializedValue: string;
      if (options?.serialize !== false) {
        serializedValue = JSON.stringify(value);
      } else {
        serializedValue = String(value);
      }

      await redis.setex(fullKey, ttl, serializedValue);
      return true;
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete value from cache
   */
  static async delete(key: string, prefix?: string): Promise<boolean> {
    try {
      const fullKey = this.getKey(key, prefix);
      await redis.del(fullKey);
      return true;
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Delete multiple keys by pattern
   */
  static async deleteByPattern(pattern: string): Promise<number> {
    try {
      const keys = await redis.keys(pattern);
      if (keys.length === 0) {
        return 0;
      }
      return await redis.del(...keys);
    } catch (error) {
      console.error(`Cache delete pattern error for ${pattern}:`, error);
      return 0;
    }
  }

  /**
   * Check if key exists
   */
  static async exists(key: string, prefix?: string): Promise<boolean> {
    try {
      const fullKey = this.getKey(key, prefix);
      const result = await redis.exists(fullKey);
      return result === 1;
    } catch (error) {
      console.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Get or set pattern (cache-aside)
   */
  static async getOrSet<T>(
    key: string,
    fetcher: () => Promise<T>,
    options?: CacheOptions
  ): Promise<T> {
    const cached = await this.get<T>(key, options);
    if (cached !== null) {
      return cached;
    }

    const value = await fetcher();
    await this.set(key, value, options);
    return value;
  }

  /**
   * Invalidate cache by pattern
   */
  static async invalidate(pattern: string): Promise<number> {
    return this.deleteByPattern(pattern);
  }

  /**
   * Get full cache key with prefix
   */
  private static getKey(key: string, prefix?: string): string {
    if (prefix) {
      return `${prefix}:${key}`;
    }
    return key;
  }
}

/**
 * Write-through cache strategy
 * Write to both cache and database simultaneously
 */
export class WriteThrough {
  /**
   * Write through cache and database
   */
  static async set<T>(
    key: string,
    value: T,
    dbWriter: (value: T) => Promise<void>,
    options?: CacheOptions
  ): Promise<boolean> {
    try {
      // Write to database first
      await dbWriter(value);

      // Then write to cache
      return await CacheAside.set(key, value, options);
    } catch (error) {
      console.error(`Write-through error for key ${key}:`, error);
      return false;
    }
  }
}

/**
 * Write-back cache strategy
 * Write to cache first, then batch write to database
 */
export class WriteBack {
  private static pendingWrites: Map<string, any> = new Map();
  private static writeTimer: NodeJS.Timeout | null = null;

  /**
   * Write to cache (lazy write to database)
   */
  static async set<T>(
    key: string,
    value: T,
    dbWriter: (key: string, value: T) => Promise<void>,
    options?: CacheOptions
  ): Promise<boolean> {
    try {
      // Write to cache immediately
      await CacheAside.set(key, value, options);

      // Queue database write
      this.pendingWrites.set(key, { value, dbWriter });

      // Schedule batch write
      this.scheduleBatchWrite();

      return true;
    } catch (error) {
      console.error(`Write-back error for key ${key}:`, error);
      return false;
    }
  }

  /**
   * Schedule batch write to database
   */
  private static scheduleBatchWrite(): void {
    if (this.writeTimer) {
      return;
    }

    this.writeTimer = setTimeout(async () => {
      await this.flush();
      this.writeTimer = null;
    }, 5000); // Flush every 5 seconds
  }

  /**
   * Flush pending writes to database
   */
  static async flush(): Promise<void> {
    const writes = Array.from(this.pendingWrites.entries());
    this.pendingWrites.clear();

    await Promise.all(
      writes.map(async ([key, { value, dbWriter }]) => {
        try {
          await dbWriter(key, value);
        } catch (error) {
          console.error(`Write-back flush error for key ${key}:`, error);
        }
      })
    );
  }
}

