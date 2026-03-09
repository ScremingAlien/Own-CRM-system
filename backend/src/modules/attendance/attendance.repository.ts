import { prisma } from "@/infra/database/prisma.js";
import { Prisma } from "@/generated/index.js";
import { AttendanceDayDTO, attendanceDaySelect, AttendanceItemDTO, attendanceItemSelect } from "./attendance.types.js";



export class AttendanceRepository {

  async findAll(): Promise<AttendanceDayDTO[]> {
    return prisma.attendanceDay.findMany({
      select: attendanceDaySelect,
      orderBy: { date: "desc" }
    });
  }

  async findByDate(date: Date): Promise<AttendanceDayDTO | null> {
    return prisma.attendanceDay.findUnique({
      where: { date },
      select: attendanceDaySelect
    });
  }

  async create(data: Prisma.AttendanceDayCreateInput): Promise<AttendanceDayDTO> {
    return prisma.attendanceDay.create({ data, select: attendanceDaySelect });
  }



  async findByDay_Items(dayId: string): Promise<AttendanceItemDTO[]> {
    return prisma.attendanceItem.findMany({
      where: { attendanceDayId: dayId },
      select: attendanceItemSelect
    });
  }

  async create_item(data: Prisma.AttendanceItemCreateInput): Promise<AttendanceItemDTO> {
    return prisma.attendanceItem.create({ data, select: attendanceItemSelect });
  }

  async update_item(id: string, data: Prisma.AttendanceItemUpdateInput) {
    return prisma.attendanceItem.update({
      where: { id },
      data,
      select: attendanceItemSelect
    });
  }
}