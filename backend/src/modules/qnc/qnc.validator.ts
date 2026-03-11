import { z } from "zod";

export const createQncSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Qnc title is required"),
  }),
});

export type CreateQncInput = z.infer<typeof createQncSchema>["body"];
