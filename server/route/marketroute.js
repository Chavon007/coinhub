import express from "express";
import { getmarketMover } from "../controller/marketcontroller.js";
// import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/get-market-movers", getmarketMover);

export default router;
