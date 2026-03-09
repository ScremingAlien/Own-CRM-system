import { Router } from "express";
import LedgerController from "./ledger.controller.js";

const router = Router();
const ledgerController = new LedgerController();

router.get("/", ledgerController.getAll);

export default router;
