import User from "../models/user.js";
import {
  isProduction,
  jwtSecretKey,
  senderEmail,
} from "../utils/constaints.js";
import { encPassword, verifyPassword } from "../utils/password.js";
import jwttoken from "jsonwebtoken";
import transporter from "../utils/nodemailer.js";

//getUsers
const getUsers = async (req, res) => {
  return res.json({ msg: "all users data!" });
};

//signUp
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "username email password is required" });
  }

  const existingUserQuery = await User.findOne({ email });
  if (existingUserQuery) {
    return res.json({ success: false, message: "User already Exists" });
  }

  try {
    const hashPassword = await encPassword(password);
    const credential = { username, email, password: hashPassword };

    const newUser = await User.create(credential);

    const userObject = newUser.toObject();
    delete userObject.password;

    const token = jwttoken.sign(userObject, jwtSecretKey, {
      expiresIn: 10 * 24 * 60 * 60,
    });

    res.cookie("token", token, {
      MaxAge: 10 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strict" : "Lax",
    });

    const emailOption = {
      from: senderEmail,
      to: email,
      subject: "welcome to development mode Raza ",
      text: `welcome to gulistaneraza website.your account is been created by ${email}`,
      html: "<b>Hello world?</b>",
    };
    await transporter.sendMail(emailOption);

    return res.status(201).json({ success: true, message: "user created" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "user credential is required!" });
  }

  try {
    const userdata = await User.findOne({ email });
    if (!userdata) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isMatch = await verifyPassword(password, userdata.password);
    if (isMatch) {
      const userObj = userdata.toObject();
      delete userObj.password;

      const token = jwttoken.sign(userObj, jwtSecretKey, {
        expiresIn: "7d",
      });
      res.cookie("token", token, {
        MaxAge: 7 * 24 * 60 * 60 * 100,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "Strict" : "Lax",
      });
      return res.status(200).json({
        success: true,
        message: "successful user login",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "wrong password" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "Strict" : "Lax",
    });
    return res.json({ success: true, message: "succesful logout!" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export { getUsers, signUp, login, logout };
