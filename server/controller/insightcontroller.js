import {
  generateAIInsight,
  fetchCryptoNews,
} from "../services/insightService.js";

export const getAIInsight = async (req, res) => {
  try {
    const { coin } = req.params;

    if (!coin) {
      return res.status(400).json({
        success: false,
        message: "Coin ID is required",
      });
    }

    const news = await fetchCryptoNews(coin);
    const insight = await generateAIInsight(coin, news);

    res.status(200).json({
      success: true,
      message: "AI insight generated successfully",
      coin,
      insight,
      news,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
