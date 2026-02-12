import swap from "../model/swap";

export const swapCoin = async (req, res) => {
  try {
    const userId = req.user.id;

    const { fromCoin, toCoin, fromAmount, toAmount, exchangeRate } = req.body;

    if (!fromAmount || !fromCoin || !toCoin || !toAmount || !exchangeRate) {
      res
        .status(403)
        .json({ success: false, message: "Please fill all required area" });
    }

    const 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
