import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { aiCoinInsight } from "../controller/coinInsightController.js";

const route = express.Router();

route.get("/coininsight/:coinId/:ticker", authMiddleware, aiCoinInsight);


export default route