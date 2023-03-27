import jwt from "jsonwebtoken";
import ENV from "../config.js";
// auth midleware
export const Auth = async (req, res, next) => {
  try {
    // auth headers
    const token = req.headers.authorization.split(" ")[1];
    const decodedtoken = await jwt.verify(token, ENV.JWT_SECRET);
    req.user = decodedtoken;
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

export const localVariables = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};
