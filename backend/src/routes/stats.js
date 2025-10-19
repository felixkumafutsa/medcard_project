import express from "express";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import Card from "../models/Card.js";
import CardRead from "../models/CardRead.js";

const router = express.Router();

router.get("/counts", async (req, res) => {
  try {
    const [patients, doctors, cards, cardReads] = await Promise.all([
      Patient.countDocuments(),
      Doctor.countDocuments(),
      Card.countDocuments(),
      CardRead.countDocuments(),
    ]);

    res.json({ patients, doctors, cards, cardReads });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stats", error: error.message });
  }
});

export default router;
