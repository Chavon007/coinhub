import mongoose from "mongoose";

const walletSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  ethereum: {
    type: String,
    required: true,
  },
  bitcoin: {
    type: String,
    required: true,
  },
  solana: {
    type: String,
    required: true,
  },
  ripple: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("wallet", walletSchema);
