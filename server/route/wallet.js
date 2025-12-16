import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createWallet, deleteWallet, getWallet } from "../controller/wallet.js";

const router = express.Router();

router.post("/create-wallet", authMiddleware, createWallet);
router.get("/get-wallet", authMiddleware, getWallet);
router.delete("/delete-wallet", authMiddleware, deleteWallet);

export default router;
