import { Prisma } from "@/generated/index.js";

export const paymentSelect = Prisma.validator<Prisma.PaymentSelect>()({
  id: true,
  partyId: true,
  amount: true,
  method: true,
  note: true,
  paymentDate: true
});

export type PaymentDTO = Prisma.PaymentGetPayload<{
  select: typeof paymentSelect;
}>;