import mongoose from "mongoose";

const cardReadSchema = new mongoose.Schema({
  cardUid: { type: String, required: true },
  location: { type: String },
  timestamp: { type: Date, default: Date.now },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" }, // must match model name
  readBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("CardRead", cardReadSchema);
