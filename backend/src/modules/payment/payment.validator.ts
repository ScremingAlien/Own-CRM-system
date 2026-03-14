import { z } from "zod";

export const createPaymentSchema = z.object({
  body: z.object({
    partyId: z.string().min(1, "Payment partyId is required"),
    amount: z.number().min(1, "amount  is required"),
    method: z.string().min(1, "method is required"),
    note: z.string().min(1, "note  is required").optional(),
    paymentDate: z.coerce.date().min(1, "paymentDate  is required"),
  }),
});

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>["body"];
