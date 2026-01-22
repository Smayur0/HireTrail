import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prismaConnection.js";
import { UserToken } from "../utils/types/index.js";

export const authorizationToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 1. Get token from headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        status: "Failed",
        message: "Authorization token required",
      });
    }

    // 2. Extract token (remove "Bearer " if present)
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    // 3. Verify token
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    const user = await prisma.user.findUnique({
      where: {
        id: (data as any)?.id,
      },
    });
    console.log("user token check", user);
    // 4. Attach user data to request object
    (req as any).user = user;

    // 5. Continue to next middleware/route
    console.log("request with user json", (req as any).user);
    return next();
  } catch (error) {
    return res.status(401).json({
      status: "Failed",
      message: "Token malformed or expired",
    });
  }
};
