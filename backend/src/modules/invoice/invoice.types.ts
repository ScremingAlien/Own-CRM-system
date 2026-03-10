import { Prisma } from "@/generated/index.js";

export const invoiceSelect = Prisma.validator<Prisma.InvoiceSelect>()({
  id: true,
  invoiceNumber: true,
  partyId: true,
  shipToId: true,
  issueDate: true,
  stateCode: true,
  vechileNo : true,
  roundOff: true,
  igst: true,
  cgst: true,
  sgst: true,
  chNo: true,
  isLabourBill: true,
  poNo: true,
  taxableAmount: true,
  totalAmount: true,
  status: true,
  createdAt: true
});

export type InvoiceDTO = Prisma.InvoiceGetPayload<{
  select: typeof invoiceSelect;
}>;