import { Prisma } from "@/generated/index.js";
import z from "zod";
import { createPartySchema } from "./party.validator.js";

export const partySelect = Prisma.validator<Prisma.PartySelect>()({
  id: true,
  name: true,
  phone: true,
  gstNumber: true,
  address: true,
  stateCode: true,
  type: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
});

export type PartyDTO = Prisma.PartyGetPayload<{
  select: typeof partySelect;
}>;
export type CreatePartyDTO = z.infer<typeof createPartySchema>["body"];
