import express from "express";

import { createAccount, loginUser } from "../controller/auth.js";

const router = express.Router();

router.post("/create-account", createAccount);
router.post("/login", loginUser);

export default router;
