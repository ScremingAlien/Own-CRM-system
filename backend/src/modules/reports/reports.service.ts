import { statusCode } from "@/utils/constants/statusCode.js";
import { ReportsRepository } from "./reports.repository.js";
import type { FyDTO } from "./reports.types.js";
import { prisma } from "@/infra/database/prisma.js";
import { Prisma } from "@/generated/index.js";

class ReportsService {
  private repository: ReportsRepository;

  constructor() {
    this.repository = new ReportsRepository(prisma);
  }

  async getOutstandingReport() {
    return await this.repository.getOutstandingReport();
  }
  
  async getCustomerReceivable() {
    const outstanding = await this.repository.getOutstandingReport();

    return outstanding.filter(
      r => r.partyType === "CUSTOMER" && Prisma.Decimal(r.balance) > Prisma.Decimal(0)
    );
  }

  async getSupplierPayable() {
    const outstanding = await this.repository.getOutstandingReport();

    return outstanding.filter(
      r => r.partyType === "SUPPLIER" && Prisma.Decimal(r.balance) > Prisma.Decimal(0)
    );
  }


  async getPartyStatementReport(
    partyId: string,
    from?: Date,
    to?: Date
  ) {
    const entries = await this.repository.getPartyStatement(
      partyId,
      from,
      to
    );

    let runningBalance = 0;

    const transactions = entries.map(e => {
      runningBalance += Number(e.debit) - Number(e.credit);

      return {
        date: e.date,
        description: e.description,
        referenceType: e.referenceType,
        referenceId: e.referenceId,
        debit: e.debit,
        credit: e.credit,
        balance: runningBalance
      };
    });

    return transactions;
  }


  /*------------------------------------
  Fy apis
  --------------------------------------*/
  async getAllFy(): Promise<FyDTO[]> {
    return await this.repository.findAllFy();
  }

  async findByLabel(lb: string): Promise<FyDTO | null> {
    return await this.repository.findByLabel(lb);
  }

  async createFy(data: any): Promise<FyDTO> {
    let isFy = await this.repository.findByLabel(data.label);
    if (isFy) {
      throw new Error("Financial Year Already Exists", { cause: statusCode.BAD_REQUEST });
    }
    return await this.repository.createFy(data);
  }
  async activeFy(id: string): Promise<FyDTO> {
    await this.repository.unactiveManyFy();
    return await this.repository.activeFy(id);
  }
  async closeFy(id: string): Promise<FyDTO> {
    return await this.repository.closeFy(id);
  }
}

export default new ReportsService();
