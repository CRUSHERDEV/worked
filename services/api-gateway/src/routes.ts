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
 * Proxy helper function - properly extracts path and query
 */
async function proxyRequest(
  service: keyof typeof services,
  request: any,
  targetPath: string
) {
  const serviceClient = services[service];
  const method = request.method.toLowerCase();

  try {
    // targetPath already includes full path with query if present
    // Just use it directly
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
  // Auth routes (proxy to auth service)
  // Use catch-all parameter pattern - matches /auth and /auth/*
  fastify.all("/auth", async (request, reply) => {
    try {
      // Use raw.url to get full path including query string
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("auth", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  fastify.all("/auth/*", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("auth", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Products/Marketplace routes (proxy to marketplace service)
  fastify.all("/products", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("marketplace", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  fastify.all("/products/*", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("marketplace", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Order routes (proxy to order service)
  fastify.all("/orders", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("orders", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  fastify.all("/orders/*", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("orders", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Wallet routes (proxy to wallet service)
  fastify.all("/wallet", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("wallet", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  fastify.all("/wallet/*", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("wallet", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  // Logistics routes (proxy to logistics service)
  fastify.all("/logistics", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("logistics", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });

  fastify.all("/logistics/*", async (request, reply) => {
    try {
      const fullPath = request.raw.url || request.url;
      const result = await proxyRequest("logistics", request, fullPath);
      return result;
    } catch (error: any) {
      reply.code(error.statusCode || 500).send({
        success: false,
        error: error.message,
      });
    }
  });
}
