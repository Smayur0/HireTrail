import { Router } from "express";
import { getAllMails } from "../controller/mail.controller.js";
import { authorizationToken } from "../middleware/index.js";

const router = Router();

router.get("/allmails", authorizationToken, getAllMails);
// router.get("/mail/id", getMailById)

export default router;
