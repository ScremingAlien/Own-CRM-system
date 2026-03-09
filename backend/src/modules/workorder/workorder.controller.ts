import type { Request, Response, NextFunction } from "express";
import workorderService from "./workorder.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class WorkorderController {
  private workorderService = workorderService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.workorderService.getAll();
      res.success("Get All Workorders", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
