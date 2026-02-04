import { Router } from "express";
import { googleCallback, googleLogin, me } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);
router.get("/me", authMiddleware, me);

export default router;
