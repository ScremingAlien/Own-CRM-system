import { z } from "zod";

export const createWorkerSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Worker title is required"),
  }),
});

export type CreateWorkerInput = z.infer<typeof createWorkerSchema>["body"];
