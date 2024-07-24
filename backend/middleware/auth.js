require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).send({ message: "Access denied. No token provided." });
  }

  const token = authHeader.replace("Bearer ", "");
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ message: "Invalid token" });
  }
};

module.exports = auth;
