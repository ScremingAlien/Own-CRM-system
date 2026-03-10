import { Router } from "express";
import WorkerController from "./worker.controller.js";

const router = Router();
const workerController = new WorkerController();

router.get("/", workerController.getAll);
router.get("/:id/byid",workerController.getAll);
router.post("/",workerController.getAll);  //create worker
router.patch("/:id",workerController.getAll);  // update worker
router.patch("/:id/deactivate",workerController.getAll);

/**Worker attendance history
 * workers/:id/attendance
 */
router.get("/:id/attendance",workerController.getAll);  
 

export default router;
