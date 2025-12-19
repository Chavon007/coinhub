import Wallet from "../model/wallet.js";
import User from "../model/auth.js";
//create wallet

export const createWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ethereum, bitcoin, solana, ripple, mnemonic } = req.body;

    if (!ethereum || !bitcoin || !solana || !ripple || !mnemonic) {
      return res
        .status(400)
        .json({ success: false, message: "Miising wallet data" });
    }

    const existingWallet = await Wallet.findOne({ userId });
    if (existingWallet) {
      return res.status(400).json({
        success: false,
        message: "Wallet already exists",
      });
    }
    const newWallet = await Wallet.create({
      userId,
      ethereum,
      bitcoin,
      solana,
      ripple,
      mnemonic,
    });

    await User.findByIdAndUpdate(userId, { walletId: newWallet._id });
    res.status(200).json({
      success: true,
      message: "Wallet created successfully",
      wallet: {
        ethereum: newWallet.ethereum,
        bitcoin: newWallet.bitcoin,
        solana: newWallet.solana,
        ripple: newWallet.ripple,
        userId: newWallet.userId,
        mnemonic: newWallet.mnemonic,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create wallet" });
  }
};

export const getWallet = async (req, res) => {
  try {
    const userId = req.user.id;

    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res
        .status(404)
        .json({ success: false, message: "Wallet does not exist" });
    }
    res.status(200).json({
      success: true,
      message: "Wallet fetched successfully",
      wallet,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to get Wallet" });
  }
};

export const deleteWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const removeWallet = await Wallet.deleteOne({ userId });
    if (removeWallet.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No wallet found to delete",
      });
    }
    res
      .status(200)
      .json({ success: true, message: "Wallet deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete wallet" });
  }
};
