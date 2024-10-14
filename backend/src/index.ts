import Fastify from "fastify";

(async () => {
  const fastify = Fastify({});

  fastify.get("/hello", async () => {
    return { hello: "world" };
  });

  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
  }
})();
