// diagnoses routes
import express from "express";
import Diagnosis from "../models/Diagnosis.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create diagnosis (Doctor only)
router.post("/", verifyToken, authorizeRoles("doctor"), async (req, res) => {
  try {
    const { patient, diagnosis_text } = req.body;
    const diagnosis = await Diagnosis.create({
      patient,
      doctor: req.user._id,
      diagnosis_text,
    });
    res.status(201).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: "Error creating diagnosis", error });
  }
});

// ✅ Get all diagnoses (Admin, Doctor)
router.get("/", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find()
      .populate("patient", "fullName")
      .populate("doctor", "specialization");
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diagnoses", error });
  }
});

// ✅ Get patient’s diagnoses (Patient can view their own)
router.get("/patient/:patientId", verifyToken, async (req, res) => {
  try {
    if (req.user.role === "patient" && req.user._id.toString() !== req.params.patientId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const diagnoses = await Diagnosis.find({ patient: req.params.patientId })
      .populate("doctor", "specialization");
    res.json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching diagnoses", error });
  }
});

export default router;
