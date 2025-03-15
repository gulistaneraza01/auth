import { Router } from "express";
import {
  isAuth,
  login,
  logout,
  sendOtp,
  signUp,
  verifyOtp,
  resetPassword,
  verifyResetOtp,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);
router.post("/isauth", authenticate, isAuth);
router.post("/sendotp", authenticate, sendOtp);
router.post("/verifyotp", authenticate, verifyOtp);
router.post("/resetpassword", authenticate, resetPassword);
router.post("/verifyresetotp", authenticate, verifyResetOtp);

export default router;
