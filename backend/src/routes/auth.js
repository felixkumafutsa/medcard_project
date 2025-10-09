import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // select passwordHash explicitly if you hide it in schema
    const user = await User.findOne({ email }).select("+passwordHash");

    console.log("User found:", user);
    console.log("user.passwordHash:", user?.passwordHash);

    if (!user || !user.passwordHash) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    // remove passwordHash before sending user to frontend
    const { passwordHash, ...userData } = user.toObject();

    res.json({ user: userData, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
