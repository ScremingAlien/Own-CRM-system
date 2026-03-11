import { prisma } from "@/infra/database/prisma.js";
import { Prisma } from "@/generated/index.js";
import { PaymentDTO, paymentSelect } from "./payment.types.js";

export class PaymentRepository {
  async findAll(): Promise<PaymentDTO[]> {
    return prisma.payment.findMany({
      select: paymentSelect,
      orderBy: { paymentDate: "desc" },
    });
  }

  async create(tx: Prisma.TransactionClient, data: Prisma.PaymentCreateInput): Promise<PaymentDTO> {
    return tx.payment.create({
      data,
      select: paymentSelect,
    });
  }
}
