import type { Request, Response, NextFunction } from "express";
import reportsService from "./reports.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class ReportsController {
  private reportsService = reportsService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.reportsService.getAll();
      res.success("Get All Reportss", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
