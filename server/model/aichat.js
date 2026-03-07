import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    sessionId: {
      type: String,
      required: true,
      unique: true,
    },
    summaryMessage: {
      type: String,
      required: true,
      maxlength: 150,
    },
  },
  {
    timestamps: true,
  },
);

aiChatSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model("aichat", aiChatSchema);
