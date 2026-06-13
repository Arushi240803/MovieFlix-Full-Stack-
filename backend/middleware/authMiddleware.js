const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const cleanToken = token.replace("Bearer ", "");

    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    // Normalize user object (IMPORTANT FIX)
    req.user = {
      id: decoded.id || decoded.userId
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;