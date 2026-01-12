import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.ObjectId,
    ref: "wallet",
    required: true,
  },
  coin: {
    type: String,
    enum: ["ethereum", "bitcoin", "solana", "ripple"],
    required: true,
  },
  type: {
    type: String,
    enum: ["BUY", "SELL"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  priceAtTrade: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("transactions", transactionSchema);
