import { Prisma } from "@/generated/index.js";
import { createInvoiceSchema, invoiceItemSchema } from "./invoice.validator.js";
import z from "zod";
export enum InvoiceStatus {
  DRAFT = "DRAFT",
  SENT = "SENT",
  CANCELLED = "CANCELLED",
}
export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>["body"];

export type CreateInvoiceItemInput = z.infer<typeof invoiceItemSchema>;


export const financialYearSelect = Prisma.validator<Prisma.FinancialYearSelect>()({
  id: true,
  label: true,
  startDate: true,
  endDate: true,
  isActive: true,
  isClosed: true,
  createdAt: true,
});

export type FinancialYearDTO = Prisma.FinancialYearGetPayload<{
  select: typeof financialYearSelect;
}>;

export const invoiceSelect = Prisma.validator<Prisma.InvoiceSelect>()({
  id: true,
  invoiceNumber: true,
  partyId: true,
  shipToId: true,
  issueDate: true,
  stateCode: true,
  chNo: true,
  poNo: true,
  taxableAmount: true,
  sgst: true,
  cgst: true,
  igst: true,
  roundOff: true,
  totalAmount: true,
  status: true,
  financialYearId: true,
  createdAt: true,
});

export type InvoiceDTO = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;

export const invoiceItemSelect = Prisma.validator<Prisma.InvoiceItemSelect>()({
  id: true,
  invoiceId: true,
  description: true,
  subdescription: true,
  hsnCode: true,
  unit: true,
  quantity: true,
  rate: true,
  amount: true,
});

export type InvoiceItemDTO = Prisma.InvoiceItemGetPayload<{
  select: typeof invoiceItemSelect;
}>;
 
export type CalculatedInvoiceItem = {
  description: string
  subdescription: string[]
  hsnCode?: string | null
  unit?: string | null
  quantity: number
  rate: number
  amount: Prisma.Decimal
}

export type CalculatedInvoice = {
  items: CalculatedInvoiceItem[]
  taxableAmount: Prisma.Decimal
  sgst: number
  cgst: number
  igst: number
  roundOff: Prisma.Decimal
  totalAmount: Prisma.Decimal
}