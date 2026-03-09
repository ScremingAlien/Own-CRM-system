import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Payment title is required"),
  }),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>["body"];
