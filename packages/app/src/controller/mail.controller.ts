import { Request, Response, NextFunction } from "express";
import { MailService } from "../services/mail.service.js";

export const getAllMails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = (req as any).user.refreshToken;
    console.log("token", token);
    const mailservice = new MailService(token);
    const emails = await mailservice.getMailsList({ maxResults: 200 });
    //  const emails = await gmailService.fetchInboxEmails({ maxResults: 200 });
    const parsed = emails.map((e) => mailservice.parseEmail(e));
    await mailservice.saveMails((req as any).user.id, parsed);

    // return res.json({ count: mailList.length, mailList });
    // console.log("mailList", mailList);
    // res.json(mailList);
  } catch (error) {
    next(error);
  }
};
