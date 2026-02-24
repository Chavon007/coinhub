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
      timeFrameTabs: insight.price.timeFrameTabs,
      confidence: insight.price.confidence,
      target: insight.price.target,
      volatility: insight.price.volatility,
      score: insight.sentiment.score,
      sentimentRadius: insight.sentiment.sentimentRadius,
      sentimentRadiusMessage: insight.sentiment.sentimentRadiusMessage,
      aiPrediction: insight.signal.aiPrediction,
      advice: insight.signal.advice,
      institutionalFlow: insight.signal.institutionalFlow,
      momentumScore: insight.signal.momentumScore,
      forecast: insight.scenario.forecast,
      forecastPercent: insight.scenario.forecastPercent,
      portfolioImpact: insight.scenario.portfolioImpact,
      correlation: insight.scenario.correlation,
    });

    res
      .status(200)
      .json({ success: true, message: "Coin Insight Generated", insight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
