// Card model definition using Mongoose
import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  card_uid: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // ✅ make optional for now
  },
  description: {
    type: String,
    default: "Unassigned RFID Card",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isActive: { 
    type: Boolean, 
    default: true,
   },
});

export default mongoose.model("Card", CardSchema);
