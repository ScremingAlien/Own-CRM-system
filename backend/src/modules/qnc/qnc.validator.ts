import { InvoiceStatus } from "@/generated/index.js";
import { z } from "zod";

export const createQncSchema = z.object({
  body: z.object({
    invoiceId: z.string().min(1, "InvoiceId is required"),
    chNo: z.string().min(1, "ChalanNo  is required"),
  }),
});

  
export const quotationItemSchema = z.object({
  description: z.string().min(1),
  subdescription: z.array(z.string()).optional(),
  hsnCode: z.string().optional(),
  unit: z.string().optional(),
  quantity: z.number().positive(),
  rate: z.number().positive(),
});

export const createQuotationSchema = z.object({
  body: z.object({
    partyId: z.string().min(1),
    issueDate: z.coerce.date(),
    items: z.array(quotationItemSchema).min(1),

    sgst: z.number(),
    cgst: z.number(),
    igst: z.number(),

    status: z.enum(InvoiceStatus).default(InvoiceStatus.DRAFT)
  }),
});

export type CreateQuotationInput = z.infer<typeof createQuotationSchema>["body"];


export type CreateQncInput = z.infer<typeof createQncSchema>["body"];
