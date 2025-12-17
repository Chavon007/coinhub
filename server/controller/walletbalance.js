import Balance from "../model/walletbalance.js";

// Get balnace for each coin

export const getCoinBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const balanceCoin = await Balance.find({ userId, coin, amount });
    if (!balanceCoin) {
      return res
        .status(400)
        .json({ succces: false, message: "Balnace is empty" });
    }
    res
      .status(200)
      .json({ success: true, message: "Balnace fetched successfully" balanceCoin });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to get the coin balance" });
  }
};
