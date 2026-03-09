import { PartyRepository } from "./party.repository.js";
import type { Party } from "./party.types.js";

class PartyService {
  private repository: PartyRepository;

  constructor() {
    this.repository = new PartyRepository();
  }

  async getAll(): Promise<Party[]> {
    return await this.repository.findAll();
  }
}

export default new PartyService();
