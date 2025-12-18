import Balance from "../model/walletbalance.js";

import { getPortfolioChangeService } from "../services/marketservice.js";
// Get balnace for coin

export const getEachCoinBalance = async (req, res) => {
  try {
    const walletId = req.user.walletId;

    const balanceCoin = await Balance.find({ walletId });
    res.status(200).json({
      success: true,
      message: "Balnace fetched successfully",
      balanceCoin: balanceCoin || [],
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get the coin balance" });
  }
};

// get coin balabce of a specfic coin

export const CoinBalance = async (req, res) => {
  try {
    const walletId = req.user.walletId;
    const { coin } = req.params;

    const mainBalance = await Balance.findOne({ walletId, coin });
    if (!mainBalance) {
      return res.status(404).json({
        success: false,
        message: "No balance found",
        mainBalance: { coin, amount: 0 },
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Balnace fetched", mainBalance });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Add all coin balance together

export const getTotalBalance = async (req, res) => {
  try {
    const walletId = req.user.walletId;
    const totalbalance = await Balance.aggregate([
      { $match: { walletId } },
      {
        $group: {
          _id: "$walletId",
          totalAmount: { $sum: "$amount" },
        },
      },
    ]);
    const totalAmount =
      totalbalance.length > 0 ? totalbalance[0].totalAmount : 0;

    res.status(200).json({
      success: true,
      message: "Total balance fetched",
      totalAmount,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getPortfolioChangeController = async (req, res) => {
  try {
    const PortfolioChange = await getPortfolioChangeService(req.user.walletId);
    res.status(200).json({ success: true, ...PortfolioChange });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
