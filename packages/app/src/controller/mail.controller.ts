import { Request, Response, NextFunction } from "express";
import { MailService } from "../services/mail.service.js";

export const getAllMails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const refreshToken = (req as any).user.refreshToken;
    
    if (!refreshToken) {
      return res.status(400).json({ error: "Refresh token is missing. Please re-login." });
    }

    const mailservice = new MailService(refreshToken);
    const emails = await mailservice.getMailsList({ maxResults: 200 });
    const parsed = await Promise.all(emails.map((e) => mailservice.parseEmail(e)));
    await mailservice.saveMails(userId, parsed);

    res.json({
      success: true,
      count: parsed.length,
      message: `Successfully fetched and saved ${parsed.length} emails`,
    });
  } catch (error) {
    next(error);
  }
};

export const getSavedEmails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 200;
    const offset = parseInt(req.query.offset as string) || 0;

    const mailService = new MailService();
    const result = await mailService.getSavedEmails(userId, limit, offset);

    res.json(result);
  } catch (error) {
    next(error);
  }
};
