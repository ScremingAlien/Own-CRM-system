import { prisma } from "@/infra/database/prisma.js";
import { Prisma } from "@/generated/index.js";
import { PaymentRepository } from "./payment.repository.js";
import { LedgerRepository } from "../ledger/ledger.repository.js";

export class PaymentService {
  private paymentRepo = new PaymentRepository();
  private ledgerRepo = new LedgerRepository();

  async createPayment(data: Prisma.PaymentCreateInput) {
    return prisma.$transaction(async (tx) => {
      const payment = await this.paymentRepo.create(tx, data);

      await this.ledgerRepo.createEntry({
        party: {
          connect: { id: data.party.connect!.id },
        },
        referenceType: "PAYMENT",
        referenceId: payment.id,
        description: "Payment received",
        debit: new Prisma.Decimal(0),
        credit: payment.amount,
        date: payment.paymentDate,
        payment: {
          connect: { id: payment.id },
        },
      });

      return payment;
    });
  }
}

export default new PaymentService();
