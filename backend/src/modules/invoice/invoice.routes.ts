import { Router } from "express";
import InvoiceController from "./invoice.controller.js";

const router = Router();
const invoiceController = new InvoiceController();

router.get("/", invoiceController.getAll);

export default router;
