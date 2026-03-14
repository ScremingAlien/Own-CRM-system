import type { Request, Response, NextFunction } from "express";
import paymentService from "./payment.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";
import { asyncHandler } from "@/middlewares/default/asyncHandler.js";

export default class PaymentController {
  private paymentService = paymentService;

  getAll = asyncHandler(async (_req: Request, res: Response) => {
    const data = await this.paymentService.fetchAllPayements();
    res.success("Get All Payments", data, statusCode.OK);
  });

  createPayment = asyncHandler(async (req: Request, res: Response) => {
    const data = await this.paymentService.createPayment(req.body);
    res.success("Create Payment", data, statusCode.CREATED);
  });
}
