import Fastify from "fastify";

const app = Fastify({ logger: true }); // let Fastify handle Pino internally

app.get("/", async () => ({ message: "Logistics Service running!" }));

app.listen({ port: 3002 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Logistics Service running at ${address}`);
});
