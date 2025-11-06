import { FastifyInstance } from "fastify";
import { z } from "zod";

export default async function (app: FastifyInstance) {
  const createSchema = z.object({
    items: z.array(z.object({ product: z.string(), qty: z.number().int().positive() })).nonempty(),
    total: z.number().positive()
  });

  app.post("/api/v1/orders", async (req, reply) => {
    const parsed = createSchema.safeParse(req.body);
    if (!parsed.success) {
      return reply.status(400).send({ success: false, error: { code: "INVALID_INPUT", message: parsed.error.message }});
    }
    // TODO: create order in DB and publish event
    return reply.send({ success: true, data: { id: "stub-order-id", status: "created" }});
  });
}
