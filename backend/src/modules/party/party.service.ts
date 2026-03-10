import { statusCode } from "@/utils/constants/statusCode.js";
import { PartyRepository } from "./party.repository.js";
import { CreatePartyDTO, PartyDTO } from "./party.types.js";

class PartyService {
  private repository: PartyRepository;

  constructor() {
    this.repository = new PartyRepository();
  }

  async getAllParty(): Promise<PartyDTO[]> {
    return await this.repository.findAll();
  }

  async getPartyById(id: string): Promise<PartyDTO | null> {
    return await this.repository.findById(id);
  }

  async createParty(data: CreatePartyDTO): Promise<PartyDTO> {
    let isAlredy = await this.repository.findByName(data.name);
    if (isAlredy) {
      throw new Error("Party Already Exists", { cause: statusCode.BAD_REQUEST });
    }
    return await this.repository.create(data);
  }

  async updateParty(id: string, data: Pick<PartyDTO, "phone" | "gstNumber" | "address">): Promise<PartyDTO> {
    return await this.repository.update(id, data);
  }


  /** Delete party
   *  only soft delete if  bill found other wise delete partys
   */
  async deleteParty(id: string) {
    let isPartyIdExists = await this.repository.isPartyIdExists(id);
    if (!isPartyIdExists) {
      throw new Error("Party Not Found", { cause: statusCode.NOT_FOUND });
    }
    let isPartyHasNoBill = await this.repository.isPartyHasBills(id);
    if (isPartyHasNoBill) {
      return await this.repository.softDelete(id);
    }
    return await this.repository.delete(id);
  }


}

export default new PartyService();
