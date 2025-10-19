import express from "express";
import Card from "../models/Card.js";
import Diagnosis from "../models/Diagnosis.js";
import Treatment from "../models/Treatment.js";

const router = express.Router();

// Register a new card
router.post("/register", async (req, res) => {
  try {
    const { uid, description } = req.body;
    if (!uid) return res.status(400).json({ message: "Card UID is required" });

    // Check if card already exists
    const existing = await Card.findOne({ card_uid: uid });
    if (existing) {
      return res.status(400).json({ message: "Card UID already exists" });
    }

    // Create and save new card
    const card = new Card({
      card_uid: uid,
      description: description || "Unassigned RFID Card",
    });

    await card.save();
    res.json({ message: "Card registered successfully", card });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to register card", error: err.message });
  }
});

// In-memory storage for last scanned card UID
let lastScannedUID = "";

// Endpoint to receive scanned UID from ESP32
router.post("/scan", (req, res) => {
  const { uid } = req.body;
  lastScannedUID = uid;
  res.json({ message: "Scan received", uid });
});

// Endpoint to get last scanned UID (for frontend use)
router.get("/last-scanned", (req, res) => {
  res.json({ uid: lastScannedUID });
});


// Get all cards
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().populate("patient", "name email");
    res.json(cards);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cards", error });
  }
});

// GET /api/cards/:id
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id).populate("patient");
    if (!card) return res.status(404).json({ message: "Card not found" });

    let diagnoses = [];
    let treatments = [];

    if (card.patient) {
      diagnoses = await Diagnosis.find({ patient: card.patient._id }).populate("doctor");
      treatments = await Treatment.find({ diagnosis: { $in: diagnoses.map(d => d._id) } });
    }

    res.json({ card, diagnoses, treatments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching card details" });
  }
});


// Assign patient to card
router.put("/:id/assign", async (req, res) => {
  try {
    const { patientId } = req.body;
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { patient: patientId },
      { new: true }
    ).populate("patient", "name email");
    res.json({ message: "Patient assigned successfully", card });
  } catch (err) {
    res.status(500).json({ message: "Error assigning patient", error: err.message });
  }
});

// Deactivate card
router.put("/:id/deactivate", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    res.json({ message: "Card deactivated successfully", card });
  } catch (err) {
    res.status(500).json({ message: "Error deactivating card", error: err.message });
  }
});

// Reactivate card
router.put("/:id/activate", async (req, res) => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.id,
      { isActive: true },
      { new: true }
    );
    res.json({ message: "Card activated successfully", card });
  } catch (err) {
    res.status(500).json({ message: "Error activating card", error: err.message });
  }
});


// Delete a card
router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting card", error });
  }
});


export default router;
