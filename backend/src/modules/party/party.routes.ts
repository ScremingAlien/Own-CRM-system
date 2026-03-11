import { Router } from "express";
import PartyController from "./party.controller.js";
import validate from "@/middlewares/default/validate.js";
import { createPartySchema, updatePartySchema } from "./party.validator.js";

const router = Router();
const partyController = new PartyController();

router.get("/", partyController.getAll);
router.get("/:id/byid", partyController.get_by_id);
router.post("/", validate(createPartySchema), partyController.create_party);
router.delete("/:id", partyController.delete_party); // soft delete
router.patch("/:id", validate(updatePartySchema), partyController.update_party);

export default router;
