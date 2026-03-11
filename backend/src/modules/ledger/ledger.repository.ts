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
  constructor(private db: DBType) { }

  ////////////////////////////////////////////////////
  // INTERNAL ENTRY CREATOR
  ////////////////////////////////////////////////////

  private async createEntry({
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
        month: date.getMonth() + 1,
        year: date.getFullYear(),
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

  ////////////////////////////////////////////////////
  // INVOICE ENTRY
  ////////////////////////////////////////////////////

  async recordInvoice(
    partyId: string,
    invoiceId: string,
    amount: Prisma.Decimal,
    type: "DEBIT" | "CREDIT",
    date: Date,
  ) {
    return this.createEntry({
      partyId,
      referenceType: LedgerReferenceType.INVOICE,
      amount,
      type,
      date,
      description: "Invoice Generated",
      referenceId: invoiceId,
    });
  }

  ////////////////////////////////////////////////////
  // PAYMENT ENTRY
  ////////////////////////////////////////////////////

  async recordPayment(
    partyId: string,
    paymentId: string,
    amount: Prisma.Decimal,
    type: "DEBIT" | "CREDIT",
    date: Date,
  ) {
    return this.createEntry({
      partyId,
      referenceType: LedgerReferenceType.PAYMENT,
      amount,
      type,
      date,
      description: "Payment Entry",
      referenceId: paymentId,
      paymentId,
    });
  }

  ////////////////////////////////////////////////////
  // ADJUSTMENT
  ////////////////////////////////////////////////////

  async recordAdjustment(
    partyId: string,
    amount: Prisma.Decimal,
    type: "DEBIT" | "CREDIT",
    description: string,
    date: Date,
  ) {
    return this.createEntry({
      partyId,
      referenceType: LedgerReferenceType.ADJUSTMENT,
      amount,
      type,
      date,
      description,
    });
  }

  ////////////////////////////////////////////////////
  // OPENING BALANCE
  ////////////////////////////////////////////////////

  async createOpeningBalance(
    partyId: string,
    amount: Prisma.Decimal,
    type: "DEBIT" | "CREDIT",
    date: Date,
  ) {
    return this.createEntry({
      partyId,
      referenceType: LedgerReferenceType.OPENING_BALANCE,
      amount,
      type,
      date,
      description: "Opening Balance",
    });
  }

  ////////////////////////////////////////////////////
  // QUERIES
  ////////////////////////////////////////////////////

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