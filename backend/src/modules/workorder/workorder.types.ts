import { Prisma } from "@/generated/index.js";
import z from "zod";
import { createWorkorderSchema } from "./workorder.validator.js";

export enum WorkOrderStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

 
export const workOrderSelect = Prisma.validator<Prisma.WorkOrderSelect>()({
  id: true,
  title: true,
  description: true,
  partyId: true,
  status: true,
  startDate: true,
  endDate: true,
  estimatedCost: true
});

export type WorkOrderDTO = Prisma.WorkOrderGetPayload<{
  select: typeof workOrderSelect;
}>;

export type CreateWorkOrderType = z.infer<typeof createWorkorderSchema>["body"];