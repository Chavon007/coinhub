import express from "express";
// import { authMiddleware } from "../middleware/authMiddleware";
import { getAIInsight, generalNews } from "../controller/insightcontroller.js";

const router = express.Router();

router.get("/news-insight", generalNews);
router.get("/insight/:coin", getAIInsight);

export default router;
