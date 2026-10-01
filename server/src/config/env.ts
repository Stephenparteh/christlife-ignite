import { config as loadDotenv } from "dotenv";
import { z } from "zod";

loadDotenv();

/**
 * Every environment variable the server reads, validated once at startup.
 * Fails fast with a clear (secret-free) message instead of crashing later
 * with a confusing error the first time a route touches a missing value.
 */
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(4000),

  MONGODB_URI: z
    .string()
    .min(1, "MONGODB_URI is required — see server/.env.example."),
  MONGODB_DB_NAME: z.string().min(1).default("christ_life"),

  JWT_SECRET: z
    .string()
    .min(32, "JWT_SECRET is required and should be a long random string — see server/.env.example."),
  AUTH_SESSION_DAYS: z.coerce.number().int().positive().default(7),

  CLIENT_ORIGINS: z
    .string()
    .default("http://localhost:8080")
    .transform((value) => value.split(",").map((origin) => origin.trim()).filter(Boolean)),

  COOKIE_SAMESITE: z.enum(["lax", "strict", "none"]).default("lax"),
  COOKIE_NAME: z.string().min(1).default("cl_session"),

  // Media uploads (see src/services/uploadService.ts). All optional — if
  // the Cloudinary variables aren't set, uploads either fall back to local
  // disk (dev only) or are refused with a clear error (production).
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  MAX_UPLOAD_IMAGE_MB: z.coerce.number().positive().default(8),
  MAX_UPLOAD_VIDEO_MB: z.coerce.number().positive().default(50),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`).join("\n");
  // Intentionally not using the shared logger here: this runs before
  // anything else and must never depend on config that might itself be broken.
  console.error(
    `Invalid server configuration. Fix server/.env (see server/.env.example) and restart:\n${issues}`,
  );
  process.exit(1);
}

const data = parsed.data;

export const env = {
  ...data,
  AUTH_SESSION_SECONDS: data.AUTH_SESSION_DAYS * 24 * 60 * 60,
  AUTH_SESSION_MS: data.AUTH_SESSION_DAYS * 24 * 60 * 60 * 1000,
  IS_PRODUCTION: data.NODE_ENV === "production",
  HAS_CLOUDINARY: Boolean(
    data.CLOUDINARY_CLOUD_NAME && data.CLOUDINARY_API_KEY && data.CLOUDINARY_API_SECRET,
  ),
};
