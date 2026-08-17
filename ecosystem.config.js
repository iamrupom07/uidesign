const path = require("path");
const dotenv = require("dotenv");

// Load root and sub-app .env files into process.env
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "apps/api/.env") });

const defaultDbUrl =
  process.env.DATABASE_URL ||
  "postgresql://neondb_owner:npg_zASslWdFO04g@ep-lucky-mud-aygqnybl-pooler.c-5.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

module.exports = {
  apps: [
    {
      name: "macprotec-api",
      cwd: "./apps/api",
      script: "dist/server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
        DATABASE_URL: defaultDbUrl,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET || "a8F2kL9pQ3vX7zW1rT4yM0nC6bD5eG2h",
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL || "https://macproteceng.com",
        CLIENT_URL: process.env.CLIENT_URL || "https://macproteceng.com",
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "macprotec_jwt_access_secret_key_32_chars",
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "macprotec_jwt_refresh_secret_key_32_chars",
      },
    },
    {
      name: "macprotec-web",
      cwd: "./apps/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1.5G",
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        INTERNAL_API_URL: "http://127.0.0.1:5000",
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "https://macproteceng.com",
        DATABASE_URL: defaultDbUrl,
      },
    },
  ],
};
