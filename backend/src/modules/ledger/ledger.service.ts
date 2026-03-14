import { Prisma, PrismaClient, PartyType } from "@/generated/index.js";
import { LedgerRepository } from "./ledger.repository.js";

const prisma = new PrismaClient();

export class LedgerService {
  private repository = new LedgerRepository(prisma);


  ////////////////////////////////////////////////////
  // INVOICE ENTRY
  ////////////////////////////////////////////////////

  async recordInvoice(
    partyId: string,
    invoiceId: string,
    amount: Prisma.Decimal,
    date: Date,
  ) {
    const party = await prisma.party.findUniqueOrThrow({
      where: { id: partyId },
      select: { type: true },
    });

    const type = party.type === PartyType.CUSTOMER ? "CREDIT" : "DEBIT";

    return this.repository.recordInvoice(
      partyId,
      invoiceId,
      amount,
      type,
      date,
    );
  }

  ////////////////////////////////////////////////////
  // PAYMENT ENTRY
  ////////////////////////////////////////////////////

  async recordPayment(
    partyId: string,
    paymentId: string,
    amount: Prisma.Decimal,
    date: Date,
  ) {
    const party = await prisma.party.findUniqueOrThrow({
      where: { id: partyId },
      select: { type: true },
    });

    const type = party.type === PartyType.CUSTOMER ? "CREDIT" : "DEBIT";

    return this.repository.recordPayment(
      partyId,
      paymentId,
      amount,
      type,
      date,
    );
  }


  async getLedgerReport(partyId: string) {

    const party = await prisma.party.findUniqueOrThrow({
      where: { id: partyId },
      select: { name: true, type: true }
    });

    const entries = await this.repository.getLedgerReport(partyId);

    let runningBalance = new Prisma.Decimal(0);

    const transactions = entries.map(entry => {

      runningBalance = runningBalance
        .add(entry.debit)
        .sub(entry.credit);

      return {
        date: entry.date,
        description: entry.description,
        referenceType: entry.referenceType,
        referenceId: entry.referenceId,
        debit: entry.debit,
        credit: entry.credit,
        balance: runningBalance
      };
    });

    const totalDebit = transactions.reduce(
      (sum, t) => sum.add(t.debit),
      new Prisma.Decimal(0)
    );

    const totalCredit = transactions.reduce(
      (sum, t) => sum.add(t.credit),
      new Prisma.Decimal(0)
    );

    const balance = totalDebit.sub(totalCredit);

    const status =
      party.type === "CUSTOMER"
        ? balance.gt(0)
          ? "CUSTOMER_HAS_TO_PAY"
          : "YOU_OWE_CUSTOMER"
        : balance.gt(0)
          ? "YOU_HAVE_TO_PAY_SUPPLIER"
          : "SUPPLIER_OWES_YOU";

    return {
      partyId,
      partyName: party.name,
      partyType: party.type,

      summary: {
        totalDebit,
        totalCredit,
        balance,
        status
      },

      transactions
    };
  }

  async getPartyLedger(partyId: string, page = 1, limit = 50) {
    return this.repository.findByParty(partyId, page, limit);
  }

  async getPartyBalance(partyId: string) {
    return this.repository.getPartyBalance(partyId);
  }
}

export default new LedgerService();