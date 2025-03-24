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
  profile,
} from "../controllers/auth.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/isauth", authenticate, isAuth);
router.get("/profile", authenticate, profile);
router.post("/logout", logout);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/sendotp", authenticate, sendOtp);
router.post("/verifyotp", authenticate, verifyOtp);
router.post("/resetpassword", authenticate, resetPassword);
router.post("/verifyresetotp", authenticate, verifyResetOtp);

export default router;
