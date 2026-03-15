
import { PartyType, Prisma } from "@/generated/index.js";
import { PaymentDTO, paymentSelect } from "./payment.types.js";
import { DBType } from "@/types/global.js";
import { CreatePaymentInput } from "./payment.validator.js";

export class PaymentRepository {
  constructor(private db: DBType) { }

  async findAll(): Promise<PaymentDTO[]> {
    return this.db.payment.findMany({
      select: paymentSelect,
      orderBy: { paymentDate: "desc" },
    });
  }


  async create(data: CreatePaymentInput & { partyType: PartyType }): Promise<PaymentDTO> {
    return this.db.payment.create({
      data: {
        partyId: data.partyId,
        amount: data.amount,
        method: data.method,
        note: data.note,
        paymentDate: data.paymentDate || new Date(),
        partyType: data.partyType
      },
      select: paymentSelect,
    });
  }

  async delete_payment(id: string): Promise<any> {
    return this.db.payment.delete({
      where: { id }
    });
  }

  async isPaymentIdExists(id: string): Promise<PaymentDTO | null> {
    return this.db.payment.findFirst({
      where: { id },
      select: paymentSelect,
    });
  }
  

}
