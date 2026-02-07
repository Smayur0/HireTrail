import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import mailRouter from "./routes/mail.routes.js";
import statsRouter from "./routes/stats.routes.js";
import emailsRouter from "./routes/emails.routes.js";
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ------------routes --------------------------
//auth
app.use("/auth", authRouter);

//gmail
app.use("/mail", mailRouter);

//stats
app.use("/stats", statsRouter);

//emails
app.use("/emails", emailsRouter);

export default app;
