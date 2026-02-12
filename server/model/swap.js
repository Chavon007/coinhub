import mongoose from "mongoose";

const swapSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "wallet",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  from_coin: {
    type: String,
    required: true,
    enum: ["ethereum", "bitcoin", "solana", "ripple"],
  },
  to_coin: {
    type: String,
    required: true,
    enum: ["ethereum", "bitcoin", "solana", "ripple"],
  },
  from_amount: {
    type: Number,
    required: true,
  },
  to_amount: {
    type: Number,
    required: true,
  },
  exchange_rate: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["Completed", "Failed", "Pending"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Swap", swapSchema);
