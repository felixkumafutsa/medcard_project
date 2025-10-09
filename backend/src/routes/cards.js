import express from "express";
import CardRead from "../models/CardRead.js";
import Patient from "../models/Patient.js";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  try {
    const reads = await CardRead.find()
      .populate("patientId", "fullName")   // note: your schema uses patientId
      .populate("readBy", "name")          // if you add this field
      .sort({ timestamp: -1 });

    // map to frontend format
    const formatted = reads.map(r => ({
      _id: r._id,
      cardUID: r.cardUid,               // rename to match frontend
      patient: { fullName: r.patientId?.fullName || "N/A" },
      readBy: { name: r.readBy?.name || "Unknown" },
      createdAt: r.timestamp
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
