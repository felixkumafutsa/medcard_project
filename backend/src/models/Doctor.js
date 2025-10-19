// Doctor model definition using mongoose
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: String,
  contact: String,
});

export default mongoose.model("Doctor", doctorSchema);
