import { Router } from "express";
import PaymentController from "./payment.controller.js";

const router = Router();
const paymentController = new PaymentController();

router.get("/", paymentController.getAll);

export default router;
