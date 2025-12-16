import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import cors from "cors";
import dbConfig from "./config/database.js";

import marketMoverRoute from "./route/marketroute.js";
import authRoutes from "./route/auth.js";
import walletRoute from "./route/wallet.js";

dotenv.config();

dbConfig();
const app = express();

app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
const PORT = 4000;

app.use("/api", authRoutes);
app.use("/api", walletRoute);
app.use("/api", marketMoverRoute);
app.get("/", (req, res) => {
  res.send("ConinHub backend is running");
});
app.listen(PORT, () => {
  console.log(`Server is runing on port http://localhost:${PORT}`);
});
