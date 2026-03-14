import type { Request, Response, NextFunction } from "express";
import ledgerService from "./ledger.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class LedgerController {
  private ledgerService = ledgerService;

  partyLedgers = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.ledgerService.getPartyLedger(_req.params.id as string);
    res.success("Get All Ledgers", data, statusCode.OK);
  });

  partyBalance = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.ledgerService.getPartyBalance(_req.params.id as string);
    res.success("Get Party Balance", data, statusCode.OK);
  });
}
