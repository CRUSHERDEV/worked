import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import axios from "axios";
import { config } from "./config";

export async function routes(fastify: FastifyInstance) {
  // Root endpoint
  fastify.get("/", async () => {
    return {
      name: "Linked All API Gateway",
      version: "1.0.0",
      status: "running",
      services: {
        marketplace: "/api/v1/marketplace",
        orders: "/api/v1/orders",
        wallet: "/api/v1/wallet",
        auth: "/api/v1/auth",
        logistics: "/api/v1/logistics",
      },
    };
  });

  // Marketplace routes (proxy to marketplace service)
  fastify.register(
    async (instance) => {
      // Proxy all marketplace routes
      instance.all("/*", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const path = (request.params as { "*"?: string })["*"] || "";
          const url = `${config.MARKETPLACE_SERVICE_URL}/${path}`;
          const queryString = request.url.split("?")[1] || "";
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          const response = await axios({
            method: request.method,
            url: fullUrl,
            data: request.body,
            headers: {
              "Content-Type": "application/json",
              ...(request.headers.authorization && {
                Authorization: request.headers.authorization,
              }),
            },
          });

          reply.code(response.status).send(response.data);
        } catch (error: any) {
          fastify.log.error(error);
          if (error.response) {
            reply.code(error.response.status).send(error.response.data);
          } else {
            reply.code(500).send({ error: "Failed to proxy request to marketplace service" });
          }
        }
      });
    },
    { prefix: "/marketplace" }
  );

  // Order routes (proxy to order service)
  fastify.register(
    async (instance) => {
      // Proxy all order routes
      instance.all("/*", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const path = (request.params as { "*"?: string })["*"] || "";
          const url = `${config.ORDER_SERVICE_URL}/${path}`;
          const queryString = request.url.split("?")[1] || "";
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          const response = await axios({
            method: request.method,
            url: fullUrl,
            data: request.body,
            headers: {
              "Content-Type": "application/json",
              ...(request.headers.authorization && {
                Authorization: request.headers.authorization,
              }),
            },
          });

          reply.code(response.status).send(response.data);
        } catch (error: any) {
          fastify.log.error(error);
          if (error.response) {
            reply.code(error.response.status).send(error.response.data);
          } else {
            reply.code(500).send({ error: "Failed to proxy request to orders service" });
          }
        }
      });
    },
    { prefix: "/orders" }
  );

  // Wallet routes (proxy to wallet service)
  fastify.register(
    async (instance) => {
      // Proxy all wallet routes
      instance.all("/*", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const path = (request.params as { "*"?: string })["*"] || "";
          const url = `${config.WALLET_SERVICE_URL}/${path}`;
          const queryString = request.url.split("?")[1] || "";
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          const response = await axios({
            method: request.method,
            url: fullUrl,
            data: request.body,
            headers: {
              "Content-Type": "application/json",
              ...(request.headers.authorization && {
                Authorization: request.headers.authorization,
              }),
            },
          });

          reply.code(response.status).send(response.data);
        } catch (error: any) {
          fastify.log.error(error);
          if (error.response) {
            reply.code(error.response.status).send(error.response.data);
          } else {
            reply.code(500).send({ error: "Failed to proxy request to wallet service" });
          }
        }
      });
    },
    { prefix: "/wallet" }
  );

  // Auth routes (proxy to auth service)
  fastify.register(
    async (instance) => {
      // Proxy all auth routes
      instance.all("/*", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const path = (request.params as { "*"?: string })["*"] || "";
          const url = `${config.AUTH_SERVICE_URL}/${path}`;
          const queryString = request.url.split("?")[1] || "";
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          const response = await axios({
            method: request.method,
            url: fullUrl,
            data: request.body,
            headers: {
              "Content-Type": "application/json",
              ...(request.headers.authorization && {
                Authorization: request.headers.authorization,
              }),
            },
          });

          reply.code(response.status).send(response.data);
        } catch (error: any) {
          fastify.log.error(error);
          if (error.response) {
            reply.code(error.response.status).send(error.response.data);
          } else {
            reply.code(500).send({ error: "Failed to proxy request to auth service" });
          }
        }
      });
    },
    { prefix: "/auth" }
  );

  // Logistics routes (proxy to logistics service)
  fastify.register(
    async (instance) => {
      // Proxy all logistics routes
      instance.all("/*", async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const path = (request.params as { "*"?: string })["*"] || "";
          const url = `${config.LOGISTICS_SERVICE_URL}/${path}`;
          const queryString = request.url.split("?")[1] || "";
          const fullUrl = queryString ? `${url}?${queryString}` : url;

          const response = await axios({
            method: request.method,
            url: fullUrl,
            data: request.body,
            headers: {
              "Content-Type": "application/json",
              ...(request.headers.authorization && {
                Authorization: request.headers.authorization,
              }),
            },
          });

          reply.code(response.status).send(response.data);
        } catch (error: any) {
          fastify.log.error(error);
          if (error.response) {
            reply.code(error.response.status).send(error.response.data);
          } else {
            reply.code(500).send({ error: "Failed to proxy request to logistics service" });
          }
        }
      });
    },
    { prefix: "/logistics" }
  );
}
