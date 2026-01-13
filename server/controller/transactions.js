import Transaction from "../model/transaction.js";
import Walletbalance from "../model/walletbalance.js";
import axios from "axios";

export const createTransactions = async (req, res) => {
  try {
    const walletId = req.user.walletId;

    const { coin, type, amount } = req.body;

    if (!coin || !type || !amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid transaction details" });
    }

    //get current balance in a wallet
    const balance = await Walletbalance.findOne({ walletId, coin });
    const currentAmount = balance ? balance.amount : 0;

    // check if user have enough balance to sell

    if (type === "SELL" && amount > currentAmount) {
      return res.status(400).json({
        success: false,
        message: "Sorry, you do not have enough balance",
      });
    }

    // check current price on coin in the market

    const { data: priceData } = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price",
      {
        params: {
          ids: coin,
          vs_currencies: "usd",
        },
      }
    );

    if (!priceData[coin]) {
      return res.status(400).json({
        success: false,
        message: "Unable to fetch coin price",
      });
    }
    const priceAtTrade = data[coin].usd;

    // create transaction

    const Transactions = await Transaction.create({
      walletId,
      coin,
      type,
      amount,
      priceAtTrade,
    });

    // update walletbalance

    let newAmount = currentAmount;

    if (type === "BUY") newAmount += amount;
    if (type === "SELL") newAmount -= amount;

    if (balance) {
      balance.amount = newAmount;
      await balance.save();
    } else {
      await Walletbalance.create({ walletId, coin, amount: newAmount });
    }
    res
      .status(201)
      .json({ success: true, message: "Transaction successful", Transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
