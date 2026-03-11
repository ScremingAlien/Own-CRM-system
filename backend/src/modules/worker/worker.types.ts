import { Prisma } from "@/generated/index.js";

export const workerSelect = Prisma.validator<Prisma.WorkerSelect>()({
  id: true,
  name: true,
  phone: true,
  skillType: true,
  defaultWage: true,
  isActive: true,
  createdAt: true,
});

export type WorkerDTO = Prisma.WorkerGetPayload<{
  select: typeof workerSelect;
}>;
