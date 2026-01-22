import { Router } from "express";
import { googleCallback, googleLogin } from "../controller/auth.controller.js";

const router = Router();

router.get("/google", googleLogin);
router.get("/google/callback", googleCallback);

export default router;
