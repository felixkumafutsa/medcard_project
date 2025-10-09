import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import patientsRoutes from "./routes/patients.js";
import cardRoutes from "./routes/cards.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientsRoutes); // ✅ mount patients route
app.use("/api/card-reads", cardRoutes);

app.get("/", (req, res) => res.send("MedCard API running"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running on port", process.env.PORT || 5000)
    )
  )
  .catch((err) => console.error("MongoDB connection error:", err));
