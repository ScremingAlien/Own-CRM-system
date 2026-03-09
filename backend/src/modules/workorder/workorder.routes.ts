import { Router } from "express";
import WorkorderController from "./workorder.controller.js";
import validate from "@/middlewares/default/validate.js";
import { createWorkorderSchema } from "./workorder.validator.js";

const router = Router();
const workorderController = new WorkorderController();

router.get("/", workorderController.getAll);
router.post("/", validate(createWorkorderSchema), workorderController.create_workorder);
router.get("/byId/:id", workorderController.create_workorder);
router.delete("/:id", workorderController.delete_by_id);
export default router;
