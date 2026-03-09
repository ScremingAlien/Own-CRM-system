import { Prisma } from "@/generated/index.js";

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