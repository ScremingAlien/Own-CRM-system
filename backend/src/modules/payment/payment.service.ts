import { prisma } from "@/infra/database/prisma.js";
import { PartyType, Prisma } from "@/generated/index.js";
import { PaymentRepository } from "./payment.repository.js";
import { LedgerRepository } from "../ledger/ledger.repository.js";
import { CreatePaymentInput } from "./payment.validator.js";
import { PartyRepository } from "../party/party.repository.js";
import { ErrorService } from "@/utils/errorHits/Error.service.js";
import { PaymentDTO } from "./payment.types.js";

export class PaymentService {
  private paymentRepo = new PaymentRepository(prisma);
  private ledgerRepo = new LedgerRepository(prisma);
  private partyRepo = new PartyRepository(prisma);


  async fetchAllPayements() {
    return this.paymentRepo.findAll();
  }

  async createPayment(data: CreatePaymentInput): Promise<PaymentDTO> {
    /**
     * 1. create payment
     * if partyType is CUSTOMER then create ledger entry with CREDIT
     * if partyType is SUPPLIER then create ledger entry with DEBIT
     * 
     */
    let isParty = await this.partyRepo.isPartyIdExists(data.partyId);
    if (!isParty) ErrorService.PartyNotFound();
    return prisma.$transaction(async (tx) => {

      let pRepo = new PaymentRepository(tx);
      let lRepo = new LedgerRepository(tx);

      let payment = await pRepo.create({
        partyId: data.partyId,
        amount: data.amount,
        method: data.method,
        note: data.note,
        paymentDate: data.paymentDate || new Date(),
        partyType: isParty.type
      });

      await lRepo.recordPayment(
        isParty.id,
        payment.id,
        Prisma.Decimal(data.amount),
        isParty.type === PartyType.CUSTOMER ? "DEBIT" : "CREDIT",
        data.paymentDate || new Date(),
      );
      return payment
    })
  }

  async deletePayment(id: string) {
    
    let isPayment = await this.paymentRepo.isPaymentIdExists(id);
    if (!isPayment) ErrorService.PaymentNotFound();
    return prisma.$transaction(async (tx) => {
      let pRepo = new PaymentRepository(tx);
      let lRepo = new LedgerRepository(tx);

      await pRepo.delete_payment(id);
      await lRepo.deleteLedgerByPaymentId(id);
    })

  }

  async updatePayment() {
    /**
     * 1. update payment
     * 2. update ledger 
     * 
     */
  }
 
  

}

export default new PaymentService();
