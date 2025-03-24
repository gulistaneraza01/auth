import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../utils/constaints.js";
import User from "../models/user.js";

const authenticate = async (req, res, next) => {
  const { token } = req.cookies;
  try {
    const userToken = jwt.verify(token, jwtSecretKey);
    const user = await User.findById(userToken._id);

    if (user._id) {
      req.userId = user._id;
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        message: "authentication is required",
        error: error.message,
      });
  }
};

export default authenticate;
