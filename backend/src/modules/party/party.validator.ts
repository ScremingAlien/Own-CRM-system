import { z } from "zod";

export const createPartySchema = z.object({
  body: z.object({
    title: z.string().min(1, "Party title is required"),
  }),
});

export type CreatePartyInput = z.infer<typeof createPartySchema>["body"];
