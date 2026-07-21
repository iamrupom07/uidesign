import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

export const useSession = authClient.useSession as any;
export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const signOut = authClient.signOut;
