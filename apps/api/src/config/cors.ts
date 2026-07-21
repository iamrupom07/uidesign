import { CorsOptions } from "cors";
import { env } from "./env";

export const trustedOrigins = [env.CLIENT_URL, "http://localhost:3000", "http://127.0.0.1:3000"];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || trustedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS error: Origin ${origin} not allowed`));
    }
  },
  credentials: true, // Required for HTTP-only cookie authentication
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Cookie"],
};
