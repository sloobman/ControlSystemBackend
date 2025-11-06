import { FastifyInstance } from "fastify";

export default async function usersRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    return [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
  });
}