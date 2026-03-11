
import { CalculatedInvoice, CreateInvoiceInput, InvoiceDTO, invoiceSelect } from "./invoice.types.js";
import { Prisma } from "@/generated/index.js";
import { DBType } from "@/types/global.js";

export class InvoiceRepository {

  constructor(private db: DBType) { }

  async findAll(): Promise<InvoiceDTO[]> {
    return this.db.invoice.findMany({
      select: invoiceSelect,
      orderBy: { issueDate: "desc" },
    });
  }

  async findById(id: string): Promise<InvoiceDTO | null> {
    return this.db.invoice.findUnique({
      where: { id },
      select: invoiceSelect,
    });
  }

  async isExists(invoiceNo: string): Promise<boolean> {
    return (await this.db.invoice.count({ where: { invoiceNumber: invoiceNo } })) > 0;
  }

  async create(data: CreateInvoiceInput, calculated: CalculatedInvoice): Promise<InvoiceDTO> {
    return this.db.invoice.create({
      data: {
        invoiceNumber: data.invoiceNumber,

        issueDate: data.issueDate || new Date(),

        partyId: data.partyId,

        shipToId: data.shipToId,

        stateCode: data.stateCode,

        sgst: calculated.sgst,
        cgst: calculated.cgst,
        igst: calculated.igst,

        taxableAmount: calculated.taxableAmount,

        roundOff: calculated.roundOff,

        totalAmount: calculated.totalAmount,

        status: data.status,

        financialYearId: data.financialYearId,

        chNo: data.chNo,
        poNo: data.poNo,

        items: {
          create: calculated.items.map((i) => ({
            description: i.description,
            subdescription: i.subdescription,
            hsnCode: i.hsnCode,
            unit: i.unit,
            quantity: i.quantity,
            rate: i.rate,
            amount: i.amount
          }))
        }

      }
    });
  }

  async update(id: string, data: Prisma.InvoiceUpdateInput): Promise<InvoiceDTO> {
    return this.db.invoice.update({ where: { id }, data, select: invoiceSelect });
  }


}
