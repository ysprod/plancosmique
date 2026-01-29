import { Role, User, Permission } from "../interfaces";

export interface RegisterDto {
  username: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface TokenPayload {
  sub: string; // userId
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export type { Permission };
