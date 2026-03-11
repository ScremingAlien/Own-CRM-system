import type { Request, Response, NextFunction } from "express";
import workorderService from "./workorder.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";
import { WorkOrderStatus } from "./workorder.types.js";

export default class WorkorderController {
  private workorderService = workorderService;

  create_workorder = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.workorderService.create(req.body);
    res.success("Create Workorder", data, statusCode.CREATED);
  });

  find_by_id = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.workorderService.find_by_id(req.params.id as string);
    res.success("Get Workorder By Id", data, statusCode.OK);
  });

  change_status = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.workorderService.updateStatus(
      req.params.id as string,
      req.query.s as WorkOrderStatus,
    );
    res.success("Update Workorder", data, statusCode.OK);
  });
  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.workorderService.find_all();
    res.success("Get All Workorders", data, statusCode.OK);
  });

  delete_by_id = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.workorderService.delete(req.params.id as string);
    res.success("Delete Workorder By Id", data, statusCode.OK);
  });
}
