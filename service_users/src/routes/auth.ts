import { FastifyInstance } from "fastify";
import { z } from "zod";
import bcrypt from "bcrypt";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default async function (app: FastifyInstance) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(1)
  });

  app.post("/api/v1/auth/register", async (req, reply) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: { code: "INVALID_INPUT", message: parsed.error.message }});
    }
    // TODO: prisma create user + bcrypt hash
    return reply.send({ success: true, data: { id: "stub-id", email: parsed.data.email, name: parsed.data.name }});
  });

  app.post("/api/v1/auth/login", async (req, reply) => {
    // TODO: check user + sign JWT
    return reply.send({ success: true, data: { token: "stub-token" }});
  });
}
