import { z } from "zod";
import dotenv from "dotenv";

import path from "path";

// Load from various possible monorepo locations
dotenv.config();
dotenv.config({ path: path.resolve(process.cwd(), ".env") });
dotenv.config({ path: path.resolve(process.cwd(), "../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../../.env") });
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z
    .string()
    .default(
      "postgresql://neondb_owner:npg_zASslWdFO04g@ep-lucky-mud-aygqnybl-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
    ),
  BETTER_AUTH_SECRET: z.string().default("a8F2kL9pQ3vX7zW1rT4yM0nC6bD5eG2h"),
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
