import type { FastifyInstance } from "fastify";
import {
  createProduct,
  getProductById,
  getProductBySlug,
  listProducts,
  updateProduct,
  deleteProduct,
  type CreateProductInput,
  type UpdateProductInput,
  type ProductFilters,
} from "../lib/products";
import { z } from "zod";

const createProductSchema = z.object({
  vendorId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.enum([
    "electronics",
    "fashion",
    "home_garden",
    "health_beauty",
    "food_beverages",
    "agriculture",
    "automotive",
    "books_media",
    "sports",
    "toys_games",
    "other",
  ]),
  subCategory: z.string().optional(),
  condition: z.enum(["new", "refurbished", "used_like_new", "used_good", "used_acceptable"]),
  basePrice: z.number().positive(),
  currency: z.string().default("NGN"),
  compareAtPrice: z.number().positive().optional(),
  costPrice: z.number().positive().optional(),
  sku: z.string().min(1),
  barcode: z.string().optional(),
  quantity: z.number().int().min(0),
  trackInventory: z.boolean().default(true),
  lowStockThreshold: z.number().int().min(0).optional(),
  allowBackorder: z.boolean().default(false),
  weight: z.number().positive().optional(),
  images: z.array(z.string().url()).optional(),
  specifications: z.record(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  keywords: z.array(z.string()).optional(),
});

const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().uuid(),
});

export async function productRoutes(fastify: FastifyInstance) {
  // Get all products with filters
  fastify.get<{ Querystring: ProductFilters }>("/", async (request, reply) => {
    try {
      const filters: ProductFilters = {
        category: request.query.category,
        vendorId: request.query.vendorId,
        status: request.query.status,
        minPrice: request.query.minPrice ? parseFloat(request.query.minPrice as any) : undefined,
        maxPrice: request.query.maxPrice ? parseFloat(request.query.maxPrice as any) : undefined,
        search: request.query.search,
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
      };

      const result = await listProducts(filters);

      return {
        success: true,
        ...result,
      };
    } catch (error: any) {
      reply.code(500).send({
        success: false,
        error: error.message || "Failed to fetch products",
      });
    }
  });

  // Get product by ID
  fastify.get<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
      const product = await getProductById(request.params.id);

      return {
        success: true,
        product,
      };
    } catch (error: any) {
      reply.code(404).send({
        success: false,
        error: error.message || "Product not found",
      });
    }
  });

  // Get product by slug
  fastify.get<{ Params: { slug: string } }>("/slug/:slug", async (request, reply) => {
    try {
      const product = await getProductBySlug(request.params.slug);

      return {
        success: true,
        product,
      };
    } catch (error: any) {
      reply.code(404).send({
        success: false,
        error: error.message || "Product not found",
      });
    }
  });

  // Create product (requires authentication)
  fastify.post("/", async (request, reply) => {
    try {
      // TODO: Verify authentication and vendor ownership
      const body = createProductSchema.parse(request.body);
      const product = await createProduct(body as CreateProductInput);

      return {
        success: true,
        product,
      };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          success: false,
          error: "Validation error",
          details: error.errors,
        });
      }

      reply.code(400).send({
        success: false,
        error: error.message || "Failed to create product",
      });
    }
  });

  // Update product (requires authentication)
  fastify.put<{ Params: { id: string } }>("/:id", async (request, reply) => {
    try {
      // TODO: Verify authentication and vendor ownership
      const body = updateProductSchema.parse({
        ...request.body,
        id: request.params.id,
      });

      const product = await updateProduct(body as UpdateProductInput);

      return {
        success: true,
        product,
      };
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return reply.code(400).send({
          success: false,
          error: "Validation error",
          details: error.errors,
        });
      }

      reply.code(400).send({
        success: false,
        error: error.message || "Failed to update product",
      });
    }
  });

  // Delete product (requires authentication)
  fastify.delete<{ Params: { id: string }; Querystring: { vendorId: string } }>(
    "/:id",
    async (request, reply) => {
      try {
        // TODO: Verify authentication and vendor ownership
        const vendorId = request.query.vendorId;
        if (!vendorId) {
          return reply.code(400).send({
            success: false,
            error: "vendorId is required",
          });
        }

        await deleteProduct(request.params.id, vendorId);

        return {
          success: true,
          message: "Product deleted successfully",
        };
      } catch (error: any) {
        reply.code(400).send({
          success: false,
          error: error.message || "Failed to delete product",
        });
      }
    }
  );
}
