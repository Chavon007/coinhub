import mongoose from "mongoose";
import swap from "../model/swap.js";
import wallet from "../model/wallet.js";
import walletbalance from "../model/walletbalance.js";
import {
  fetchExchangeRate,
  calculateExchageRate, 
} from "../services/marketservice.js";


// Read-only — no DB writes. Called on every input change.
export const swapPreview = async (req, res) => {
  try {
    const { fromCoin, toCoin, fromAmount } = req.query;

    if (!fromCoin || !toCoin || !fromAmount)
      return res.status(400).json({ success: false, message: "fromCoin, toCoin and fromAmount are required" });

    if (fromCoin === toCoin)
      return res.status(400).json({ success: false, message: "Cannot swap a coin for itself" });

    const amount = Number(fromAmount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const prices = await fetchExchangeRate();
    const exchangeRate = calculateExchageRate(prices, fromCoin, toCoin);

    return res.status(200).json({
      success: true,
      exchangeRate,
      toAmount: amount * exchangeRate,
      priceImpact: Math.min(amount * 0.0001, 5), 
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/swap
export const swapCoin = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const userId = req.user.id;
    const { fromCoin, toCoin, fromAmount, slippageTolerance } = req.body;

    if (!fromAmount || !fromCoin || !toCoin)
      return res.status(400).json({ success: false, message: "Please fill all required fields" }); 

    if (fromCoin === toCoin)
      return res.status(400).json({ success: false, message: "Cannot swap a coin for itself" }); 

    const amount = Number(fromAmount);
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ success: false, message: "Invalid amount" });

    const userWallet = await wallet.findOne({ userId }).session(session);
    if (!userWallet)
      return res.status(404).json({ success: false, message: "Wallet not found" });

    const fromBalance = await walletbalance
      .findOne({ walletId: userWallet._id, coin: fromCoin })
      .session(session);

    if (!fromBalance || fromBalance.amount < amount)
      return res.status(400).json({ success: false, message: `Insufficient ${fromCoin} balance` });

    let toBalance = await walletbalance
      .findOne({ walletId: userWallet._id, coin: toCoin })
      .session(session);

    const prices = await fetchExchangeRate();
    const exchangeRate = calculateExchageRate(prices, fromCoin, toCoin);
    const toAmount = amount * exchangeRate;

    // Slippage guard — reject if price moved beyond user's tolerance since preview
    if (req.body.expectedRate) {
      const drift = Math.abs(exchangeRate - req.body.expectedRate) / req.body.expectedRate;
      const slippage = Number(slippageTolerance ?? 0.5);
      if (drift * 100 > slippage)
        return res.status(400).json({
          success: false,
          message: `Price moved ${(drift * 100).toFixed(2)}% — beyond your ${slippage}% slippage tolerance. Please retry.`,
        });
    }

    fromBalance.amount -= amount;
    await fromBalance.save({ session });

    if (toBalance) {
      toBalance.amount += toAmount;
      await toBalance.save({ session });
    } else {
      [toBalance] = await walletbalance.create(
        [{ walletId: userWallet._id, coin: toCoin, amount: toAmount }],
        { session }
      );
    }

    const [newSwap] = await swap.create(
      [{ walletId: userWallet._id, userId, from_coin: fromCoin, to_coin: toCoin, from_amount: amount, to_amount: toAmount, exchange_rate: exchangeRate, status: "Completed" }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ success: true, message: "Swap successful", data: newSwap });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ success: false, message: err.message });
  }
};