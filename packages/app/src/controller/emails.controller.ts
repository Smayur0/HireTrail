import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaConnection.js";

export const getSavedEmails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const limit = parseInt(req.query.limit as string) || 200;
    const offset = parseInt(req.query.offset as string) || 0;

    const emails = await prisma.mailMessage.findMany({
      where: { userId },
      orderBy: { internalDate: "desc" },
      take: limit,
      skip: offset,
      select: {
        id: true,
        gmailMessageId: true,
        fromEmail: true,
        subject: true,
        snippet: true,
        internalDate: true,
        parsedStatusHint: true,
        parsedCompany: true,
        parsedJobTitle: true,
      },
    });

    const total = await prisma.mailMessage.count({
      where: { userId },
    });

    res.json({
      emails,
      total,
      limit,
      offset,
    });
  } catch (error) {
    next(error);
  }
};
