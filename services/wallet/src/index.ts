import Fastify from "fastify";
import { config as loadEnv } from "dotenv";

loadEnv();

const PORT = parseInt(process.env.PORT || "3004", 10);

const fastify = Fastify({ logger: true });

fastify.get("/health", async () => ({ status: "ok", service: "wallet" }));

fastify.get("/", async () => ({
  message: "Get wallet - to be implemented",
  service: "wallet",
}));

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Wallet Service running on port ${PORT}`);
});
