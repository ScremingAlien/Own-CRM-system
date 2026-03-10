import { Prisma } from "@/generated/index.js";
import { fyCreateSchema } from "./reports.validator.js";
import z from "zod";
export interface Reports {
  id: number;
  title: string;
}

export type CreateFyInput = z.infer<typeof fyCreateSchema>["body"];


export const fySelect = Prisma.validator<Prisma.FinancialYearSelect>()({
  id: true,
  label: true,
  startDate: true,
  endDate: true,
  isActive: true,
  isClosed: true,
  createdAt: true,
});


export type FyDTO = Prisma.FinancialYearGetPayload<{
  select: typeof fySelect;
}>;