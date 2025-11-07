import Fastify from "fastify";

const app = Fastify({ logger: true }); // let Fastify handle Pino internally

app.get("/", async () => ({ message: "Wallet Service running!" }));

app.listen({ port: 3003 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Wallet Service running at ${address}`);
});
