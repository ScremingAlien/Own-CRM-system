import { Prisma } from "@/generated/index.js";

export const ledgerSelect = Prisma.validator<Prisma.LedgerEntrySelect>()({
  id: true,
  partyId: true,
  referenceType: true,
  referenceId: true,
  debit: true,
  credit: true,
  date: true,
  description: true
});

export type LedgerDTO = Prisma.LedgerEntryGetPayload<{
  select: typeof ledgerSelect;
}>;