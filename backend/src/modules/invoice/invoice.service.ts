import { InvoiceRepository } from "./invoice.repository.js";

class InvoiceService {
  private repository: InvoiceRepository;

  constructor() {
    this.repository = new InvoiceRepository();
  }

  async getAll(): Promise<any[]> {
    return await this.repository.findAll();
  }
}

export default new InvoiceService();
