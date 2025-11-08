/**
 * Products Routes with Caching
 * Product endpoints with Redis cache integration
 */

import { FastifyInstance } from "fastify";
import { CacheAside } from "@linked-all/cache";
import {
  recordDbQuery,
  recordCacheHit,
  recordCacheMiss,
  recordCacheOperation,
} from "@linked-all/monitoring";

export async function productsRoutes(fastify: FastifyInstance) {
  // Get all products (with caching)
  fastify.get("/products", async (request, reply) => {
    const cacheKey = "products:all";
    const start = Date.now();

    try {
      // Try to get from cache first
      const cached = await CacheAside.get(cacheKey, {
        ttl: 3600, // 1 hour
        prefix: "marketplace",
      });

      const cacheDuration = Date.now() - start;
      recordCacheOperation("get", cacheDuration / 1000);

      if (cached) {
        recordCacheHit(cacheKey);
        return cached;
      }

      recordCacheMiss(cacheKey);

      // If not in cache, fetch from database
      // TODO: Replace with actual database query
      const dbStart = Date.now();
      const products = [
        {
          id: "1",
          name: "Sample Product",
          price: 100,
          description: "A sample product",
        },
      ];
      const dbDuration = Date.now() - dbStart;
      recordDbQuery("select", "products", dbDuration / 1000);

      // Store in cache
      await CacheAside.set(
        cacheKey,
        products,
        {
          ttl: 3600,
          prefix: "marketplace",
        }
      );

      return products;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to fetch products" });
    }
  });

  // Get product by ID (with caching)
  fastify.get("/products/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const cacheKey = `product:${id}`;

    try {
      // Try cache first
      const cached = await CacheAside.get(cacheKey, {
        ttl: 1800, // 30 minutes
        prefix: "marketplace",
      });

      if (cached) {
        recordCacheHit(cacheKey);
        return cached;
      }

      recordCacheMiss(cacheKey);

      // Fetch from database
      // TODO: Replace with actual database query
      const product = {
        id,
        name: "Sample Product",
        price: 100,
        description: "A sample product",
      };

      // Store in cache
      await CacheAside.set(
        cacheKey,
        product,
        {
          ttl: 1800,
          prefix: "marketplace",
        }
      );

      return product;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to fetch product" });
    }
  });

  // Create product (invalidate cache)
  fastify.post("/products", async (request, reply) => {
    try {
      // TODO: Create product in database
      const product = request.body;

      // Invalidate cache
      await CacheAside.invalidate("marketplace:products:*");

      reply.code(201).send(product);
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to create product" });
    }
  });

  // Update product (invalidate cache)
  fastify.put("/products/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      // TODO: Update product in database
      const product = request.body;

      // Invalidate cache
      await CacheAside.delete(`product:${id}`, "marketplace");
      await CacheAside.invalidate("marketplace:products:*");

      return product;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to update product" });
    }
  });

  // Delete product (invalidate cache)
  fastify.delete("/products/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      // TODO: Delete product from database

      // Invalidate cache
      await CacheAside.delete(`product:${id}`, "marketplace");
      await CacheAside.invalidate("marketplace:products:*");

      reply.code(204).send();
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to delete product" });
    }
  });
}

