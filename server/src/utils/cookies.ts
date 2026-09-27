import type { CookieOptions, Response } from "express";
import { env } from "../config/env";

export const AUTH_COOKIE_NAME = env.COOKIE_NAME;

const baseCookieOptions: CookieOptions = {
  httpOnly: true,
  // Secure cookies require HTTPS. Only turn this on in production so local
  // http://localhost dev keeps working.
  secure: env.IS_PRODUCTION,
  sameSite: env.COOKIE_SAMESITE,
  path: "/",
};

export const setAuthCookie = (res: Response, token: string) => {
  res.cookie(AUTH_COOKIE_NAME, token, { ...baseCookieOptions, maxAge: env.AUTH_SESSION_MS });
};

export const clearAuthCookie = (res: Response) => {
  res.clearCookie(AUTH_COOKIE_NAME, baseCookieOptions);
};
