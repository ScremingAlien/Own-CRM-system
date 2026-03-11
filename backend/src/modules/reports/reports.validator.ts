import { z } from "zod";

export const fyCreateSchema = z.object({
  body: z.object({
    label: z.string().min(1, "Reports title is required"),
    startDate: z.string().min(1, "Reports title is required"),
    endDate: z.string().min(1, "Reports title is required"),
  }),
});

export const createReportsSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Reports title is required"),
  }),
});

export type CreateReportsInput = z.infer<typeof createReportsSchema>["body"];
