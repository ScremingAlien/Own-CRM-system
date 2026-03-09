import type { Request, Response, NextFunction } from "express";
import ledgerService from "./ledger.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class LedgerController {
  private ledgerService = ledgerService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.ledgerService.getAll();
      res.success("Get All Ledgers", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
