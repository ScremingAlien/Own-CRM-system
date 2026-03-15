import { Router } from "express";
import InvoiceController from "./invoice.controller.js";
import validate from "@/middlewares/default/validate.js";
import { createInvoiceSchema } from "./invoice.validator.js";

const router = Router();
const invoiceController = new InvoiceController();

router.get("/", invoiceController.getAll);
router.post("/", validate(createInvoiceSchema), invoiceController.createInvoice);
router.delete("/:id", invoiceController.deleteInvoice);


export default router;
