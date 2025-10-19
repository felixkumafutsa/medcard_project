// treatments routes
import express from "express";
import Treatment from "../models/Treatment.js";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Create treatment (Doctor only)
router.post("/", verifyToken, authorizeRoles("doctor"), async (req, res) => {
  try {
    const { diagnosis, treatment_text } = req.body;
    const treatment = await Treatment.create({
      diagnosis,
      treatment_text,
      prescribed_by: req.user._id,
    });
    res.status(201).json(treatment);
  } catch (error) {
    res.status(500).json({ message: "Error creating treatment", error });
  }
});

// ✅ Get all treatments (Admin, Doctor)
router.get("/", verifyToken, authorizeRoles("admin", "doctor"), async (req, res) => {
  try {
    const treatments = await Treatment.find()
      .populate("diagnosis")
      .populate("prescribed_by", "specialization");
    res.json(treatments);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatments", error });
  }
});

// ✅ Get treatments by patient (Patient or Doctor)
router.get("/patient/:patientId", verifyToken, async (req, res) => {
  try {
    if (req.user.role === "patient" && req.user._id.toString() !== req.params.patientId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const treatments = await Treatment.find()
      .populate({
        path: "diagnosis",
        match: { patient: req.params.patientId },
      })
      .populate("prescribed_by", "specialization");

    const filtered = treatments.filter((t) => t.diagnosis);
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatments", error });
  }
});

export default router;
