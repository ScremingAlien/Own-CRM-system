import { Router } from "express";
import ReportsController from "./reports.controller.js";
import validate from "@/middlewares/default/validate.js";
import { fyCreateSchema } from "./reports.validator.js";

const router = Router();
const reportsController = new ReportsController();

/*------------------------------------
Reports apis  /report
--------------------------------------*/
router.get("/report", reportsController.get_all_fy);

/*------------------------------------
Financial Year apis   /fy
--------------------------------------*/
router.get('/fy', reportsController.get_all_fy);
router.post('/fy', validate(fyCreateSchema), reportsController.create_fy);
router.patch('/fy/:id/active', reportsController.active_fy);
router.patch('/fy/:id/close', reportsController.close_fy);
// router.delete('/fy/:id', reportsController.get_all_fy);
router.get('/fy/:id/byid', reportsController.get_fy_by_lb);


export default router;
