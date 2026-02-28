import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Too many requests. Please wait a bit",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default limiter;
