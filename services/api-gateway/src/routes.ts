import type { FastifyInstance } from "fastify";

export async function routes(fastify: FastifyInstance) {
  // Proxy routes to microservices will be added here
  
  fastify.get("/", async () => {
    return {
      name: "Linked All API Gateway",
      version: "1.0.0",
      status: "running",
      services: {
        marketplace: "/marketplace",
        orders: "/orders",
        wallet: "/wallet",
        auth: "/auth",
        logistics: "/logistics",
      },
    };
  });

  // Marketplace routes (proxy to marketplace service)
  fastify.register(
    async (instance) => {
      instance.get("/products", async () => {
        return { message: "Marketplace service - Get products" };
      });
      
      instance.post("/products", async () => {
        return { message: "Marketplace service - Create product" };
      });
    },
    { prefix: "/marketplace" }
  );

  // Order routes (proxy to order service)
  fastify.register(
    async (instance) => {
      instance.get("/", async () => {
        return { message: "Order service - Get orders" };
      });
      
      instance.post("/", async () => {
        return { message: "Order service - Create order" };
      });
    },
    { prefix: "/orders" }
  );

  // Wallet routes (proxy to wallet service)
  fastify.register(
    async (instance) => {
      instance.get("/", async () => {
        return { message: "Wallet service - Get wallet" };
      });
      
      instance.post("/transactions", async () => {
        return { message: "Wallet service - Create transaction" };
      });
    },
    { prefix: "/wallet" }
  );

  // Auth routes (proxy to auth service)
  fastify.register(
    async (instance) => {
      instance.post("/login", async () => {
        return { message: "Auth service - Login" };
      });
      
      instance.post("/register", async () => {
        return { message: "Auth service - Register" };
      });
    },
    { prefix: "/auth" }
  );

  // Logistics routes (proxy to logistics service)
  fastify.register(
    async (instance) => {
      instance.get("/shipments/:id", async (request) => {
        const { id } = request.params as { id: string };
        return { message: `Logistics service - Get shipment ${id}` };
      });
    },
    { prefix: "/logistics" }
  );
}
