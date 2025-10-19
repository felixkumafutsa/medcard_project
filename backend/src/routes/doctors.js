// Doctors routes
import express from "express";
import Doctor from "../models/Doctor.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create doctor (Admin only)
router.post("/", verifyToken, authorizeRoles("admin"), async (req, res) => {
  try {
    const { user, specialization, contact } = req.body;
    const doctor = await Doctor.create({ user, specialization, contact });
    res.status(201).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error creating doctor", error });
  }
});

// ✅ Get all doctors
router.get("/", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "username role");
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctors", error });
  }
});

// ✅ Get doctor by ID
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("user", "username role");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching doctor", error });
  }
});

// ✅ Update doctor info
router.put("/:id", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating doctor", error });
  }
});

export default router;
