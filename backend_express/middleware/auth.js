// middleware/auth.js
import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const header = req.headers.authorization || req.headers.Authorization;
  if (!header) return res.status(401).json({ message: "No token provided" });

  const token = header.startsWith("Bearer ") ? header.split(" ")[1] : header;

  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // attach minimal user info to req
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    console.error("JWT verify error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
