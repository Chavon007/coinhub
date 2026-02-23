import { fetchCoinInsight } from "../services/marketservice.js";
import CoinInsightModel from "../model/aiCoinInsight.js";

export const aiCoinInsight = async (req, res) => {
  try {
    const userId = req.user.id;
    const { coinId, ticker } = req.params;

    const insight = await fetchCoinInsight(coinId, ticker);

    if (!insight) throw new Error("Can't find coin");

    await CoinInsightModel.create({
      userId,
      coinId,
      message: insight.header.message,
      coin: insight.price.coin,
      currentPrice: insight.price.currentPrice,
      percent: insight.price.percent,
      marketCap: insight.price.marketCap,
      whaleActivity: insight.price.whaleActivity,
      score: insight.sentiment.score,
      aiPrediction: insight.signal.aiPrediction,
      advice: insight.signal.advice,
      forecast: insight.scenario.forecast,
      forecastPercent: insight.scenario.forecastPercent,
    });

    res
      .status(200)
      .json({ success: true, message: "Coin Insight Generated", insight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
