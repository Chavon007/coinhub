import express from "express";
import { createTransactions } from "../controller/transactions";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/tranasction", authMiddleware, createTransactions);

export default router;
