// routes/attendance.js
import express from "express";
import { checkIn, checkOut, getUserAttendance } from "../controllers/attendanceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/checkin", auth, checkIn);
router.post("/checkout", auth, checkOut);
router.get("/user/:id", auth, getUserAttendance);

export default router;
