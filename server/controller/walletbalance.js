import Balance from "../model/walletbalance.js";

// Get balnace for coin

export const getEachCoinBalance = async (req, res) => {
  try {
    const walletId = req.user.walletId;

    const balanceCoin = await Balance.find({ walletId });
    if (balanceCoin.length === 0) {
      return res
        .status(400)
        .json({ succces: false, message: "no balance found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Balnace fetched successfully",
        balanceCoin,
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
      return res
        .status(404)
        .json({ success: false, message: "No balance found" });
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
    if (totalbalance.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Balance found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Total balance fetched",
        totalbalance: totalbalance[0].totalAmount,
      });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
