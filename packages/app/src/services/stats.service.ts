import prisma from "../utils/prismaConnection.js";

export class StatsService {
  async getJobStats(userId: string) {
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

    return {
      applied,
      rejected,
      interview,
      total,
    };
  }
}
