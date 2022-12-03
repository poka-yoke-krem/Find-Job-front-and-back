const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentification invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const testUser = payload.userId === "637d254391213f2a6c75c225";
    req.user = { userId: payload.userId, testUser };
    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentification invalid");
  }
};

module.exports = auth;
