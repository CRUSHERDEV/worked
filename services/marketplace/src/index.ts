import Fastify from "fastify";
import { config } from "./config";
import { productsRoutes } from "./routes/products";
import { createHealthCheck } from "@linked-all/monitoring";
import { isRedisAvailable } from "@linked-all/cache";

const app = Fastify({ logger: true });

// Root endpoint
app.get("/", async () => {
  return { message: "Marketplace Service running!" };
});

// Register routes
app.register(productsRoutes, { prefix: "/products" });

// Health check
app.get("/health", async (request, reply) => {
  const health = await createHealthCheck("marketplace", {
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
app.get("/metrics", async (request, reply) => {
  const { getMetrics } = await import("@linked-all/monitoring");
  const metrics = await getMetrics();
  reply.type("text/plain");
  return metrics;
});

const PORT = process.env.PORT || 3002;

app.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Marketplace Service running at ${address}`);
});
