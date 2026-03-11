import { prisma } from "@/infra/database/prisma.js";
import type { CreateFyInput, FyDTO, Reports } from "./reports.types.js";

export class ReportsRepository {
  async findAllFy(): Promise<FyDTO[]> {
    return await prisma.financialYear.findMany();
  }

  async findByLabel(lb: string): Promise<FyDTO | null> {
    return await prisma.financialYear.findFirst({ where: { label: lb } });
  }

  async createFy(data: CreateFyInput): Promise<FyDTO> {
    return await prisma.financialYear.create({ data });
  }

  async activeFy(id: string): Promise<FyDTO> {
    return await prisma.financialYear.update({ where: { id }, data: { isActive: true } });
  }

  async unactiveManyFy(): Promise<any> {
    return await prisma.financialYear.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });
  }

  async closeFy(id: string): Promise<FyDTO> {
    return await prisma.financialYear.update({
      where: { id },
      data: { isClosed: true, isActive: false },
    });
  }
}
