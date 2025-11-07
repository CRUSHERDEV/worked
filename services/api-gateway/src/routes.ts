import type { FastifyInstance } from "fastify";
import { config } from "./config";
import axios from "axios";

// Create axios instances for each service
const services = {
  auth: axios.create({
    baseURL: config.AUTH_SERVICE_URL,
    timeout: 10000,
  }),
  marketplace: axios.create({
    baseURL: config.MARKETPLACE_SERVICE_URL,
    timeout: 10000,
  }),
  orders: axios.create({
    baseURL: config.ORDER_SERVICE_URL,
    timeout: 10000,
  }),
  wallet: axios.create({
    baseURL: config.WALLET_SERVICE_URL,
    timeout: 10000,
  }),
  logistics: axios.create({
    baseURL: config.LOGISTICS_SERVICE_URL,
    timeout: 10000,
  }),
};

/**
 * Proxy helper function
 */
async function proxyRequest(
  service: keyof typeof services,
  request: any,
  targetPath: string
) {
  const serviceClient = services[service];
  const method = request.method.toLowerCase();

  try {
    const response = await serviceClient.request({
      method: method as any,
      url: targetPath,
      data: request.body,
      params: request.query,
      headers: {
        ...request.headers,
        host: undefined, // Remove host header
      },
    });

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw {
        statusCode: error.response.status,
        message: error.response.data || error.message,
      };
    }
    throw {
      statusCode: 500,
      message: error.message || "Service unavailable",
    };
  }
}

export async function routes(fastify: FastifyInstance) {
  // API info endpoint
  fastify.get("/", async () => {
    return {
      name: "Linked All API Gateway",
      version: "1.0.0",
      status: "running",
      services: {
        auth: "/api/v1/auth",
        marketplace: "/api/v1/products",
        orders: "/api/v1/orders",
        wallet: "/api/v1/wallet",
        logistics: "/api/v1/logistics",
      },
    };
  });

  // Auth routes (proxy to auth service)
  fastify.all("/api/v1/auth/*", async (request, reply) => {
    try {
      const path = request.url.replace("/api/v1", "");
      const result = await proxyRequest("auth", request, path);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Products/Marketplace routes (proxy to marketplace service)
  fastify.all("/api/v1/products/*", async (request, reply) => {
    try {
      const path = request.url.replace("/api/v1", "");
      const result = await proxyRequest("marketplace", request, path);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Order routes (proxy to order service)
  fastify.all("/api/v1/orders/*", async (request, reply) => {
    try {
      const path = request.url.replace("/api/v1", "");
      const result = await proxyRequest("orders", request, path);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Wallet routes (proxy to wallet service)
  fastify.all("/api/v1/wallet/*", async (request, reply) => {
    try {
      const path = request.url.replace("/api/v1", "");
      const result = await proxyRequest("wallet", request, path);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Logistics routes (proxy to logistics service)
  fastify.all("/api/v1/logistics/*", async (request, reply) => {
    try {
      const path = request.url.replace("/api/v1", "");
      const result = await proxyRequest("logistics", request, path);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
