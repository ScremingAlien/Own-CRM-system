import { prisma } from "@/infra/database/prisma.js";
import { Prisma } from "@/generated/index.js";
import { LedgerEntryDTO, ledgerEntrySelect, LedgerReferenceType } from "./ledger.types.js";
import { DBType } from "@/types/global.js";

type LedgerCreateDTO = {
  referenceType: LedgerReferenceType;
  partyId: string;
  amount: Prisma.Decimal;
  type: "DEBIT" | "CREDIT";
  date: Date;
  referenceId?: string;
  description: string;
  paymentId?: string;
};

export class LedgerRepository {
  constructor(private db: DBType) {}

  async createEntry({
    referenceType,
    partyId,
    amount,
    type,
    date,
    referenceId,
    description,
    paymentId,
  }: LedgerCreateDTO): Promise<LedgerEntryDTO> {
    return this.db.ledgerEntry.create({
      data: {
        partyId,
        month: new Date(date).getMonth() + 1,
        year: new Date(date).getFullYear(),
        referenceType,
        description,
        referenceId,
        paymentId,
        debit: type === "DEBIT" ? amount : 0,
        credit: type === "CREDIT" ? amount : 0,
        date,
      },
      select: ledgerEntrySelect,
    });
  }

  async findByParty(partyId: string, page = 1, limit = 50): Promise<LedgerEntryDTO[]> {
    return this.db.ledgerEntry.findMany({
      where: { partyId },
      select: ledgerEntrySelect,
      orderBy: { date: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getPartyBalance(partyId: string) {
    const result = await this.db.ledgerEntry.aggregate({
      where: { partyId },
      _sum: {
        debit: true,
        credit: true,
      },
    });

    const debit = result._sum.debit ?? 0;
    const credit = result._sum.credit ?? 0;

    return {
      debit,
      credit,
      balance: Prisma.Decimal.sub(debit, credit),
    };
  }
}
