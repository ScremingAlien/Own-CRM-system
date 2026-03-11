import { z } from "zod";

export enum PartyType {
  customer = "CUSTOMER",
  supplier = "SUPPLIER",
}
export const createPartySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Party name is required"),
    phone: z.string().min(1, "Party phone is required").optional(),
    gstNumber: z.string().min(1, "Party gstNumber is required").optional(),
    address: z.string().min(1, "Party address is required").optional(),
    stateCode: z.string().min(1, "Party address is required").optional(),
    type: z.enum(PartyType).default(PartyType.customer),
  }),
});

export const updatePartySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Party name is required").optional(),
    phone: z.string().min(1, "Party phone is required").optional(),
    gstNumber: z.string().min(1, "Party gstNumber is required").optional(),
    address: z.string().min(1, "Party address is required").optional(),
    stateCode: z.string().min(1, "Party address is required").optional(),
  }),
});
