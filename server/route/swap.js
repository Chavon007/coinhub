import express from "express";
import { swapCoin } from "../controller/swapCntroller.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/swap", authMiddleware, swapCoin);

export default router;
