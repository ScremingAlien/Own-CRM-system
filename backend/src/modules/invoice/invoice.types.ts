import { Prisma } from "@/generated/index.js";

export const invoiceSelect = Prisma.validator<Prisma.InvoiceSelect>()({
  id: true,
  invoiceNumber: true,
  partyId: true,
  issueDate: true,
  subtotal: true,
  gstAmount: true,
  totalAmount: true,
  status: true,
  createdAt: true
});

export type InvoiceDTO = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;