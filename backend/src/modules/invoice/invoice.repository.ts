import { prisma } from "@/infra/database/prisma.js";
import { InvoiceDTO, invoiceSelect } from "./invoice.types.js";
import { Prisma } from "@/generated/index.js";

export class InvoiceRepository {
  async findAll(): Promise<InvoiceDTO[]> {
    return prisma.invoice.findMany({
      select: invoiceSelect,
      orderBy: { issueDate: "desc" },
    });
  }

  async findById(id: string): Promise<InvoiceDTO | null> {
    return prisma.invoice.findUnique({
      where: { id },
      select: invoiceSelect,
    });
  }

  async isExists(invoiceNo: string): Promise<boolean> {
    return (await prisma.invoice.count({ where: { invoiceNumber: invoiceNo } })) > 0;
  }

  async create(data: Prisma.InvoiceCreateInput): Promise<InvoiceDTO> {
    return prisma.invoice.create({ data, select: invoiceSelect });
  }

  async update(id: string, data: Prisma.InvoiceUpdateInput): Promise<InvoiceDTO> {
    return prisma.invoice.update({ where: { id }, data, select: invoiceSelect });
  }
}
