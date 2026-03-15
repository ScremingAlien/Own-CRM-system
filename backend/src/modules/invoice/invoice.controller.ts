import type { Request, Response, NextFunction } from "express";
import invoiceService from "./invoice.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class InvoiceController {
  private invoiceService = invoiceService;

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.invoiceService.getAll({
      
      month: parseInt(_req.query.month as string),
      year: parseInt(_req.query.year as string),
    });
    res.success("Get All Invoices", data, statusCode.OK);
  })

  createInvoice = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.invoiceService.createInvoice(req.body);
    res.success("Create Invoice", data, statusCode.CREATED);
  })

  deleteInvoice = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.invoiceService.deleteInvoice(req.params.id as string);
    res.success("Delete Invoice", data, statusCode.OK);
  })
}
