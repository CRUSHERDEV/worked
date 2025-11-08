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
import { getSupabaseClient } from "../lib/supabase";

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
        transformedProducts,
        {
          ttl: 3600,
          prefix: "marketplace",
        }
      );

      return transformedProducts;
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
      const supabase = getSupabaseClient();
      
      const { data: product, error } = await supabase
        .from("products")
        .select(`
          *,
          vendors:vendor_id (
            id,
            name,
            rating
          ),
          categories:category_id (
            id,
            name,
            slug
          )
        `)
        .eq("id", id)
        .eq("status", "active")
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          reply.code(404).send({ error: "Product not found" });
          return;
        }
        throw error;
      }

      if (!product) {
        reply.code(404).send({ error: "Product not found" });
        return;
      }

      // Transform the data
      const transformedProduct = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency || "USD",
        image: product.images && product.images.length > 0 ? product.images[0] : null,
        images: product.images || [],
        category: product.categories?.name || product.category_id,
        categoryId: product.category_id,
        vendorId: product.vendor_id,
        vendor: product.vendors ? {
          id: product.vendors.id,
          name: product.vendors.name,
          rating: product.vendors.rating,
        } : undefined,
        stock: product.stock_quantity,
        sku: product.sku,
        rating: product.rating,
        reviewCount: product.review_count,
        tags: product.tags || [],
        specifications: product.specifications || {},
        createdAt: product.created_at,
        updatedAt: product.updated_at,
      };

      // Store in cache
      await CacheAside.set(
        cacheKey,
        transformedProduct,
        {
          ttl: 1800,
          prefix: "marketplace",
        }
      );

      return transformedProduct;
    } catch (error: any) {
      fastify.log.error(error);
      reply.code(500).send({ error: "Failed to fetch product", details: error.message });
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

