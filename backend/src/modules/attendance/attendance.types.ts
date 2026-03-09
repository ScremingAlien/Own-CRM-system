import { Prisma } from "@/generated/index.js";

export const attendanceDaySelect =
  Prisma.validator<Prisma.AttendanceDaySelect>()({
    id: true,
    date: true,
    monthKey: true,
    year: true,
    month: true,
    day: true,
    createdAt: true
  });

export type AttendanceDayDTO = Prisma.AttendanceDayGetPayload<{
  select: typeof attendanceDaySelect;
}>;


export const attendanceItemSelect =
  Prisma.validator<Prisma.AttendanceItemSelect>()({
    id: true,
    workerId: true,
    attendanceDayId: true,
    status: true,
    hoursWorked: true,
    overtimeHours: true,
    wage: true
  });

export type AttendanceItemDTO = Prisma.AttendanceItemGetPayload<{
  select: typeof attendanceItemSelect;
}>;
