import { Router } from "express";
import { getSavedEmails } from "../controller/emails.controller.js";
import { authorizationToken } from "../middleware/index.js";

const router = Router();

router.get("/", authorizationToken, getSavedEmails);

export default router;
