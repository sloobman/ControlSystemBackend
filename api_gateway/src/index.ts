import Fastify from "fastify";
import proxy from "fastify-http-proxy";
import rateLimit from "fastify-rate-limit";
import { v4 as uuidv4 } from "uuid";

const app = Fastify({ logger: true });

app.register(rateLimit, { max: 100, timeWindow: "1 minute" });

app.addHook("onRequest", async (req, reply) => {
  if (!req.headers["x-request-id"]) {
    reply.header("x-request-id", uuidv4());
  }
});

// proxy rules (use env overrides)
app.register(proxy, { upstream: process.env.USERS_URL || "http://service_users:4000", prefix: "/api/v1/users" });
app.register(proxy, { upstream: process.env.ORDERS_URL || "http://service_orders:5000", prefix: "/api/v1/orders" });

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 3000, host: "0.0.0.0" });
    console.log("Gateway listening");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
