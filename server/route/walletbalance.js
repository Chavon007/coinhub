import express from "express";
import {
  getEachCoinBalance,
  CoinBalance,
  getTotalBalance,
} from "../controller/walletbalance";

import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/total-balance", authMiddleware, getTotalBalance);
router.get("/coin-balance", authMiddleware, getEachCoinBalance);
router.get("/coin-balance/:coin", authMiddleware, CoinBalance);

export default router;
