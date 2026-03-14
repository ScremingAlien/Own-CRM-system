import { InvoiceStatus } from "@/generated/index.js";
import { QncRepository } from "./qnc.repository.js";
import { InvoiceRepository } from "../invoice/invoice.repository.js";
import { prisma } from "@/infra/database/prisma.js";
import { ChalanDTO, QuotationDTO } from "./qnc.types.js";
import { ErrorService } from "@/utils/errorHits/Error.service.js";
import { calculateQuotation } from "@/utils/Calculations.helper.js";
import { CreateQuotationInput } from "./qnc.validator.js";
import { PartyRepository } from "../party/party.repository.js";

class QncService {
  private repository: QncRepository;
  private invoiceRepo: InvoiceRepository;
  private partyRepo: PartyRepository;
  constructor() {
    this.repository = new QncRepository(prisma);
    this.invoiceRepo = new InvoiceRepository(prisma);
    this.partyRepo = new PartyRepository(prisma);
  }

  async getQuotations({ month, year }: { month?: number, year?: number }): Promise<QuotationDTO[]> {
    return await this.repository.getQuotations({ month, year });
  }

  async getSingleQuotation(id: string): Promise<QuotationDTO | null> {
    return await this.repository.getSingleQuotation(id);
  }

  async deleteQuotation(id: string): Promise<any> {
    return await this.repository.deleteQuotation(id);
  }


  async getChalans({ month, year }: { month?: number, year?: number }): Promise<ChalanDTO[]> {
    return await this.repository.getChalans({ month, year });
  }

  async getSingleChalan(id: string): Promise<ChalanDTO | null> {
    return await this.repository.getChanalById(id);
  }

  async deleteChalan(id: string): Promise<any> {

    return prisma.$transaction(async (tx) => {
      const qncRepo = new QncRepository(tx)
      const invRepo = new InvoiceRepository(tx)

      // if chalan's status has SENT then delete chalnNo in Invoice
      let isChalan = await qncRepo.findChalanById(id);
      if (!isChalan) ErrorService.ChalanNotFound();

      if (isChalan && isChalan.status === InvoiceStatus.SENT) {
        // DEL chalanNo in invoice
        await invRepo.removeChalanId(isChalan.invoiceId || "");
      }
      return await qncRepo.deleteChalan(id);

    })
  }


  async createChalan(data: { invoiceId: string; chNo: string; }): Promise<ChalanDTO> {
    /** Take InvId and chalanNo, from user 
     *  fetch InvId and then createChalan
    */
    return prisma.$transaction(async (tx) => {
      const qncRepo = new QncRepository(tx)
      const invRepo = new InvoiceRepository(tx)

      let Inv = await invRepo.findById(data.invoiceId);
      if (!Inv) ErrorService.InvoiceNotFound();

      let isChalanExists = await qncRepo.isChalanExists(data.chNo);
      if (isChalanExists) ErrorService.ChalanAlreadyExists();


      let chalan = await qncRepo.createChalan({
        invoiceId: Inv?.id || "",
        chNo: data.chNo,
        partyId: Inv?.partyId || "",
        shipToId: Inv?.shipToId || null,
        vehicleNo: null,
        issueDate: Inv?.issueDate || Inv?.createdAt || new Date(),
        status: Inv?.status || InvoiceStatus.DRAFT,
        items: Inv?.items?.map((i) => ({
          description: i.description,
          subdescription: i.subdescription,
          hsnCode: i.hsnCode,
          unit: i.unit,
          quantity: i.quantity,
          weight: null
        })) || []

      });

      await invRepo.updateChalanId(data.invoiceId, {
        chNo: chalan.chNo
      })
      return chalan;


    });
  }

  /**
   * update chalan
   * - if status is update to draft then remoce chalanNo from invoice
   * - if status is update to sent then add chalanNo in invoice so latest chalan can be sent
   * - if status is update to cancelled then remove chalanNo from invoice
   * 
   * multiple chaln can be created for single invoice
   */

  async updateChalan() {

  }
  async createQuotation(data: CreateQuotationInput): Promise<QuotationDTO> {

    const { items, sgst, cgst, igst, issueDate, partyId } = data;

    let party = await this.partyRepo.isPartyIdExists(partyId);
    if(!party) ErrorService.PartyNotFound();
    
    const { items: processedItems, taxableAmount, totalAmount, roundOff } =
      calculateQuotation(items, sgst, cgst, igst);

    return await this.repository.createQuotation(
      data,
      taxableAmount,
      totalAmount,
      partyId,
      processedItems,
      roundOff
    );
  }
}

export default new QncService();
