import { User, Session } from "./user";

export interface AuthSession {
  user: User;
  session: Session;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthResponse {
  user: User;
  session: Session;
}
