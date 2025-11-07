import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { config as loadEnv } from "dotenv";
import { orderRoutes } from "./routes/orders";

loadEnv();

const PORT = parseInt(process.env.PORT || "3003", 10);
const NODE_ENV = process.env.NODE_ENV || "development";

const fastify = Fastify({
  logger: {
    level: "info",
    transport:
      NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          }
        : undefined,
  },
});

async function start() {
  try {
    // Register plugins
    await fastify.register(cors, {
      origin: true,
      credentials: true,
    });

    await fastify.register(helmet, {
      contentSecurityPolicy: NODE_ENV === "production",
    });

    // Register routes
    await fastify.register(orderRoutes, { prefix: "/api/v1/orders" });

    // Health check
    fastify.get("/health", async () => ({
      status: "ok",
      service: "orders",
      timestamp: new Date().toISOString(),
    }));

    // Start server
    await fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`
╔═══════════════════════════════════════════════╗
║   Linked All Orders Service                   ║
║   Running on: http://0.0.0.0:${PORT}              ║
║   Environment: ${NODE_ENV}                           ║
╚═══════════════════════════════════════════════╝
    `);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Handle shutdown gracefully
const signals = ["SIGINT", "SIGTERM"];
signals.forEach((signal) => {
  process.on(signal, async () => {
    console.log(`\nReceived ${signal}, shutting down gracefully...`);
    await fastify.close();
    process.exit(0);
  });
});

start();
