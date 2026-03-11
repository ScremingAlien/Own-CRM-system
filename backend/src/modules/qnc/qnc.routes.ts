import { Router } from "express";
import QncController from "./qnc.controller.js";

const router = Router();
const qncController = new QncController();

router.get("/", qncController.getAll);

export default router;
