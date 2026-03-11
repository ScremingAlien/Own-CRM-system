import type { Qnc } from "./qnc.types.js";

export class QncRepository {
  // Logic for DB queries goes here
  async findAll(): Promise<Qnc[]> {
    return []; // Replace with actual DB call like: return this.model.find()
  }
}
