import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string(),
  BETTER_AUTH_SECRET: z.string().default("super-secret-better-auth-key-min-32-chars-long"),
  BETTER_AUTH_URL: z.string().default("http://localhost:5000"),
  CLIENT_URL: z.string().default("http://localhost:3000"),
  JWT_ACCESS_SECRET: z.string().default("macprotec-jwt-access-secret-key-32-chars"),
  JWT_REFRESH_SECRET: z.string().default("macprotec-jwt-refresh-secret-key-32-chars"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  EMAIL_FROM: z.string().default("noreply@macprotec.com"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_UPLOAD_PRESET: z.string().optional(),
  JWT_ACCESS_EXPIRES_IN: z.string().default("1d"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("30d"),
});

export const env = envSchema.parse(process.env);
