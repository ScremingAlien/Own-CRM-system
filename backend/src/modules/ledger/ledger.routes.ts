import { Router } from "express";
import LedgerController from "./ledger.controller.js";

const router = Router();
const ledgerController = new LedgerController();

router.get("/party/:id", ledgerController.partyLedgers);
router.get("/party/:id/balance", ledgerController.partyBalance);
router.get("/party/:id/ledger", ledgerController.getLedgers);

export default router;
