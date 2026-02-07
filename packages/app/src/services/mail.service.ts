import { google } from "googleapis";
import prisma from "../utils/prismaConnection.js";

export class MailService {
  private oauth2client: any;

  constructor(refreshToken?: string) {
    if (refreshToken) {
      this.oauth2client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URL
      );
      this.oauth2client.setCredentials({ refresh_token: refreshToken });
    }
  }

  async getMailsList({ maxResults = 500, unreadonly = false } = {}) {
    if (!this.oauth2client) {
      throw new Error("OAuth2 client not initialized. Refresh token is required.");
    }
    try {
      const gmail = google.gmail({ version: "v1", auth: this.oauth2client });
      let email: any[] = [];
      let nextPageToken: string | undefined = undefined;
      const query = unreadonly ? "is:unread" : "";
      do {
        const res: any = await gmail.users.messages.list({
          userId: "me",
          labelIds: ["INBOX"],
          maxResults: 100,
          pageToken: nextPageToken,
          q: query,
        });

        const messages = res.data.messages || [];
        nextPageToken = res.data.nextPageToken;
        const fullMessages = await Promise.all(
          messages.map(async (msg: any) => {
            const msgRes = await gmail.users.messages.get({
              userId: "me",
              id: msg.id!,
            });
            return msgRes.data;
          })
        );
        email = email.concat(fullMessages);
      } while (nextPageToken && email.length < maxResults);

      return email;
    } catch (error) {
      throw new Error(`Failed to fetch email list-${error}`);
    }
  }

  async parseEmail(message: any) {
    const headers = message.payload?.headers || [];
    const subject = headers.find((h: any) => h.name === "Subject")?.value || "";
    const from = headers.find((h: any) => h.name === "From")?.value || "";
    const internalDate = new Date(parseInt(message.internalDate));

    let body = this.extractBody(message.payload);

    return {
      gmailMessageId: message.id,
      gmailThreadId: message.threadId,
      subject,
      fromEmail: from,
      snippet: message.snippet,
      bodyPlain: body,
      bodyHtml: "", // For now
      internalDate,
    };
  }

  private extractBody(payload: any): string {
    if (!payload) return "";
    if (payload.body?.data) {
      return Buffer.from(payload.body.data, "base64").toString("utf-8");
    }
    if (payload.parts) {
      for (let part of payload.parts) {
        const text = this.extractBody(part);
        if (text) return text;
      }
    }
    return "";
  }

  async saveMails(userId: string, mails: any[]) {
    await prisma.mailMessage.createMany({
      data: mails.map((m: any) => ({
        userId,
        gmailMessageId: m.gmailMessageId,
        gmailThreadId: m.gmailThreadId,
        fromEmail: m.fromEmail,
        subject: m.subject,
        snippet: m.snippet,
        bodyPlain: m.bodyPlain,
        bodyHtml: m.bodyHtml,
        internalDate: m.internalDate,
        parsedStatusHint: m.parsedStatusHint || null,
        parsedCompany: m.parsedCompany || null,
        parsedJobTitle: m.parsedJobTitle || null,
      })),
      skipDuplicates: true,
    });
  }

  async getSavedEmails(userId: string, limit: number = 200, offset: number = 0) {
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

    return { emails, total };
  }
}
