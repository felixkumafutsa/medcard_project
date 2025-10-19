// Diagnosis model definition using Mongoose
import mongoose from "mongoose";

const diagnosisSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  diagnosis_text: String,
  diagnosis_date: { type: Date, default: Date.now },
});

export default mongoose.model("Diagnosis", diagnosisSchema);
