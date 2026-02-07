import { Router } from "express";
import { getJobStats } from "../controller/stats.controller.js";
import { authorizationToken } from "../middleware/index.js";

const router = Router();

router.get("/", authorizationToken, getJobStats);

export default router;
