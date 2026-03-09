
import { Prisma } from "@/generated/index.js";

export const partySelect = Prisma.validator<Prisma.PartySelect>()({
  id: true,
  name: true,
  phone: true,
  gstNumber: true,
  address: true,
  type: true,
  createdAt: true,
  updatedAt: true
});

export type PartyDTO = Prisma.PartyGetPayload<{
  select: typeof partySelect;
}>;

 