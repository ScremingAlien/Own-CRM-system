import { LedgerRepository } from "./ledger.repository.js";
import type { LedgerDTO } from "./ledger.types.js";

class LedgerService {
  private repository: LedgerRepository;

  constructor() {
    this.repository = new LedgerRepository();
  }

  async getAll(): Promise<LedgerDTO[]> {
    return  [];
  }
}

export default new LedgerService();
