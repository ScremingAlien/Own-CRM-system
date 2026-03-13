import { statusCode } from "@/utils/constants/statusCode.js";
import { PartyRepository } from "./party.repository.js";
import { CreatePartyDTO, PartyDTO } from "./party.types.js";
import { PartyType, Prisma } from "@/generated/index.js";
import { LedgerService } from "../ledger/ledger.service.js";
import { prisma } from "@/infra/database/prisma.js";
import { LedgerRepository } from "../ledger/ledger.repository.js";
import { ErrorService } from "@/utils/errorHits/Error.service.js";

class PartyService {
  private repository: PartyRepository;


  constructor() {
    this.repository = new PartyRepository(prisma);

  }

  async getAllParty(): Promise<PartyDTO[]> {
    return await this.repository.findAll();
  }

  async getPartyById(id: string): Promise<PartyDTO | null> {
    return await this.repository.findById(id);
  }

  async createParty(
    data: CreatePartyDTO,
    openingBalance?: {
      amount: Prisma.Decimal;
      type: "DEBIT" | "CREDIT";
      date: Date;
    },
  ): Promise<PartyDTO> {



    return prisma.$transaction(async (tx) => {

      const partyRepo = new PartyRepository(tx)
      const ledgerRepo = new LedgerRepository(tx)

      const existing = await partyRepo.findByName(data.name);
      if (existing) ErrorService.PartyAlreadyExists();

      const party = await partyRepo.create(data);
      
      if (openingBalance) {
        await ledgerRepo.createOpeningBalance(
          party.id,
          openingBalance.amount,
          party.type === PartyType.CUSTOMER ? "DEBIT" : "CREDIT",
          openingBalance.date || new Date(),
        )
      }

      return party
    })



  }

  async updateParty(
    id: string,
    data: Pick<PartyDTO, "phone" | "gstNumber" | "address">,
  ): Promise<PartyDTO> {
    return await this.repository.update(id, data);
  }

  /** Delete party
   *  only soft delete if  bill found other wise delete partys
   */
  async deleteParty(id: string) {
    let isPartyIdExists = await this.repository.isPartyIdExists(id);
    if (!isPartyIdExists) ErrorService.PartyNotFound();

    let isPartyHasNoBill = await this.repository.isPartyHasBills(id);
    if (isPartyHasNoBill) {
      return await this.repository.softDelete(id);
    }
    return await this.repository.delete(id);
  }


}

export default new PartyService();
