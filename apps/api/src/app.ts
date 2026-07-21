import express, { Express } from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import { globalRateLimiter } from "./middleware/rateLimiter";
import { errorHandler } from "./middleware/errorHandler";
import routes from "./routes";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./config/auth";

const app: Express = express();

// Security & Base Middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalRateLimiter);

// Better Auth API Route Handler
app.all("/api/auth/*", toNodeHandler(auth));

// Application API Routes
app.use(routes);

// Centralized Error Handling Middleware
app.use(errorHandler);

export default app;
