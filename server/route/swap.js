import express from "express";
import { swapCoin } from "../controller/swapCntroller";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/swap", authMiddleware, swapCoin);

export default router;
