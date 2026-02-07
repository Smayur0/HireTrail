import { Request, Response, NextFunction } from "express";
import prisma from "../utils/prismaConnection.js";

export const getJobStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;

    // Get counts for each job status
    const [applied, rejected, interview, total] = await Promise.all([
      prisma.jobApplication.count({
        where: { userId, status: "APPLIED", isDeleted: false },
      }),
      prisma.jobApplication.count({
        where: { userId, status: "REJECTED", isDeleted: false },
      }),
      prisma.jobApplication.count({
        where: { userId, status: "INTERVIEW", isDeleted: false },
      }),
      prisma.jobApplication.count({
        where: { userId, isDeleted: false },
      }),
    ]);

    res.json({
      stats: {
        applied,
        rejected,
        interview,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};
