import type { Request, Response, NextFunction } from "express";
import invoiceService from "./invoice.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class InvoiceController {
  private invoiceService = invoiceService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.invoiceService.getAll();
      res.success("Get All Invoices", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
