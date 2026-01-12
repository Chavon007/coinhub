import axios from "axios";
import transaction from "../model/transaction";
import walletbalance from "../model/walletbalance";

export const portfolio = async (req, res) => {
  try {
    const walletId = req.user.walletId;

    //get transaction

    const transactions = await transaction.find({ walletId });

    if (!transactions.length) {
      return res.status(200).json({
        success: false,
        totalValue: 0,
        totalInvested: 0,
        totalPnL: 0,
        pnlPercentage: 0,
        holdings: [],
      });
    }

    // group by coin
    const coinMap = {};
    transactions.forEach((t) => {
      if (!coinMap[t.coin]) coinMap[t.coin] = { amount: 0, invested: 0 };

      if (t.type === "BUY") {
        coinMap[t.coin].amount += t.amount;
        coinMap[t.coin].invested += t.amount * t.priceAtTrade;
      } else if (t.type === "SELL") {
        coinMap[t.coin].amount -= t.amount;
        coinMap[t.coin].invested -=
          (coinMap[t.coin].invested / coinMap[t.coin].amount) * t.amount;
      }
    });

    // fetch current price
    const coins = Object.keys(coinMap).join(",");
    const { data: priceData } = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=usd`
    );

    // calculate per-coin value
    let totalValue = 0;
    let totalInvested = 0;
    const holdings = [];

    for (const coin of Object.keys(coinMap)) {
      const currentPrice = priceData[coin]?.usd || 0;
      const { amount, invested } = coinMap[coin];
      const value = amount * currentPrice;
      const pnl = value - invested;
      const pnlPercentage = invested ? (pnl / invested) * 100 : 0;

      totalValue += value;
      totalInvested += invested;

      holdings.push({
        coin,
        amount,
        pnl,
        pnlPercentage: pnlPercentage.toFixed(2),
        totalValue: value,
        currentPrice,
        invested,
      });
    }

    //overall portfolio pnl

    const totalPnl = totalValue - totalInvested;
    const pnlPercentage = totalInvested ? (totalPnl / totalInvested) * 100 : 0;
    res.status(200).json({
      success: true,
      totalInvested,
      totalPnl,
      totalValue,
      pnlPercentage: pnlPercentage.toFixed(2),
      holdings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
