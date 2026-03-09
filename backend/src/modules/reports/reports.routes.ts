import { Router } from "express";
import ReportsController from "./reports.controller.js";

const router = Router();
const reportsController = new ReportsController();

router.get("/", reportsController.getAll);

export default router;
