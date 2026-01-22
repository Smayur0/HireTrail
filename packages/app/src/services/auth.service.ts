import { google, GoogleApis } from "googleapis";
import { GoogleTokens, GoogleUserInfo } from "../utils/types/index.js";
import prisma from "../utils/prismaConnection.js";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET!;

const SCOPES = [
  "openid",
  "email",
  "profile",
  "https://www.googleapis.com/auth/gmail.readonly",
];

export class AuthService {
  private oauth2Client: any;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URL
    );
  }
  // Step 1: Generate Google consent URL
  generateAuthUrl(): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent",
    });
  }

  // Step 2: Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string): Promise<GoogleTokens> {
    try {
      const { tokens } = await this.oauth2Client.getToken(code);
      return tokens as GoogleTokens;
    } catch (error) {
      throw new Error("failed to exchange token ");
    }
  }

  async getUserInfo(accessToken: string): Promise<GoogleUserInfo> {
    try {
      this.oauth2Client.setCredentials({ access_token: accessToken });

      const oauth2 = google.oauth2({ version: "v2", auth: this.oauth2Client });
      const { data } = await oauth2.userinfo.get();

      if (!data?.id || !data.email) {
        throw new Error("Invalid user data from Google");
      }
      return {
        id: data?.id!,
        email: data?.email!,
        name: data?.name!,
        picture: data?.picture!,
      };
    } catch (error) {
      throw new Error("Filed to fetch user info from google");
    }
  }

  async createOrUpdateUser(userInfo: GoogleUserInfo, tokens: GoogleTokens) {
    try {
      const user = await prisma.user.upsert({
        where: { googleId: userInfo.id },
        update: {
          email: userInfo.email,
          name: userInfo.name,
          refreshToken: tokens.refresh_token || null,
          updatedAt: new Date(),
        },
        create: {
          googleId: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          refreshToken: tokens.refresh_token || null,
        },
      });

      return user;
    } catch (error) {
      throw new Error(`Failed to save user:${error}`);
    }
  }

  generateJWT(user: {
    id: string;
    email: string;
    name: string;
    googleId: string;
  }): string {
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      googleId: user.googleId,
    };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
    return token;
  }
}
