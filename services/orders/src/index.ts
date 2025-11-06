import Fastify from "fastify";
import { config as loadEnv } from "dotenv";

loadEnv();

const PORT = parseInt(process.env.PORT || "3003", 10);

const fastify = Fastify({ logger: true });

fastify.get("/health", async () => ({ status: "ok", service: "orders" }));

fastify.get("/", async () => ({
  message: "List orders - to be implemented",
  service: "orders",
}));

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Orders Service running on port ${PORT}`);
});
