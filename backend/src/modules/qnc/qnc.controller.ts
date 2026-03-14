import type { Request, Response, NextFunction } from "express";
import qncService from "./qnc.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class QncController {
  private qncService = qncService;

  fetchChalans = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.qncService.getChalans({
      month: parseInt(_req.query.month as string),
      year: parseInt(_req.query.year as string),
    });
    res.success("Get All Chalans", data, statusCode.OK);
  });

  fetchSingleChalan = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.getSingleChalan(req.params.id as string);
    res.success("Get Single Chalan", data, statusCode.OK);
  });

  deleteChalan = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.deleteChalan(req.params.id as string);
    res.success("Chalan Deleted Successfully !", data, statusCode.OK);
  });
  createChalan = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.createChalan({ invoiceId: req.body.invoiceId, chNo: req.body.chNo, });
    res.success("Chalan created Successfully !", data, statusCode.OK);
  });

  fetchSingleQuotation = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.getSingleQuotation(req.params.id as string);
    res.success("Get Single Quotation", data, statusCode.OK);
  });

  fetchQuotations = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.getQuotations({
      month: parseInt(req.query.month as string),
      year: parseInt(req.query.year as string),
    });
    res.success("Get Quotations", data, statusCode.OK);
  });

  deleteQuotation = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.deleteQuotation(req.params.id as string);
    res.success("Quotation Deleted Successfully !", data, statusCode.OK);
  });
  
  createQuotation = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.qncService.createQuotation(req.body);
    res.success("Quotation created Successfully !", data, statusCode.OK);
  });
}
