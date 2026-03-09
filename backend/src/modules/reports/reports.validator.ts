import { z } from "zod";

export const createReportsSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Reports title is required"),
  }),
});

export type CreateReportsInput = z.infer<typeof createReportsSchema>["body"];
