import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import { ApiError } from "./utils/ApiError";

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

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/auth", authRoutes);

  app.use("/api", notFoundHandler);
  app.use(errorHandler);

  return app;
};
