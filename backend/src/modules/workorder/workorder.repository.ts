import { prisma } from "@/infra/database/prisma.js";
import { WorkOrderDTO, workOrderSelect } from "./workorder.types.js";
import { Prisma } from "@/generated/index.js";


export class WorkOrderRepository {

  async findAll(): Promise<WorkOrderDTO[]> {
    return prisma.workOrder.findMany({ select: workOrderSelect });
  }

  async findById(id: string): Promise<WorkOrderDTO | null> {
    return prisma.workOrder.findUnique({ where: { id }, select: workOrderSelect });
  }

  async create(data: Prisma.WorkOrderCreateInput): Promise<WorkOrderDTO> {
    return prisma.workOrder.create({ data, select: workOrderSelect });
  }

  async update(id: string, data: Prisma.WorkOrderUpdateInput): Promise<WorkOrderDTO> {
    return prisma.workOrder.update({ where: { id }, data, select: workOrderSelect });
  }

  async delete(id: string) {
    return prisma.workOrder.delete({ where: { id } });
  }

}