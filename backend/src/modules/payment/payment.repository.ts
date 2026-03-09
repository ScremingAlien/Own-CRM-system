import { prisma } from "@/infra/database/prisma.js";
import { PaymentDTO, paymentSelect } from "./payment.types.js";
import { Prisma } from "@/generated/index.js";

export class PaymentRepository {
   
  async findAll(): Promise<PaymentDTO[]> {
    return prisma.payment.findMany({
      select: paymentSelect,
      orderBy: { paymentDate: "desc" }
    });
  }

  async create(data: Prisma.PaymentCreateInput): Promise<PaymentDTO> {
    return prisma.payment.create({
      data,
      select: paymentSelect
    });
  }
}
