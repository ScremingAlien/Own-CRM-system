import { ReportsRepository } from "./reports.repository.js";
import type { Reports } from "./reports.types.js";

class ReportsService {
  private repository: ReportsRepository;

  constructor() {
    this.repository = new ReportsRepository();
  }

  async getAll(): Promise<Reports[]> {
    return await this.repository.findAll();
  }
}

export default new ReportsService();
