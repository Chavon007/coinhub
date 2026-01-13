import express from "express";
import { createTransactions } from "../controller/transactions.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/transaction", authMiddleware, createTransactions);

export default router;
