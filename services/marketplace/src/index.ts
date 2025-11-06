import Fastify from "fastify";
import { config as loadEnv } from "dotenv";

loadEnv();

const PORT = parseInt(process.env.PORT || "3002", 10);

const fastify = Fastify({ logger: true });

fastify.get("/health", async () => ({ status: "ok", service: "marketplace" }));

fastify.get("/products", async () => ({
  message: "List products - to be implemented",
  service: "marketplace",
}));

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Marketplace Service running on port ${PORT}`);
});
