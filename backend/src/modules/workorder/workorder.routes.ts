import { Router } from "express";
import WorkorderController from "./workorder.controller.js";

const router = Router();
const workorderController = new WorkorderController();

router.get("/", workorderController.getAll);

export default router;
