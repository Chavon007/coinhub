import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    YOB: { type: Number, required: true },
    profilePicture: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    nin: { type: String },
    otp: { type: String },
    otpExpires: { type: Date },
    forgetPassword: { type: String },
    resetPassword: { type: String },
    wallets: [
      {
        address: { type: String, required: true },
        balance: { type: Number, default: 0 },
        network: { type: String, default: "Ethereum" },
      },
    ],
    watchlist: [{ coinId: { type: String }, alertPrice: { type: Number } }],
    portfolio: [
      {
        coinId: { type: String },
        amount: { type: Number },
        averagePrice: { type: Number },
      },
    ],
    notifications: [
      {
        type: { type: String },
        message: { type: String },
        read: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    fcmToken: { type: String, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    twoFactorEnabled: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
