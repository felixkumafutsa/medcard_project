// backend/src/routes/cardReads.js
import express from "express";
import CardRead from "../models/CardRead.js";

const router = express.Router();

// Log a new card scan
router.post("/", async (req, res) => {
  try {
    const { cardUid, location, patientId } = req.body;
    const newRead = new CardRead({ cardUid, location, patientId, timestamp: new Date() });
    await newRead.save();
    res.status(201).json({ message: "Card scan logged", cardRead: newRead });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log card read" });
  }
});

export default router;
