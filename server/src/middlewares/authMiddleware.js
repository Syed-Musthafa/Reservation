import { decodeToken } from "../utils/jwtUtils.js";
import { pool } from "../config/database.js";

async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const [_, token] = authHeader.split(" ");

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const data = decodeToken(token);

  const { userId } = data.payload;

  const [[user]] = await pool.execute("SELECT * FROM users WHERE id = ?", [
    userId,
  ]);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  req.user = user;

  next();
}

export { authMiddleware };
