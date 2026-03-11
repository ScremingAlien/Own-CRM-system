import { Prisma, PrismaClient, PartyType } from "@/generated/index.js";
import { LedgerRepository } from "./ledger.repository.js";
import { LedgerReferenceType } from "./ledger.types.js";
import { DBType } from "@/types/global.js";

const prisma = new PrismaClient();

export class LedgerService {
  private repository: LedgerRepository;

  constructor(private db: DBType) {
    this.repository = new LedgerRepository(this.db);
  }

  ////////////////////////////////////////////////////
  // INTERNAL CREATOR
  ////////////////////////////////////////////////////

  private async createLedger(
    partyId: string,
    referenceType: LedgerReferenceType,
    amount: Prisma.Decimal,
    type: "DEBIT" | "CREDIT",
    date: Date,
    description: string,
    referenceId?: string,
    paymentId?: string,
  ) {
    return this.repository.createEntry({
      partyId,
      referenceType,
      amount,
      type,
      date,
      description,
      referenceId,
      paymentId,
    });
  }

  ////////////////////////////////////////////////////
  // INVOICE ENTRY
  ////////////////////////////////////////////////////

  async recordInvoice(partyId: string, invoiceId: string, amount: Prisma.Decimal, date: Date) {
    const party = await prisma.party.findUniqueOrThrow({
      where: { id: partyId },
      select: { type: true },
    });

    const type = party.type === PartyType.CUSTOMER ? "DEBIT" : "CREDIT";

    return this.createLedger(
      partyId,
      LedgerReferenceType.INVOICE,
      amount,
      type,
      date,
      `Invoice Generated`,
      invoiceId,
    );
  }

  ////////////////////////////////////////////////////
  // PAYMENT ENTRY
  ////////////////////////////////////////////////////

  async recordPayment(partyId: string, paymentId: string, amount: Prisma.Decimal, date: Date) {
    const party = await prisma.party.findUniqueOrThrow({
      where: { id: partyId },
      select: { type: true },
    });

    const type = party.type === PartyType.CUSTOMER ? "CREDIT" : "DEBIT";

    return this.createLedger(
      partyId,
      LedgerReferenceType.PAYMENT,
      amount,
      type,
      date,
      `Payment Entry`,
      paymentId,
      paymentId,
    );
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
    return this.createLedger(
      partyId,
      LedgerReferenceType.ADJUSTMENT,
      amount,
      type,
      date,
      description,
    );
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
    return this.createLedger(
      partyId,
      LedgerReferenceType.OPENING_BALANCE,
      amount,
      type,
      date,
      "Opening Balance",
    );
  }

  ////////////////////////////////////////////////////
  // GET LEDGER
  ////////////////////////////////////////////////////

  async getPartyLedger(partyId: string, page = 1, limit = 50) {
    return this.repository.findByParty(partyId, page, limit);
  }

  async getPartyBalance(partyId: string) {
    return this.repository.getPartyBalance(partyId);
  }

  ////////////////////////////////////////////////////
  // RUNNING BALANCE
  ////////////////////////////////////////////////////

  async getLedgerWithRunningBalance(partyId: string) {
    const entries = await this.repository.findByParty(partyId, 1, 100);

    let balance = new Prisma.Decimal(0);

    return entries.reverse().map((entry) => {
      balance = balance.plus(entry.debit).minus(entry.credit);

      return {
        ...entry,
        balance,
      };
    });
  }
}

export default new LedgerService(prisma);
