import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import eventsRoutes from "./routes/events.routes";
import galleryRoutes from "./routes/gallery.routes";
import testimonialsRoutes from "./routes/testimonials.routes";
import bibleStudyRoutes from "./routes/bibleStudy.routes";
import settingsRoutes from "./routes/settings.routes";
import uploadsRoutes from "./routes/uploads.routes";
import contactMessagesRoutes from "./routes/contactMessages.routes";
import teamRoutes from "./routes/team.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { ApiError } from "./utils/ApiError";
import { LOCAL_UPLOAD_DIR } from "./services/uploadService";

/**
 * Builds the Express app without starting it listening, so both
 * src/index.ts (real server) and the smoke test (in-process, against an
 * in-memory Mongo instance) can reuse the exact same wiring.
 */
export const createApp = () => {
  const app = express();
  app.disable("x-powered-by");
  // The server may sit behind a reverse proxy/load balancer in production;
  // this makes req.ip (used by the login rate limiter) reflect the real
  // client address from X-Forwarded-For instead of the proxy's own address.
  app.set("trust proxy", 1);

  app.use(
    cors({
      origin: (origin, callback) => {
        // No Origin header means a same-origin request (e.g. via the Vite
        // dev proxy, or curl) — always allowed. Cross-origin requests must
        // match the configured allowlist.
        if (!origin || env.CLIENT_ORIGINS.includes(origin)) {
          return callback(null, true);
        }
        callback(new ApiError(403, "Not allowed by CORS."));
      },
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "16kb" }));
  app.use(cookieParser());

  // Dev-only local upload fallback (see services/uploadService.ts) — a
  // no-op in production, where Cloudinary is required and nothing is ever
  // written to this server's own filesystem.
  if (!env.IS_PRODUCTION) {
    app.use("/uploads", express.static(LOCAL_UPLOAD_DIR));
  }

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRoutes);
  app.use("/api/events", eventsRoutes);
  app.use("/api/gallery", galleryRoutes);
  app.use("/api/testimonials", testimonialsRoutes);
  app.use("/api/bible-study", bibleStudyRoutes);
  app.use("/api/settings", settingsRoutes);
  app.use("/api/uploads", uploadsRoutes);
  app.use("/api/contact-messages", contactMessagesRoutes);
  app.use("/api/team", teamRoutes);

  app.use("/api", notFoundHandler);
  app.use(errorHandler);

  return app;
};
