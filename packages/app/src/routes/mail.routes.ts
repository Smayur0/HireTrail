import { Router } from "express";
import { getAllMails, getSavedEmails } from "../controller/mail.controller.js";
import { authorizationToken } from "../middleware/index.js";

const router = Router();

router.get("/allmails", authorizationToken, getAllMails);
router.get("/saved", authorizationToken, getSavedEmails);

export default router;
