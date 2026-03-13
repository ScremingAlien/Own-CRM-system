import { z } from "zod";

export const createQncSchema = z.object({
  body: z.object({
    invoiceId: z.string().min(1, "InvoiceId is required"),
    chNo: z.string().min(1, "ChalanNo  is required"),
  }),
});

export type CreateQncInput = z.infer<typeof createQncSchema>["body"];
