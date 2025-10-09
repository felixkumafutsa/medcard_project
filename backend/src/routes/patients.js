import express from "express";
import Patient from "../models/Patient.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET /api/patients — return all patients
router.get("/", verifyToken, async (req, res) => {
  try {
    const patients = await Patient.find().populate("registeredBy", "name email role");
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/patients/register — register new patient
router.post("/register", verifyToken, async (req, res) => {
  try {
    const { fullName, dob, gender, email, phone, cardUID } = req.body;

    // Check if cardUID already exists
    const exists = await Patient.findOne({ cardUID });
    if (exists) return res.status(400).json({ message: "Card already registered" });

    const patient = new Patient({
      fullName,
      dob,
      gender,
      email,
      phone,
      cardUID,
      registeredBy: req.user.id
    });

    await patient.save();
    res.status(201).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
