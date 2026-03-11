import { prisma } from "@/infra/database/prisma.js";
import { InvoiceRepository } from "./invoice.repository.js";
import { CreateInvoiceInput, InvoiceDTO } from "./invoice.types.js";
import { PartyRepository } from "../party/party.repository.js";
import { statusCode } from "@/utils/constants/statusCode.js";
import { calculateInvoice } from "@/utils/Calculations.helper.js";
import { LedgerRepository } from "../ledger/ledger.repository.js";

class InvoiceService {
  private invoiceRepo: InvoiceRepository;
  private partyRepo: PartyRepository;

  constructor() {
    this.invoiceRepo = new InvoiceRepository(prisma);
    this.partyRepo = new PartyRepository(prisma);
  }

  async getAll(): Promise<any[]> {
    return await this.invoiceRepo.findAll();
  }

  async createInvoice(data: CreateInvoiceInput): Promise<InvoiceDTO> {

    const isInvoiceNumberExists = await this.invoiceRepo.isExists(
      data.invoiceNumber
    )

    if (isInvoiceNumberExists) {
      throw new Error("Invoice Number Already Exists", {
        cause: statusCode.BAD_REQUEST,
      })
    }

    const isPartyIdExists = await this.partyRepo.isPartyIdExists(data.partyId)

    if (!isPartyIdExists) {
      throw new Error("Party Not Found", {
        cause: statusCode.NOT_FOUND,
      })
    }

    if (data.shipToId) {
      const isShipToIdExists = await this.partyRepo.isPartyIdExists(data.shipToId)

      if (!isShipToIdExists) {
        throw new Error("Ship To Not Found", {
          cause: statusCode.NOT_FOUND,
        })
      }
    }
    
    const calculated = calculateInvoice(
      data.items,
      data.sgst,
      data.cgst,
      data.igst
    )

    return prisma.$transaction(async (tx) => {
      const InvoiceRepo = new InvoiceRepository(tx)
      const LedgerRepo = new LedgerRepository(tx)
      const invoice = await InvoiceRepo.create(data, calculated)
      
      if (invoice.status === "SENT") {
        let PType = isPartyIdExists.type;

        LedgerRepo.recordInvoice(
          data.partyId,
          invoice.id,
          calculated.totalAmount,
          PType === "CUSTOMER" ? "DEBIT" : "CREDIT",
          invoice.issueDate,
        )
        // create ledger items also  
      }

      return invoice
    })

  }

  async onInvoiceCancled() {

  }

}

export default new InvoiceService();
