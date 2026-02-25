import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  aiCoinInsight,
  aiCoinInsightAll,
} from "../controller/coinInsightController.js";
import limiter from "../utliz/mainRateLimiter.js";
const route = express.Router();

route.get(
  "/coininsight/:coinId/:ticker",
  authMiddleware,
  limiter,
  aiCoinInsight,
);

route.get("/coininsight/all", authMiddleware, limiter, aiCoinInsightAll);

export default route;
