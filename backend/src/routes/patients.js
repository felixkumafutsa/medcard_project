// Patients routes
import express from "express";
import Patient from "../models/Patient.js";
import Card from "../models/Card.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create patient (Admin or Doctor)
router.post("/", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const { user, fullName, dob, gender, contact } = req.body;
    const patient = await Patient.create({ user, fullName, dob, gender, contact });
    res.status(201).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error creating patient", error });
  }
});

// ✅ Get all patients (Admin and Doctors only)
router.get("/", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const patients = await Patient.find().populate("user", "username role");
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patients", error });
  }
});

// ✅ Get a single patient (Self, Admin, or Doctor)
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate("user", "username role")
      .populate("card");

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (req.user.role === "patient" && req.user._id.toString() !== patient.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: "Error fetching patient", error });
  }
});

// ✅ Update patient info (Self, Admin, or Doctor)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    if (req.user.role === "patient" && req.user._id.toString() !== patient.user.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updated = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating patient", error });
  }
});

export default router;
