import express from "express";
import {
  getEachCoinBalance,
  CoinBalance,
  getTotalBalance,
  getPortfolioChangeController,
} from "../controller/walletbalance.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/total-balance", authMiddleware, getTotalBalance);
router.get("/coin-balance", authMiddleware, getEachCoinBalance);
router.get("/coin-balance/:coin", authMiddleware, CoinBalance);
router.get("/portfolio-change", authMiddleware, getPortfolioChangeController);
export default router;
