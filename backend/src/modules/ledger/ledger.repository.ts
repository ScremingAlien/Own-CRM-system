import { prisma } from "@/infra/database/prisma.js";
import { LedgerDTO, ledgerSelect } from "./ledger.types.js";
import { Prisma } from "@/generated/index.js";

export class LedgerRepository {
  
  async findByParty(partyId: string): Promise<LedgerDTO[]> {
    return prisma.ledgerEntry.findMany({
      where: { partyId },
      select: ledgerSelect,
      orderBy: { date: "desc" }
    });
  }

  async create(data: Prisma.LedgerEntryCreateInput): Promise<LedgerDTO> {
    return prisma.ledgerEntry.create({
      data,
      select: ledgerSelect
    });
  }
}
