import type { Request, Response, NextFunction } from "express";
import attendanceService from "./attendance.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class AttendanceController {
  private attendanceService = attendanceService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.attendanceService.getAll();
      res.success("Get All Attendances", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
