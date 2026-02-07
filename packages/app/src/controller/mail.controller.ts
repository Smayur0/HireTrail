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
    const parsed = emails.map((e) => mailservice.parseEmail(e));
    await mailservice.saveMails((req as any).user.id, parsed);

    res.json({
      success: true,
      count: parsed.length,
      message: `Successfully fetched and saved ${parsed.length} emails`,
    });
  } catch (error) {
    next(error);
  }
};
