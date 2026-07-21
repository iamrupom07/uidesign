import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@repo/database";
import { env } from "./env";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: env.BETTER_AUTH_SECRET,
  baseURL: env.BETTER_AUTH_URL,
  trustedOrigins: [env.CLIENT_URL, "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    useSecureCookies: env.NODE_ENV === "production",
    cookiePrefix: "macprotec_session",
  },
});
