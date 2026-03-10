import { prisma } from "@/infra/database/prisma.js";

import { CreatePartyDTO, partySelect, type PartyDTO } from "./party.types.js";

export class PartyRepository {

  async findAll(): Promise<PartyDTO[]> {
    return prisma.party.findMany({
      select: partySelect,
      orderBy: { createdAt: "desc" }
    });
  }

  async findByName(name: string): Promise<Pick<PartyDTO, "id" | "name"> | null> {
    return prisma.party.findFirst({
      where: { name },
      select: { id: true, name: true }
    });
  }

  async findById(id: string): Promise<PartyDTO | null> {
    return prisma.party.findUnique({
      where: { id },
      select: partySelect
    });
  }

  async create(data: CreatePartyDTO): Promise<PartyDTO> {
    return prisma.party.create({
      data,
      select: partySelect
    });
  }

  async update(id: string, data: Pick<PartyDTO, "phone" | "gstNumber" | "address">): Promise<PartyDTO> {
    return prisma.party.update({
      where: { id },
      data,
      select: partySelect
    });
  }

  async isPartyHasBills(partyId: string) {
    return prisma.invoice.findFirst({
      where: { partyId: partyId },
      select: { id: true }
    });
  }

  async softDelete(id: string) {
    return prisma.party.update({
      where: { id },
      data: { isActive: false }
    });
  }

  async delete(id: string) {
    return prisma.party.delete({
      where: { id }
    })
  }


  async isPartyIdExists(id: string) {
    return prisma.party.findUnique({
      where: { id },
      select: { id: true }
    });
  }

}