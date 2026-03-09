import { prisma } from "@/infra/database/prisma.js";

import { partySelect, type PartyDTO } from "./party.types.js";

export class PartyRepository {

  async findAll(): Promise<PartyDTO[]> {
    return prisma.party.findMany({
      select: partySelect,
      orderBy: { createdAt: "desc" }
    });
  }

  async findById(id: string): Promise<PartyDTO | null> {
    return prisma.party.findUnique({
      where: { id },
      select: partySelect
    });
  }

  async create(data: any): Promise<PartyDTO> {
    return prisma.party.create({
      data,
      select: partySelect
    });
  }

  async update(id: string, data: any): Promise<PartyDTO> {
    return prisma.party.update({
      where: { id },
      data,
      select: partySelect
    });
  }

  async delete(id: string) {
    return prisma.party.delete({
      where: { id }
    })
  }
}