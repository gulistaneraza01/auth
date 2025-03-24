import User from "../models/user.js";
import {
  isProduction,
  jwtSecretKey,
  senderEmail,
} from "../utils/constaints.js";
import { encPassword, verifyPassword } from "../utils/password.js";
import jwttoken from "jsonwebtoken";
import transporter from "../utils/nodemailer.js";
import isExpired from "../utils/isExpired.js";
import { EMAIL_VERIFY_TEMPLATE } from "../utils/emailTemplates.js";

//isAuthenticate
const isAuth = async (req, res) => {
  try {
    return res.json({ success: true, message: "user authoized" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//profile
const profile = async (req, res) => {
  const userId = req.userId;
  try {
    const userInfo = await User.findById(userId);
    return res.json({ success: true, user: userInfo });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
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
    return res
      .status(400)
      .json({ success: false, message: "User already Exists" });
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
      // text: `welcome to gulistaneraza website.your account is been created by ${email}`,
      html: `<h3>welcome to gulistaneraza website.your account is been created by ${email}</h3>`,
    };
    await transporter.sendMail(emailOption);

    return res.status(201).json({
      success: true,
      message: "user created",
      user: { id: userObject._id, email: userObject.email },
    });
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
      return res.status(400).json({ success: false, message: "Invalid email" });
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
        user: { id: userObj._id, email: userObj.email },
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

//logout
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

//sendOtp
const sendOtp = async (req, res) => {
  const userId = req.userId;

  try {
    const userInfo = await User.findById(userId);

    if (userInfo.isAccountVerify) {
      return res
        .status(400)
        .json({ success: false, message: "account already verify!" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000) + "";
    userInfo.verifyOtp = otp;
    userInfo.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;
    await userInfo.save();

    const emailOption = {
      from: senderEmail,
      to: userInfo.email,
      subject: "Email Verification Code",
      html: `${EMAIL_VERIFY_TEMPLATE.replace("{{otp}}", otp).replace(
        "{{email}}",
        userInfo.email
      )}`,
    };

    await transporter.sendMail(emailOption);

    return res.json({ success: true, message: "otp sented to your email!" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//verifyOtp
const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const userId = req.userId;

  if (!otp) {
    return res.status(400).json({ success: false, message: "otp is required" });
  }

  try {
    const userInfo = await User.findById(userId);

    if (userInfo.isAccountVerify) {
      return res
        .status(400)
        .json({ success: false, message: "already verifyed!" });
    }

    const isExpiredOtp = isExpired(userInfo.verifyOtpExpireAt);
    if (isExpiredOtp) {
      return res
        .status(400)
        .json({ success: false, message: "otp expired! genrate new otp" });
    }

    if (otp === userInfo.verifyOtp) {
      userInfo.isAccountVerify = true;
      userInfo.verifyOtp = "";
      userInfo.verifyOtpExpireAt = 0;
      await userInfo.save();

      return res.json({
        success: true,
        message: "successfull verify your email",
      });
    } else {
      return res.status(400).json({ success: false, message: "wrong otp!!" });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//sendresetPasswordOtp
const resetPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res
      .status(400)
      .json({ success: false, message: "messing user email field" });
  }

  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exists" });
    }

    if (!userInfo.isAccountVerify) {
      return res
        .status(400)
        .json({ success: false, message: "first verify your email!" });
    }

    const resetOtp = Math.floor(1000 + Math.random() * 9000) + "";
    userInfo.resetOtp = resetOtp;
    userInfo.verifyResetExpireAt = Date.now() + 15 * 60 * 1000;
    userInfo.save();

    const emailOption = {
      from: senderEmail,
      to: userInfo.email,
      subject: "Email Reset Verification Code",
      html: `
        ${PASSWORD_RESET_TEMPLATE.replace("{{otp}}", resetOtp)}
      `,
    };
    await transporter.sendMail(emailOption);

    return res.json({
      success: true,
      message: "sended your reset otp to your Email",
      resetOtp,
    });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

//verifyResetOtp
const verifyResetOtp = async (req, res) => {
  const { email, resetOtp, newPassword } = req.body;

  if (!resetOtp || !email || !newPassword) {
    return res
      .status(400)
      .json({ success: false, message: "missing reset otp" });
  }

  try {
    const userInfo = await User.findOne({ email });

    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exists" });
    }

    if (!userInfo.isAccountVerify) {
      return res
        .status(400)
        .json({ success: false, message: "first verify your email!" });
    }

    const expiredResetOtp = isExpired(userInfo.verifyResetExpireAt);
    if (expiredResetOtp) {
      return res
        .status(400)
        .json({ success: false, message: "your reset otp is expired!" });
    }

    if (resetOtp === userInfo.resetOtp) {
      const hashPassword = await encPassword(newPassword);
      userInfo.password = hashPassword;
      userInfo.resetOtp = "";
      userInfo.verifyResetExpireAt = 0;
      userInfo.save();

      return res.json({
        success: true,
        message: "your password is succesfuly updated",
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "wrong reset otp" });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export {
  isAuth,
  profile,
  signUp,
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
  verifyResetOtp,
};
