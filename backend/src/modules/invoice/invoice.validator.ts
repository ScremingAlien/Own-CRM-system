import { InvoiceStatus } from "@/generated/index.js";
import { z } from "zod";


export const invoiceItemSchema = z.object({
  description: z.string().min(1),

  subdescription: z.array(z.string()).optional(),

  hsnCode: z.string().optional(),
  unit: z.string().optional(),

  quantity: z.number().int().positive(),
  rate: z.number().positive(),
})

export const createInvoiceSchema = z.object({
  body: z.object({
    invoiceNumber: z.string().min(1),

    issueDate: z.coerce.date(),

    partyId: z.string(),

    shipToId: z.string().optional(),

    stateCode: z.string().optional(),

    items: z.array(invoiceItemSchema).min(1),

    sgst: z.number().min(0).max(100),
    cgst: z.number().min(0).max(100),
    igst: z.number().min(0).max(100),

    chNo: z.string().optional(),
    poNo: z.string().optional(),

    status: z.nativeEnum(InvoiceStatus).default(InvoiceStatus.DRAFT),

    financialYearId: z.string()
  })
})