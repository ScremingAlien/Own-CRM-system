import { z } from "zod";

export const createLedgerSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Ledger title is required"),
  }),
});

export type CreateLedgerInput = z.infer<typeof createLedgerSchema>["body"];
