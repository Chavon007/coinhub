import express from "express";

import { createAccount, loginUser, verifyOtp } from "../controller/auth.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginUser);
router.post("/verify-otp", verifyOtp);

export default router;
