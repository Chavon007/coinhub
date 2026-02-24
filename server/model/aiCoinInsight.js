import mongoose from "mongoose";

const coinInsightSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    coinId: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    coin: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: String,
      required: true,
    },
    percent: {
      type: String,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    whaleActivity: {
      type: Number,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    sentimentRadius: {
      type: String,
      required: true,
    },
    sentimentRadiusMessage: {
      type: String,
      required: true,
    },
    aiPrediction: {
      type: String,
      required: true,
    },
    advice: {
      type: String,
      required: true,
    },
    institutionalFlow: {
      type: String,
      required: true,
    },
    momentumScore: {
      type: String,
      required: true,
    },
    forecast: {
      type: String,
      required: true,
    },
    forecastPercent: {
      type: String,
      required: true,
    },
    portfolioImpact: {
      type: String,
      required: true,
    },
    correlation: {
      type: String,
      required: true,
    },
    confidence: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    volatility: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Coininsight", coinInsightSchema);
