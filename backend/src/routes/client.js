import { Router } from "express";
import { getUser } from "../controllers/client.js";
import authenticate from "../middlewares/authenticate.js";

const router = Router();

router.get("/getuser", authenticate, getUser);

export default router;
