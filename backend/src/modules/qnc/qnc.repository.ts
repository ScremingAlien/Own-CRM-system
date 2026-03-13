import { ChalanDTO, ChalanItemDTO, chalanSelect, QuotationDTO, qutationSelect } from "./qnc.types.js";
import { DBType } from "@/types/global.js";


export class QncRepository {

  constructor(private db: DBType) {
  }

  /**
   * - Create Chalan
   * - Create Quotation 
   * - Update Quotation status or items
   * - Delete Quotation
   * - get monthly Quotation
   * 
   * Quotation is seprate entity, no connection to invoice
   * 
   * 
   * For creating chalan 
   * Go to Invoice -> click to generate chalan
   * use data of invoice and then generate a clalan
   * 
   */

  async getSingleQuotation(id: string): Promise<QuotationDTO | null> {
    return await this.db.quotation.findUnique({ where: { id }, select: qutationSelect });
  }

  async getQuotations({ month, year }: { month?: number, year?: number }): Promise<QuotationDTO[]> {
    return await this.db.quotation.findMany({
      where: {
        month: month || new Date().getMonth() + 1,
        year: year || new Date().getFullYear(),
      }, select: qutationSelect
    });
  }

  async deleteQuotation(id: string): Promise<any> {
    return await this.db.quotation.delete({ where: { id } });
  }

  
  // not completed
  async createQuotation(data: any): Promise<QuotationDTO> {
    return await this.db.quotation.create({
      data: {
        month: new Date(data.issueDate || new Date()).getMonth() + 1,
        year: new Date(data.issueDate || new Date()).getFullYear(),
        ...data

      }, select: qutationSelect
    });
  }



  async findAll(): Promise<any[]> {
    return []; // Replace with actual DB call like: return this.model.find()
  }
  async getChanalById(id: string): Promise<ChalanDTO | null> {
    return await this.db.chalan.findUnique({ where: { id }, select: chalanSelect });
  }

  async getChalans({ month, year }: { month?: number, year?: number }): Promise<ChalanDTO[]> {
    return await this.db.chalan.findMany({
      where: {
        month: month || new Date().getMonth() + 1,
        year: year || new Date().getFullYear(),
      }, select: chalanSelect
    });
  }
  async findChalanById(id: string): Promise<Pick<ChalanDTO, "id" | "status" | "invoiceId"> | null> {
    return await this.db.chalan.findUnique({ where: { id }, select: { id: true, status: true, invoiceId: true } });
  }

  async isChalanExists(chalanNo: string): Promise<boolean> {
    return await this.db.chalan.count({ where: { chNo: chalanNo } }) > 0;
  }

  async createChalan({ invoiceId, chNo, partyId, shipToId, vehicleNo, issueDate, status, items }:
    Pick<ChalanDTO, "invoiceId" | "chNo" | "partyId" | "shipToId" | "vehicleNo" | "issueDate" | "status"> & { items: Pick<ChalanItemDTO, "description" | "subdescription" | "hsnCode" | "unit" | "quantity" | "weight">[] }): Promise<ChalanDTO> {
    return await this.db.chalan.create({
      data: {
        invoiceId,
        chNo: chNo,
        month: new Date(issueDate || new Date()).getMonth() + 1,
        year: new Date(issueDate || new Date()).getFullYear(),
        partyId: partyId,
        shipToId: shipToId,
        vehicleNo: vehicleNo,
        issueDate: issueDate || new Date(),
        status: status,
        items: items.length > 0 ? { createMany: { data: items } } : undefined
      },
      select: chalanSelect
    });
  }

  async deleteChalan(id: string): Promise<any> {
    return await this.db.chalan.delete({ where: { id } });
  }

}
