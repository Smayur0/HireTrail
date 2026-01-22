export interface GoogleTokens {
  access_token: string;
  refresh_token: string;
  scope: string;
  token_type: string;
  expiry_date: number;
  id_token: string;
}

export interface GoogleUserInfo {
  id: string;
  email: string;
  name: string;
  picture: string;
}

export interface MailList {
  messages: string;
  nextPageToken: string;
  resultSizeEstimate: string;
}

export interface UserToken {
  id: string;
  email: string;
  name: string;
  googleId: string;
  iat: number;
  exp: number;
}
