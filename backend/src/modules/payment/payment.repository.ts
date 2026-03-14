
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


}
