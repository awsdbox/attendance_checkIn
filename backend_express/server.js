import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import attendanceRoutes from './routes/attendance.js';

dotenv.config();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes (will add them soon)
app.get("/", (req, res) => {
  res.send("Server is running successfully!");
});

// Authentication Route. This is where the endpoint for auths stuff.
app.use("/api/auth", authRoutes);
// Attendance Route. This is where the endpoint for attendances.
app.use('/api/attendance', attendanceRoutes);


// Start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
