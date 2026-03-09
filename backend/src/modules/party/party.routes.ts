import { Router } from "express";
import PartyController from "./party.controller.js";

const router = Router();
const partyController = new PartyController();

router.get("/", partyController.getAll);

export default router;
