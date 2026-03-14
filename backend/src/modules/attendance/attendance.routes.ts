import { Router } from "express";
import AttendanceController from "./attendance.controller.js";

const router = Router();
const attendanceController = new AttendanceController();

router.get("/", attendanceController.getAll);

/**GET /api/attendance/month?month=3&year=2026 */
router.get("/month", attendanceController.getAll);

// create attendance of day
router.post("/day", attendanceController.getAll); //create attendance day

 
/**Worker attendance history
 * workers/:id/attendance
 */
 
export default router;
