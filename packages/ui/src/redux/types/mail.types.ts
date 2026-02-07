export interface MailMessage {
  id: string;
  gmailMessageId: string;
  fromEmail: string;
  subject: string;
  snippet: string | null;
  internalDate: string;
  parsedStatusHint: string | null;
  parsedCompany: string | null;
  parsedJobTitle: string | null;
}

export interface EmailsResponse {
  emails: MailMessage[];
  total: number;
  limit: number;
  offset: number;
}

export interface FetchMailsResponse {
  success: boolean;
  count: number;
  message: string;
}

export interface JobStats {
  applied: number;
  rejected: number;
  interview: number;
  total: number;
}

export interface StatsResponse {
  stats: JobStats;
}
