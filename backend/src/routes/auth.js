import { Router } from "express";
import { getUsers, login, logout, signUp } from "../controllers/auth.js";

const router = Router();

router.get("/", getUsers);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
