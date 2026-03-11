import type { Request, Response, NextFunction } from "express";
import qncService from "./qnc.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class QncController {
  private qncService = qncService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.qncService.getAll();
      res.success("Get All Qncs", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
