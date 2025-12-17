import mongoose from "mongoose";

const balanceShema = new mongoose.Schema({
  walletId: {
    type: new mongoose.Schema.ObjectId(),
    ref: "wallet",
    required: true,
  },
  coin: {
    type: String,
    enum: ["ethereum", "bitcoin", "solana", "ripple"],
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  lastUpdate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("balance", balanceShema);
