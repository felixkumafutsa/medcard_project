// Treatment model definition using Mongoose
import mongoose from "mongoose";

const treatmentSchema = new mongoose.Schema({
  diagnosis: { type: mongoose.Schema.Types.ObjectId, ref: "Diagnosis", required: true },
  treatment_text: String,
  prescribed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  treatment_date: { type: Date, default: Date.now },
});

export default mongoose.model("Treatment", treatmentSchema);
