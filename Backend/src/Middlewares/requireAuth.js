const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

function parseToken(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  return null;
}

const requireAuth = (req, res, next) => {
  try {
    const token = parseToken(req);
    if (!token) return res.status(401).json({ message: "No autenticado" });
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload; // { uid, correo, nombre, iat, exp, iss }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

module.exports = { requireAuth };