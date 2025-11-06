import Fastify from "fastify";
import ordersRoutes from "./routes/orders";

const app = Fastify({ logger: true });

app.register(ordersRoutes);

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 5000, host: "0.0.0.0" });
    console.log("service_orders started");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
