import { prisma } from "@/infra/database/prisma.js";
import { InvoiceRepository } from "./invoice.repository.js";
import { CreateInvoiceInput, InvoiceDTO } from "./invoice.types.js";
import { PartyRepository } from "../party/party.repository.js";
import { calculateInvoice } from "@/utils/Calculations.helper.js";
import { LedgerRepository } from "../ledger/ledger.repository.js";
import { ErrorService } from "@/utils/errorHits/Error.service.js";

class InvoiceService {
  private invoiceRepo: InvoiceRepository;
  private partyRepo: PartyRepository;
  private ledgerRepo = new LedgerRepository(prisma);

  constructor() {
    this.invoiceRepo = new InvoiceRepository(prisma);
    this.partyRepo = new PartyRepository(prisma);
  }

  async getAll({ month, year }: { month?: number, year?: number }): Promise<any[]> {
    return await this.invoiceRepo.findInvoices({
      month,
      year
    });
  }

  async createInvoice(data: CreateInvoiceInput): Promise<InvoiceDTO> {

    const isInvoiceNumberExists = await this.invoiceRepo.isExists(
      data.invoiceNumber
    )
    if (isInvoiceNumberExists) ErrorService.InvoiceAlreadyExists();

    const isPartyIdExists = await this.partyRepo.isPartyIdExists(data.partyId)
    if (!isPartyIdExists) ErrorService.PartyNotFound();


    if (data.shipToId) {
      const isShipToIdExists = await this.partyRepo.isPartyIdExists(data.shipToId)

      if (!isShipToIdExists) ErrorService.ShipmentNotFound();
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

      // create invoice by data
      const invoice = await InvoiceRepo.create(data, calculated)

      if (invoice.status === "SENT") {
        let PType = isPartyIdExists.type;

        await LedgerRepo.recordInvoice(
          data.partyId,
          invoice.id,
          calculated.totalAmount,
          PType === "CUSTOMER" ? "CREDIT" : "DEBIT",
          invoice.issueDate,
        )

      }
      return invoice
    })

  }

  async onInvoiceCancled() {

  }

  async deleteInvoice(invoiceId: string) {
    /**
     * delete ledger,
     * delete invoice,
     */

    let isInvoice = await this.invoiceRepo.isInvoiceIdExists(invoiceId);
    if (!isInvoice) ErrorService.InvoiceNotFound();

    return prisma.$transaction(async (tx) => {
      const InvoiceRepo = new InvoiceRepository(tx)
      const LedgerRepo = new LedgerRepository(tx)
      let delInv = await InvoiceRepo.deleteInvoice(invoiceId);
      await LedgerRepo.deleteLedgerByInvoiceId(invoiceId);
      return delInv
    });
  }

  async updateInvoice() {
    /**
     * One updateed ->
     * update ledger after calculateing comman things like amount ,items ,etc.
     * felds should not updated-> status, invoice number,
     * 
     * if issue date changed -> update ledger 
     * 
     * things can change are-> shppingid,
     */
  }


}

export default new InvoiceService();
