import "dotenv/config";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import path from "path";
import { configureRoutes } from "./api-gateway";
import { globalErrorHandler } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";

const app: Application = express();

// Middleware array
const middlewares = [
  helmet(),
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Origin",
      "X-Requested-With",
      "Accept"
    ],
    credentials: true
  }),
  express.json(),
  express.urlencoded({ extended: true }),
  cookieParser(),
  express.static(path.join(__dirname, "../", "public"))
];

// Use all middlewares
app.use(middlewares);

// Health route
app.get("/health", (req: Request, res: Response) => {
  res.send("Server is running");
});

// API Gateway routes configuration
configureRoutes(app);

// 404 Route handler
app.use((req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(404).send("Route not found");
  } catch (error: Error | unknown) {
    next(error);
  }
});

// Global error handler
app.use(globalErrorHandler);

export default app;
