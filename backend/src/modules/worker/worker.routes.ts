import { Router } from "express";
import WorkerController from "./worker.controller.js";

const router = Router();
const workerController = new WorkerController();

router.get("/", workerController.getAll);

export default router;
