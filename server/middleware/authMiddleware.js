import { verifyToken } from "../utliz/token.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res
        .status(404)
        .json({ success: false, message: "User not authenticated" });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
