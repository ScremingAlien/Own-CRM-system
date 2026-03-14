import { Router } from "express";
import QncController from "./qnc.controller.js";
import validate from "@/middlewares/default/validate.js";
import { createQncSchema, createQuotationSchema } from "./qnc.validator.js";

const router = Router();
const qncController = new QncController();

/*------------------------------------
Chalans apis /chn
--------------------------------------*/
router.get("/chn/", qncController.fetchChalans);
router.get("/chn/:id/byid", qncController.fetchSingleChalan);
router.post("/chn/", validate(createQncSchema), qncController.createChalan);
router.delete("/chn/:id", qncController.deleteChalan);


/*------------------------------------
Quotation apis /qto
--------------------------------------*/
router.get("/qto/", qncController.fetchQuotations);
router.get("/qto/:id/byid", qncController.fetchSingleQuotation);
router.delete("/qto/:id", qncController.deleteQuotation);
router.post("/qto", validate(createQuotationSchema), qncController.createQuotation);




export default router;
