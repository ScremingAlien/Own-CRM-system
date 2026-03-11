import type { Request, Response, NextFunction } from "express";
import reportsService from "./reports.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class ReportsController {
  private reportsService = reportsService;

  get_all_fy = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.reportsService.getAllFy();
    res.success("Get All Financial Year", data, statusCode.OK);
  });

  get_fy_by_lb = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.reportsService.findByLabel(_req.params.id as string);
    res.success("Get Financial Year By Lable", data, statusCode.OK);
  });

  create_fy = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.reportsService.createFy(req.body);
    res.success("Create Financial Year", data, statusCode.CREATED);
  });

  active_fy = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.reportsService.activeFy(req.params.id as string);
    res.success("Active Financial Year", data, statusCode.OK);
  });

  close_fy = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.reportsService.closeFy(req.params.id as string);
    res.success("Close Financial Year", data, statusCode.OK);
  });
}
