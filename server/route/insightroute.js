import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware";
import { getAIInsight } from "../controller/insightcontroller.js";

const router = express.Router();

router.get("/insight/:coin", getAIInsight);

export default router;
