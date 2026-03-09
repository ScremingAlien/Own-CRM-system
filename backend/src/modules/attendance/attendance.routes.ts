import { Router } from "express";
import AttendanceController from "./attendance.controller.js";

const router = Router();
const attendanceController = new AttendanceController();

router.get("/", attendanceController.getAll);

export default router;
