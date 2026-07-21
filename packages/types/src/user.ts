export type UserRole = "ADMIN" | "USER" | "EMPLOYEE";

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  role: UserRole;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface UserProfile extends User {
  sessions?: Session[];
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date | string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}
