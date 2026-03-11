import { z } from "zod";
import { WorkOrderStatus } from "./workorder.types.js";

export const createWorkorderSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Workorder title is required"),
    description: z.string().min(1, "Workorder description is required").optional(),
    partyId: z.string().min(1, "Workorder partyId is required"),
    status: z.enum(WorkOrderStatus).default(WorkOrderStatus.PENDING),
    startDate: z.string().min(1, "Workorder startDate is required"),
    endDate: z.string().min(1, "Workorder endDate is required").optional(),
  }),
});
