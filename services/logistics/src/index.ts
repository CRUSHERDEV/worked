import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { config as loadEnv } from "dotenv";

loadEnv();

const PORT = parseInt(process.env.PORT || "3006", 10);
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

    // Health check
    fastify.get("/health", async () => ({
      status: "ok",
      service: "logistics",
      timestamp: new Date().toISOString(),
    }));

    // Placeholder routes - to be implemented
    fastify.get("/api/v1/logistics/shipments/:id", async (request) => {
      const { id } = request.params as { id: string };
      return {
        message: `Get shipment ${id} - to be implemented`,
        service: "logistics",
      };
    });

    // Start server
    await fastify.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    console.log(`
╔═══════════════════════════════════════════════╗
║   Linked All Logistics Service                ║
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