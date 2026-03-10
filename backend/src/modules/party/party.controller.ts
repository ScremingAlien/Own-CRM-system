import type { Request, Response, NextFunction } from "express";
import partyService from "./party.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class PartyController {
  private partyService = partyService;

  getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const data = await this.partyService.getAllParty();
    res.success("Get All Parties", data, statusCode.OK);
  });

  get_by_id = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.partyService.getPartyById(req.params.id as string);
    res.success("Get Party By Id", data, statusCode.OK);
  });

  /** Create Party
   *  if has Opening balance then create a ledger item
   * 
   */
  create_party = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.partyService.createParty(req.body);
    res.success("Create Party", data, statusCode.CREATED);
  });

  update_party = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.partyService.updateParty(req.params.id as string, req.body);
    res.success("Update Party", data, statusCode.OK);
  });

  delete_party = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.partyService.deleteParty(req.params.id as string);
    res.success("Delete Party", data, statusCode.OK);
  });


}
