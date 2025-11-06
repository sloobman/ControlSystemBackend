import Fastify from "fastify";
import authRoutes from "./routes/auth";

const app = Fastify({ logger: true });

app.register(authRoutes);

const start = async () => {
  try {
    await app.listen({ port: Number(process.env.PORT) || 4000, host: "0.0.0.0" });
    console.log("service_users started");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};
start();
