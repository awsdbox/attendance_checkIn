// controllers/attendanceController.js
import Attendance from "../models/Attendance.js";
import ClassModel from "../models/Class.js";

export const checkIn = async (req, res) => {
  try {
    const { classId, selfieUrl } = req.body;
    const userId = req.user?.id;

    if (!classId) return res.status(400).json({ message: "classId is required" });

    // optional: validate class exists
    const clazz = await ClassModel.findById(classId);
    if (!clazz) return res.status(404).json({ message: "Class not found" });

    // optional: prevent duplicate check-ins for same class in same day
    // you can change logic to allow multi-checkins if needed
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const existing = await Attendance.findOne({
      user: userId,
      class: classId,
      checkInTime: { $gte: startOfDay, $lte: endOfDay }
    });

    // For now, allow multiple entries — comment out the block below if you want to allow.
    // if (existing) return res.status(409).json({ message: "Already checked in for this class today" });

    const attendance = new Attendance({
      user: userId,
      class: classId,
      selfieUrl: selfieUrl || null,
      checkInTime: new Date()
    });

    await attendance.save();

    return res.status(201).json({ message: "Check-in successful", attendance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Check-in failed", error: err.message });
  }
};

export const checkOut = async (req, res) => {
  try {
    const { attendanceId } = req.body;
    if (!attendanceId) return res.status(400).json({ message: "attendanceId is required" });

    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ message: "Attendance not found" });

    if (attendance.checkOutTime) return res.status(409).json({ message: "Already checked out" });

    attendance.checkOutTime = new Date();
    await attendance.save();

    return res.json({ message: "Check-out successful", attendance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Check-out failed", error: err.message });
  }
};

export const getUserAttendance = async (req, res) => {
  try {
    const userId = req.params.id;
    const records = await Attendance.find({ user: userId })
      .populate("class", "name code")
      .sort({ checkInTime: -1 });

    return res.json(records);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to get attendance", error: err.message });
  }
};
