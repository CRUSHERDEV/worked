import Fastify from "fastify";
import { config as loadEnv } from "dotenv";

loadEnv();

const PORT = parseInt(process.env.PORT || "3006", 10);

const fastify = Fastify({ logger: true });

fastify.get("/health", async () => ({ status: "ok", service: "logistics" }));

fastify.get("/shipments/:id", async (request) => {
  const { id } = request.params as { id: string };
  return {
    message: `Get shipment ${id} - to be implemented`,
    service: "logistics",
  };
});

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Logistics Service running on port ${PORT}`);
});
