import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { aiCoinInsight } from "../controller/coinInsightController.js";

const route = express.Router();

route.get("/coininsight/:coinId/:ticker", authMiddleware, aiCoinInsight);
