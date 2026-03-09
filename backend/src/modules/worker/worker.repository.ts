import { prisma } from "@/infra/database/prisma.js";
import { workerSelect, type WorkerDTO } from "./worker.types.js";
import { Prisma } from "@/generated/index.js";

export class WorkerRepository {

  async findAll(): Promise<WorkerDTO[]> {
    return prisma.worker.findMany({
      select: workerSelect
    });
  }

  async create(data: Prisma.WorkerCreateInput): Promise<WorkerDTO> {
    return prisma.worker.create({
      data,
      select: workerSelect
    });
  }

  async update(id: string, data: Prisma.WorkerUpdateInput): Promise<WorkerDTO> {
    return prisma.worker.update({
      where: { id },
      data,
      select: workerSelect
    });
  }

  async delete(id: string) {
    return prisma.worker.delete({
      where: { id }
    });
  }
}