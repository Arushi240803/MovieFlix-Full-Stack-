const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    // Remove "Bearer " if present
    const cleanToken = token.replace("Bearer ", "");

    // Verify token
    const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);

    // Attach user info to request
    req.user = decoded;

    next(); // allow access to route

  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;