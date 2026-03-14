import { Router } from "express";
import PaymentController from "./payment.controller.js";
import validate from "@/middlewares/default/validate.js";
import { createPaymentSchema } from "./payment.validator.js";

const router = Router();
const paymentController = new PaymentController();

router.get("/", paymentController.getAll);
router.post("/", validate(createPaymentSchema), paymentController.createPayment);

export default router;
