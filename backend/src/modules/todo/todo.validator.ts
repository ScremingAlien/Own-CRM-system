import { z } from "zod";

export const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
  }),
});

export type CreateTodoInput = z.infer<typeof createTodoSchema>["body"];
