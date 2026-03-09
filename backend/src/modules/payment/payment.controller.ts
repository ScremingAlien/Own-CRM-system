import type { Request, Response, NextFunction } from "express";
import paymentService from "./payment.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class PaymentController {
  private paymentService = paymentService;

  getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.paymentService.getAll();
      res.success("Get All Payments", data, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };
}
