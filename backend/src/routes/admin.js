import express from "express";
import User from "../models/User.js";
import Card from "../models/Card.js";
import CardRead from "../models/CardRead.js";

const router = express.Router();

/**
 * @route GET /api/admin/stats
 * @desc Get dashboard statistics (counts of patients, doctors, cards, card reads)
 */
router.get("/stats", async (req, res) => {
  try {
    const patients = await patients.countDocuments();
    const doctors = await doctors.countDocuments();
    const cards = await Card.countDocuments();
    const cardReads = await CardRead.countDocuments();

    res.json({ patients, doctors, cards, cardReads });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats", error: err.message });
  }
});


/**
 * @route GET /api/admin/users
 * @desc Get all users (admin view)
 */
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
});

/**
 * @route DELETE /api/admin/users/:id
 * @desc Delete a user by ID
 */
router.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user" });
  }
});

export default router;
