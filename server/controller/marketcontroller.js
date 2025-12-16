import { fetchMarketMovers } from "../services/marketservice.js";

export const getmarketMover = async (req, res) => {
  try {
    const movers = await fetchMarketMovers();
    res
      .status(200)
      .json({ success: true, message: "Market mover fetch ", movers });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
