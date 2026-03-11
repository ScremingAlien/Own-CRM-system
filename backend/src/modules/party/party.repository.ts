
import { CreatePartyDTO, partySelect, type PartyDTO } from "./party.types.js";
import { DBType } from "@/types/global.js";

export class PartyRepository {
  constructor(private db: DBType) { }

  async findAll(): Promise<PartyDTO[]> {
    return this.db.party.findMany({
      select: partySelect,
      orderBy: { createdAt: "desc" },
    });
  }

  async findByName(name: string): Promise<Pick<PartyDTO, "id" | "name"> | null> {
    return this.db.party.findFirst({
      where: { name },
      select: { id: true, name: true },
    });
  }

  async findById(id: string): Promise<PartyDTO | null> {
    return this.db.party.findUnique({
      where: { id },
      select: partySelect,
    });
  }

  async create(data: CreatePartyDTO): Promise<PartyDTO> {
    return this.db.party.create({
      data,
      select: partySelect,
    });
  }

  async update(
    id: string,
    data: Pick<PartyDTO, "phone" | "gstNumber" | "address">,
  ): Promise<PartyDTO> {
    return this.db.party.update({
      where: { id },
      data,
      select: partySelect,
    });
  }

  async isPartyHasBills(partyId: string) {
    return this.db.invoice.findFirst({
      where: { partyId: partyId },
      select: { id: true },
    });
  }

  async softDelete(id: string) {
    return this.db.party.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async delete(id: string) {
    return this.db.party.delete({
      where: { id },
    });
  }

  async isPartyIdExists(id: string) {
    return this.db.party.findFirstOrThrow({
      where: { id },
      select: { id: true, type: true },
    });
  }
}
