
import { Prisma } from "@/generated/index.js";
import type { CreateFyInput, FyDTO, Reports } from "./reports.types.js";
import { DBType } from "@/types/global.js";

export class ReportsRepository {

  constructor(private db: DBType) { }
  /*------------------------------------
  reports generating
  --------------------------------------*/
  async getOutstandingReport() {
    const result = await this.db.ledgerEntry.groupBy({
      by: ["partyId"],
      _sum: {
        debit: true,
        credit: true,
      },
    });

    const parties = await this.db.party.findMany({
      where: {
        id: { in: result.map(r => r.partyId) }
      },
      select: {
        id: true,
        name: true,
        type: true
      }
    });

    return result.map(r => {
      const party = parties.find(p => p.id === r.partyId);

      const debit = r._sum.debit ?? 0;
      const credit = r._sum.credit ?? 0;

      return {
        partyId: r.partyId,
        partyName: party?.name,
        partyType: party?.type,
        totalDebit: debit,
        totalCredit: credit,
        balance: Prisma.Decimal.sub(debit, credit), // debit - credit
      };
    });
  }

 
  async getPartyStatement(
    partyId: string,
    from?: Date,
    to?: Date
  ) {
    const where: any = { partyId };

    if (from || to) {
      where.date = {};

      if (from) where.date.gte = from;
      if (to) where.date.lte = to;
    }

    return this.db.ledgerEntry.findMany({
      where,
      orderBy: { date: "asc" }
    });
  }

  /*------------------------------------
  Financial year 
  --------------------------------------*/
  async findAllFy(): Promise<FyDTO[]> {
    return await this.db.financialYear.findMany();
  }

  async findByLabel(lb: string): Promise<FyDTO | null> {
    return await this.db.financialYear.findFirst({ where: { label: lb } });
  }

  async createFy(data: CreateFyInput): Promise<FyDTO> {
    return await this.db.financialYear.create({ data });
  }

  async activeFy(id: string): Promise<FyDTO> {
    return await this.db.financialYear.update({ where: { id }, data: { isActive: true } });
  }

  async unactiveManyFy(): Promise<any> {
    return await this.db.financialYear.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
  }

  async closeFy(id: string): Promise<FyDTO> {
    return await this.db.financialYear.update({
      where: { id },
      data: { isClosed: true, isActive: false },
    });
  }
}
