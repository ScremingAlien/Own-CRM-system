import { Prisma } from "@/generated/index.js";
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
