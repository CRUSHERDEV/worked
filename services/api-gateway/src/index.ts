import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import { config } from "./config";
import { errorHandler } from "./middleware/error-handler";
import { routes } from "./routes";

const fastify = Fastify({
  logger: {
    level: config.LOG_LEVEL,
    transport:
      config.NODE_ENV === "development"
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
      origin: config.CORS_ORIGIN,
      credentials: true,
    });

    await fastify.register(helmet, {
      contentSecurityPolicy: config.NODE_ENV === "production",
    });

    await fastify.register(rateLimit, {
      max: config.RATE_LIMIT,
      timeWindow: "1 minute",
    });

    // Swagger documentation
    await fastify.register(swagger, {
      openapi: {
        info: {
          title: "Linked All API Gateway",
          description: "API documentation for Linked All platform",
          version: "1.0.0",
        },
        servers: [
          {
            url: `http://localhost:${config.PORT}`,
            description: "Development server",
          },
        ],
      },
    });

    await fastify.register(swaggerUi, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
      },
    });

    // Register error handler
    fastify.setErrorHandler(errorHandler);

    // Register routes
    await fastify.register(routes, { prefix: "/api/v1" });

    // Register health and metrics routes
    const { healthRoutes } = await import("./routes/health");
    await fastify.register(healthRoutes);

    // Register metrics middleware
    const { metricsMiddleware } = await import("./middleware/metrics");
    await fastify.addHook("onRequest", metricsMiddleware);

    // Start server
    await fastify.listen({
      port: config.PORT,
      host: config.HOST,
    });

    console.log(`
╔═══════════════════════════════════════════════╗
║   Linked All API Gateway                      ║
║   Running on: http://${config.HOST}:${config.PORT}        ║
║   Docs: http://${config.HOST}:${config.PORT}/docs         ║
║   Environment: ${config.NODE_ENV}                   ║
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
