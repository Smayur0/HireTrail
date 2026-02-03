# Backend Application Summary

## Overview
The backend is an **Express.js** application written in **TypeScript**. It handles user authentication via Google OAuth and integrates with the Gmail API to fetch and store user emails. It uses **Prisma** as the ORM with a **MySQL** database.

## System Architecture

### Key Technologies
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** MySQL (via Prisma ORM)
- **Authentication:** Google OAuth2 + JWT
- **External APIs:** Google Gmail API

### APIs & Routes

#### 1. Authentication (`/auth`)
- **GET `/auth/google`**: Initiates the Google OAuth2 flow. Redirects the user to Google's consent screen requesting access to profile, email, and Gmail (readonly).
- **GET `/auth/google/callback`**: Handles the callback from Google.
    1.  Exchanges the authorization `code` for access and refresh tokens.
    2.  Fetches user profile (ID, email, name, picture) using the access token.
    3.  **Upsert User**: Creates or updates the user in the database (identifying by Google ID), storing the `refreshToken`.
    4.  **Generate JWT**: Creates a JWT containing user details (valid for 7 days).
    5.  Returns the user object and the JWT to the client.

#### 2. Mail Integration (`/mail`)
- **GET `/mail/allmails`**: Fetches emails from the user's Gmail inbox.
    -   **Middleware (`authorizationToken`)**: Verifies the JWT from the `Authorization` header ("Bearer <token>"). Finds the user in the DB and attaches it to `req.user`.
    -   **Controller Logic**:
        1.  Retrieves `refreshToken` from the authenticated user.
        2.  Initializes `MailService` with the refresh token to authenticate with Google APIs.
        3.  Fetches up to 200 messages from the user's Inbox.
        4.  Parses emails (extracting Subject, From, Date, and Body).
        5.  **Save to DB**: Stores parsed emails in the `MailMessage` table, linked to the `userId`.

### Data Models (Inferred)
- **User**: Stores Google ID, email, name, and refresh token.
- **MailMessage**: Stores email details (Gmail ID, subject, sender, body, snippet, internal date) and parsing hints (company, job title).

## Application Flow

1.  **Login**: User clicks "Login with Google" -> Redirects to Google -> User accepts permissions -> Backend creates/updates user and issues JWT.
2.  **Access Protected Resources**: Frontend sends JWT in `Authorization` header for subsequent requests.
3.  **Sync Emails**: When `/mail/allmails` is called, the backend uses the stored Google `refreshToken` to access the Gmail API on behalf of the user, downloads recent emails, and saves them to the local database for processing (likely for job application tracking).