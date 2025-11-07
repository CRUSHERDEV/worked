import Fastify from "fastify";
import pino from "pino";

const logger = pino({ level: "info" });
const app = Fastify({ logger });

app.get("/", async () => {
  return { message: "Auth Service running!" };
});

const PORT = process.env.PORT || 3004;

app.listen({ port: Number(PORT), host: "0.0.0.0" }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Auth Service running at ${address}`);
});
