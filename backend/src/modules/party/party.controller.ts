import type { Request, Response, NextFunction } from "express";
import partyService from "./party.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class PartyController {
  private partyService = partyService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.partyService.getAll();
      res.success("Get All Partys", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
