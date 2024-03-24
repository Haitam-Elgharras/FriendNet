import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      // 401 Unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.substring(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      // 401 Unauthorized
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
