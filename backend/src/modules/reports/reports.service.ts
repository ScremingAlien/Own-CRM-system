import { statusCode } from "@/utils/constants/statusCode.js";
import { ReportsRepository } from "./reports.repository.js";
import type { FyDTO } from "./reports.types.js";

class ReportsService {
  private repository: ReportsRepository;

  constructor() {
    this.repository = new ReportsRepository();
  }

  async getAllFy(): Promise<FyDTO[]> {
    return await this.repository.findAllFy();
  }

  async findByLabel(lb: string): Promise<FyDTO | null> {
    return await this.repository.findByLabel(lb);
  }

  async createFy(data: any): Promise<FyDTO> {
    let isFy = await this.repository.findByLabel(data.label);
    if (isFy) {
      throw new Error("Financial Year Already Exists", { cause: statusCode.BAD_REQUEST });
    }
    return await this.repository.createFy(data);
  }
  async activeFy(id: string): Promise<FyDTO> {
    await this.repository.unactiveManyFy();
    return await this.repository.activeFy(id);
  }
  async closeFy(id: string): Promise<FyDTO> {
    return await this.repository.closeFy(id);
  }


}

export default new ReportsService();
