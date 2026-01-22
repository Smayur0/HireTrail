import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import mailRouter from "./routes/mail.routes.js";
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:8989",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ------------routes --------------------------
//auth
app.use("/auth", authRouter);

//gmail
app.use("/mail", mailRouter);

export default app;
