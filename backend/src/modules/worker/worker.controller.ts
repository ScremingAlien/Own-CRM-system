import type { Request, Response, NextFunction } from "express";
import workerService from "./worker.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class WorkerController {
  private workerService = workerService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.workerService.getAll();
      res.success("Get All Workers", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
