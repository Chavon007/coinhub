import mongoose from "mongoose";
import swap from "../model/swap.js";
import wallet from "../model/wallet.js";
import walletbalance from "../model/walletbalance.js";
import {
  fetchExchangeRate,
  calculateExchageRate,
} from "../services/marketservice.js";

export const swapCoin = async (req, res) => {
  // create a session

  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user.id;

    const { fromCoin, toCoin, fromAmount } = req.body;

    if (!fromAmount || !fromCoin || !toCoin) {
      return res
        .status(403)
        .json({ success: false, message: "Please fill all required area" });
    }

    // You can't swap same coin
    if (fromCoin === toCoin) {
      return res
        .status(400)
        .json({ success: false, message: "Can't sawp same coin" });
    }
    // Ensure user enter right amount
    if (fromAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Amount" });
    }

    // Get user wallet
    const userWallet = await wallet.findOne({ userId }).session(session);

    if (!userWallet) {
      return res
        .status(400)
        .json({ success: false, message: "Wallet not found" });
    }

    // check balance
    const fromBalance = await walletbalance
      .findOne({
        walletId: userWallet._id,
        coin: fromCoin,
      })
      .session(session);

    if (!fromBalance || fromBalance.amount < fromAmount) {
      return res
        .status(400)
        .json({ success: false, message: `Insufficient ${fromCoin} balance` });
    }

    let toBalance = await walletbalance
      .findOne({ walletId: userWallet._id, coin: toCoin })
      .session(session);

    // Get real exchange rate

    const price = await fetchExchangeRate();
    const exchangeRate = calculateExchageRate(price, fromCoin, toCoin);
    const toAmount = fromAmount * exchangeRate;

    // update balance
    fromBalance.amount -= fromAmount;
    await fromBalance.save({ session });

    // Add to destination coin
    if (toBalance) {
      toBalance.amount += toAmount;
      await toBalance.save({ session });
    } else {
      toBalance = await walletbalance.create(
        [
          {
            walletId: userWallet._id,
            coin: toCoin,
            amount: toAmount,
          },
        ],
        { session },
      );
    }

    // create swap record

    const newSwap = await swap.create(
      [
        {
          walletId: userWallet._id,
          userId: userId,
          from_coin: fromCoin,
          to_coin: toCoin,
          from_amount: fromAmount,
          to_amount: toAmount,
          exchange_rate: exchangeRate,
          status: "Completed",
        },
      ],
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Swap successful",
      data: newSwap[0],
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: err.message });
  }
};
