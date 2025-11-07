import Fastify from "fastify";
import pino from "pino";

const logger = pino({ level: "info" });
const app = Fastify({ logger });

app.get("/", async () => {
  return { message: "Marketplace Service running!" };
});

app.listen({ port: 3001 }, (err, address) => {
  if (err) {
    logger.error(err);
    process.exit(1);
  }
  logger.info(`Marketplace Service running at ${address}`);
});
