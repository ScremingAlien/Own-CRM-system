import { statusCode } from "@/utils/constants/statusCode.js";
import { PartyRepository } from "./party.repository.js";
import { CreatePartyDTO, PartyDTO } from "./party.types.js";
import { PartyType, Prisma } from "@/generated/index.js";
import { LedgerService } from "../ledger/ledger.service.js";
import { prisma } from "@/infra/database/prisma.js";
import { DBType } from "@/types/global.js";

class PartyService {
  private repository: PartyRepository;
  private ledgerService: LedgerService;

  constructor(private db: DBType) {
    this.repository = new PartyRepository(this.db);
    this.ledgerService = new LedgerService(this.db);
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
    // if already inside transaction
    if (!("$transaction" in this.db)) {
      return this.createPartyInternal(data, openingBalance);
    }

    // if root prisma client
    return this.db.$transaction(async (tx) => {
      const service = new PartyService(tx);
      return service.createPartyInternal(data, openingBalance);
    });
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
    if (!isPartyIdExists) {
      throw new Error("Party Not Found", { cause: statusCode.NOT_FOUND });
    }
    let isPartyHasNoBill = await this.repository.isPartyHasBills(id);
    if (isPartyHasNoBill) {
      return await this.repository.softDelete(id);
    }
    return await this.repository.delete(id);
  }

  private async createPartyInternal(
    data: CreatePartyDTO,
    openingBalance?: {
      amount: Prisma.Decimal;
      type: "DEBIT" | "CREDIT";
      date: Date;
    },
  ): Promise<PartyDTO> {
    const existing = await this.repository.findByName(data.name);

    if (existing) {
      throw new Error("Party Already Exists", { cause: statusCode.BAD_REQUEST });
    }

    const party = await this.repository.create(data);

    if (openingBalance) {
      await this.ledgerService.createOpeningBalance(
        party.id,
        openingBalance.amount,
        party.type === PartyType.CUSTOMER ? "DEBIT" : "CREDIT",
        openingBalance.date || new Date(),
      );
    }

    return party;
  }
}

export default new PartyService(prisma);
