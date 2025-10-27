// models/Class.js
import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  day: { type: String, required: true }, // e.g., "Monday"
  startTime: { type: String, required: true }, // "08:00"
  endTime: { type: String, required: true } // "10:00"
});

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schedule: [scheduleSchema],
}, { timestamps: true });

const ClassModel = mongoose.model("Class", classSchema);
export default ClassModel;
