import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthTokenPayload {
  sub: string;
  role: "admin";
}

export const signAuthToken = (payload: AuthTokenPayload) =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn: env.AUTH_SESSION_SECONDS });

/** Throws (jsonwebtoken's own error) if the token is missing, malformed, expired, or signed with a different secret. */
export const verifyAuthToken = (token: string): AuthTokenPayload =>
  jwt.verify(token, env.JWT_SECRET) as AuthTokenPayload & { iat: number; exp: number };
