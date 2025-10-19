import mongoose from "mongoose";

const cardReadSchema = new mongoose.Schema(
  {
    cardUid: { type: String, required: true },
    location: String,
    timestamp: { type: Date, default: Date.now },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
  },
  { timestamps: true }
);

const CardRead = mongoose.model("CardRead", cardReadSchema);
export default CardRead;
