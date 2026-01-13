import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { portfolio } from "../controller/portfolio.js";

const router = express.Router();

router.get("/portfolio", authMiddleware, portfolio);

export default router;
