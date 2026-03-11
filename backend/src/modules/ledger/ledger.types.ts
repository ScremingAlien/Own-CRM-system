import { Prisma } from "@/generated/index.js";
export enum LedgerReferenceType {
  INVOICE = "INVOICE",
  PAYMENT = "PAYMENT",
  PURCHASE = "PURCHASE",
  ADJUSTMENT = "ADJUSTMENT",
  OPENING_BALANCE = "OPENING_BALANCE",
}

export const ledgerEntrySelect = Prisma.validator<Prisma.LedgerEntrySelect>()({
  id: true,
  partyId: true,
  year: true,
  month: true,
  referenceType: true,
  referenceId: true,
  description: true,
  debit: true,
  credit: true,
  date: true,
  paymentId: true,
  createdAt: true,
});

export type LedgerEntryDTO = Prisma.LedgerEntryGetPayload<{
  select: typeof ledgerEntrySelect;
}>;
