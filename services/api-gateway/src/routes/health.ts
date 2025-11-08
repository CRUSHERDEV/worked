/**
 * Health Check Routes
 * Health check endpoint for monitoring
 */

import { FastifyInstance } from "fastify";
import { createHealthCheck } from "@linked-all/monitoring";
import { isRedisAvailable } from "@linked-all/cache";

export async function healthRoutes(fastify: FastifyInstance) {
  // Basic health check
  fastify.get("/health", async (request, reply) => {
    return {
      status: "healthy",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    };
  });

  // Detailed health check
  fastify.get("/health/detailed", async (request, reply) => {
    const health = await createHealthCheck("api-gateway", {
      cache: async () => {
        return await isRedisAvailable();
      },
    });

    if (health.status === "unhealthy") {
      reply.code(503);
    }

    return health;
  });

  // Metrics endpoint
  fastify.get("/metrics", async (request, reply) => {
    const { getMetrics } = await import("@linked-all/monitoring");
    const metrics = await getMetrics();
    reply.type("text/plain");
    return metrics;
  });
}

