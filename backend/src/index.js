import express from "express";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import statsRoutes from "./routes/stats.js";
import cardRoutes from "./routes/cards.js";
import patientRoutes from "./routes/patients.js";
import doctorRoutes from "./routes/doctors.js";
import diagnosisRoutes from "./routes/diagnoses.js";
import treatmentRoutes from "./routes/treatments.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", // React dev URL
  credentials: true,
}));
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/diagnoses", diagnosisRoutes);
app.use("/api/treatments", treatmentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/stats", statsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
