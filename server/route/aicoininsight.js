import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { aiCoinInsight } from "../controller/coinInsightController.js";
import limiter from "../utliz/mainRateLimiter.js";
const route = express.Router();

route.get(
  "/coininsight/:coinId/:ticker",
  authMiddleware,
  limiter,
  aiCoinInsight,
);

export default route;
