// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  checkInTime: { type: Date, default: Date.now },
  checkOutTime: { type: Date, default: null },
  status: { type: String, enum: ["Present", "Absent", "Late"], default: "Present" },
  selfieUrl: { type: String, default: null },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
