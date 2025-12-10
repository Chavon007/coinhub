import express from "express";
import dotenv from "dotenv";
import cookies from "cookie-parser";
import cors from "cors";
import dbConfig from "./config/database";

dotenv.config();

dbConfig();
const app = express();

app.use(cookies());
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

app.use(express.json());
const PORT = 4000;

app.get("/", (req, res) => {
  res.send("ConinHub backend is running");
});
app.listen(PORT, () => {
  console.log(`Server is runing on port http://localhost:${PORT}`);
});
