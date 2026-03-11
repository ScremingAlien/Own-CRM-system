import { prisma } from "@/infra/database/prisma.js";
import { WorkOrderDTO, workOrderSelect, WorkOrderStatus } from "./workorder.types.js";
import { Prisma } from "@/generated/index.js";

export class WorkOrderRepository {
  async findAll(): Promise<WorkOrderDTO[]> {
    return prisma.workOrder.findMany({ select: workOrderSelect });
  }

  async findById(id: string): Promise<WorkOrderDTO | null> {
    return prisma.workOrder.findUnique({ where: { id }, select: workOrderSelect });
  }

  async updateStatus(id: string, data: WorkOrderStatus): Promise<WorkOrderDTO> {
    return prisma.workOrder.update({ where: { id }, data: { status: data } });
  }

  async create(data: Prisma.WorkOrderCreateInput): Promise<WorkOrderDTO> {
    return prisma.workOrder.create({ data, select: workOrderSelect });
  }

  // -1
  async update(id: string, data: Prisma.WorkOrderUpdateInput): Promise<WorkOrderDTO> {
    return prisma.workOrder.update({ where: { id }, data, select: workOrderSelect });
  }

  async delete(id: string) {
    return prisma.workOrder.delete({ where: { id } });
  }
}
