import { Prisma } from "@/generated/index.js";

export const attendanceDaySelect = Prisma.validator<Prisma.AttendanceDaySelect>()({
  id: true,
  date: true,
  year: true,
  month: true,
  day: true,
});

export type AttendanceDayDTO = Prisma.AttendanceDayGetPayload<{
  select: typeof attendanceDaySelect;
}>;

export const attendanceItemSelect = Prisma.validator<Prisma.AttendanceItemSelect>()({
  id: true,
  attendanceDayId: true,
  workerId: true,
  status: true,
  hoursWorked: true,
  wage: true,
});

export type AttendanceItemDTO = Prisma.AttendanceItemGetPayload<{
  select: typeof attendanceItemSelect;
}>;
