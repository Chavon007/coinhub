import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { portfolio } from "../controller/portfolio";

const router = express.Router();

router.get("/portfolio", authMiddleware, portfolio);

export default router;
