const User = require("../models/User");

let jwt;
try {
  jwt = require("jsonwebtoken");
} catch (e) {
  jwt = null;
}

const JWT_SECRET = process.env.JWT_SECRET || "taskflow_super_secret_jwt_key_2026";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      let decodedId;
      if (jwt) {
        const decoded = jwt.verify(token, JWT_SECRET);
        decodedId = decoded.id;
      } else {
        const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        decodedId = payload.id;
      }

      req.user = await User.findById(decodedId).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "User not found with this token" });
      }

      return next();
    } catch (error) {
      console.error("Auth Middleware Error:", error.message);
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};

module.exports = { protect };
