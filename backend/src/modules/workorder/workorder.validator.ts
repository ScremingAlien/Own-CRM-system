import { z } from "zod";

export const createWorkorderSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Workorder title is required"),
  }),
});

export type CreateWorkorderInput = z.infer<typeof createWorkorderSchema>["body"];
