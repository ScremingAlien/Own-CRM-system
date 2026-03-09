import { z } from "zod";

export const createInvoiceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Invoice title is required"),
  }),
});

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>["body"];
