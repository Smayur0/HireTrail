import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/auth.service.js";

const authservice = new AuthService();

//google login
export const googleLogin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const url = authservice.generateAuthUrl();
  //redirect url
  res.redirect(url);
};

//google response back
export const googleCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { code } = req.query;
    if (!code || typeof code !== "string") {
      return res.status(400).json({ error: "Auth code is required" });
    }
    const tokens = await authservice.exchangeCodeForTokens(code);
    const userInfo = await authservice.getUserInfo(tokens.access_token);

    const saveUpdateUser = await authservice.createOrUpdateUser(
      userInfo,
      tokens
    );
    const jwtToken = authservice.generateJWT(saveUpdateUser);

    return res.json({ user: saveUpdateUser, token: jwtToken });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
};
