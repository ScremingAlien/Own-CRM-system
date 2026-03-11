import { QncRepository } from "./qnc.repository.js";
import type { Qnc } from "./qnc.types.js";

class QncService {
  private repository: QncRepository;

  constructor() {
    this.repository = new QncRepository();
  }

  async getAll(): Promise<Qnc[]> {
    return await this.repository.findAll();
  }
}

export default new QncService();
