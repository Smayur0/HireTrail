import { Request, Response, NextFunction } from "express";
import { StatsService } from "../services/stats.service.js";

const statsService = new StatsService();

export const getJobStats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const stats = await statsService.getJobStats(userId);

    res.json({ stats });
  } catch (error) {
    next(error);
  }
};
