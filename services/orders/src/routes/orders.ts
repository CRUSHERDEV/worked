import type { FastifyInstance } from "fastify";
import {
  createOrder,
  getOrderById,
  getOrderByNumber,
  listOrders,
  updateOrderStatus,
  cancelOrder,
  type CreateOrderInput,
  type OrderFilters,
} from "../lib/orders";
import { z } from "zod";
import { OrderStatus } from "@linked-all/types";

const createOrderSchema = z.object({
  userId: z.string().uuid(),
  vendorId: z.string().uuid(),
  items: z.array(
    z.object({
      productId: z.string().uuid(),
      variantId: z.string().uuid().optional(),
      quantity: z.number().int().positive(),
      unitPrice: z.number().positive(),
    })
  ),
  shippingAddress: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    country: z.string().min(1),
    postalCode: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  subtotal: z.number().nonnegative(),
  tax: z.number().nonnegative().optional(),
  shippingFee: z.number().nonnegative().optional(),
  discount: z.number().nonnegative().optional(),
  linkedCoinDiscount: z.number().nonnegative().optional(),
  currency: z.string().default("NGN"),
  notes: z.string().optional(),
});

export async function orderRoutes(fastify: FastifyInstance) {
  // Get all orders with filters
  fastify.get<{ Querystring: OrderFilters }>("/", async (request, reply) => {
    try {
      const filters: OrderFilters = {
        userId: request.query.userId,
        vendorId: request.query.vendorId,
        status: request.query.status,
        page: request.query.page ? parseInt(request.query.page as any) : 1,
        limit: request.query.limit ? parseInt(request.query.limit as any) : 20,
      };

      const result = await listOrders(filters);

      return {
        success: true,
        ...result,
      };
    } catch (error: any) {
      reply.code(500).send({
        success: false,
        error: error.message || "Failed to fetch orders",
      });
    }
  });

  // Get order by ID
  fastify.get<{ Params: { id: string }; Querystring: { userId?: string } }>(
    "/:id",
    async (request, reply) => {
      try {
        const order = await getOrderById(
          request.params.id,
          request.query.userId
        );

        return {
          success: true,
          order,
        };
      } catch (error: any) {
        reply.code(404).send({
          success: false,
          error: error.message || "Order not found",
        });
      }
    }
  );

  // Get order by order number
  fastify.get<{
    Params: { orderNumber: string };
    Querystring: { userId?: string };
  }>("/number/:orderNumber", async (request, reply) => {
    try {
      const order = await getOrderByNumber(
        request.params.orderNumber,
        request.query.userId
      );

      return {
        success: true,
        order,
      };
    } catch (error: any) {
      reply.code(404).send({
        success: false,
        error: error.message || "Order not found",
      });
    }
  });

  // Create order
  fastify.post("/", async (request, reply) => {
    try {
      // TODO: Verify authentication
      const body = createOrderSchema.parse(request.body);
      const order = await createOrder(body as CreateOrderInput);

      return {
        success: true,
        order,
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
        error: error.message || "Failed to create order",
      });
    }
  });

  // Update order status
  fastify.patch<{
    Params: { id: string };
    Body: { status: OrderStatus; userId?: string };
  }>("/:id/status", async (request, reply) => {
    try {
      const { status, userId } = request.body;

      if (!Object.values(OrderStatus).includes(status)) {
        return reply.code(400).send({
          success: false,
          error: "Invalid order status",
        });
      }

      const order = await updateOrderStatus(
        request.params.id,
        status,
        userId
      );

      return {
        success: true,
        order,
      };
    } catch (error: any) {
      reply.code(400).send({
        success: false,
        error: error.message || "Failed to update order status",
      });
    }
  });

  // Cancel order
  fastify.post<{ Params: { id: string }; Body: { userId: string } }>(
    "/:id/cancel",
    async (request, reply) => {
      try {
        const { userId } = request.body;

        if (!userId) {
          return reply.code(400).send({
            success: false,
            error: "userId is required",
          });
        }

        const order = await cancelOrder(request.params.id, userId);

        return {
          success: true,
          order,
        };
      } catch (error: any) {
        reply.code(400).send({
          success: false,
          error: error.message || "Failed to cancel order",
        });
      }
    }
  );
}
