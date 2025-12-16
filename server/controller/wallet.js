import Wallet from "../model/wallet.js";

//create wallet

export const createWallet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { ethereum, bitcoin, solana, ripple } = req.body;

    if (!ethereum || !bitcoin || !solana || !ripple) {
      return res
        .status(400)
        .json({ success: false, message: "Miising wallet data" });
    }

    const newWallet = await Wallet.create({
      userId,
      ethereum,
      bitcoin,
      solana,
      ripple,
    });

    res.status(200).json({
      success: true,
      message: "Wallet created successfully",
      wallet: newWallet,
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

    const user = await Wallet.findById({ userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }
    res
      .status(200)
      .json({ success: true, message: "Wallet fetched successfully" });
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
