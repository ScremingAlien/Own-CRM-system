import { z } from "zod";

export const createAttendanceSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Attendance title is required"),
  }),
});

export type CreateAttendanceInput = z.infer<typeof createAttendanceSchema>["body"];
