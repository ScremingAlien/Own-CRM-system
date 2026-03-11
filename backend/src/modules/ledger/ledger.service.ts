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

    const type = party.type === PartyType.CUSTOMER ? "DEBIT" : "CREDIT";

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




  async getPartyLedger(partyId: string, page = 1, limit = 50) {
    return this.repository.findByParty(partyId, page, limit);
  }

  async getPartyBalance(partyId: string) {
    return this.repository.getPartyBalance(partyId);
  }
}

export default new LedgerService();