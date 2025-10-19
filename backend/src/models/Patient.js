// Patient model definition using mongoose
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  dob: Date,
  gender: { type: String, enum: ["male", "female"] },
  contact: String,
});

export default mongoose.model("Patient", patientSchema);
