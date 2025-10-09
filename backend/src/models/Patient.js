// backend/src/models/Patient.js
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cardUID: { type: String, required: true, unique: true },
    age: Number,
    gender: String,
    address: String,
    contact: String,
    registeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
export default Patient;
