import express from "express";
import { swapCoin, swapPreview } from "../controller/swapController.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/swap-preview", authMiddleware, swapPreview); 
router.post("/swap", authMiddleware, swapCoin);

export default router;