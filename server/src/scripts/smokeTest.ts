/**
 * Self-contained end-to-end check of the auth flow — no real MongoDB Atlas
 * connection or credentials required. Spins up an in-memory MongoDB
 * (mongodb-memory-server), boots the real Express app against it, and
 * exercises login/me/logout over real HTTP requests (via supertest).
 *
 * Run with: npm run smoke-test
 *
 * This is a development tool, not a CI test suite — it's here so the auth
 * implementation can be verified without needing a live Atlas cluster.
 */
export {}; // treat this file as its own module scope, not a global script

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "smoke-test-secret-do-not-use-in-production-0000000000";
process.env.CLIENT_ORIGINS = "http://localhost:8080";
process.env.COOKIE_SAMESITE = "lax";
process.env.AUTH_SESSION_DAYS = "7";
process.env.MONGODB_DB_NAME = "christ_life_test";

const main = async () => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mem = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mem.getUri();

  // Imported after env vars (esp. MONGODB_URI/JWT_SECRET) are set, since
  // config/env.ts validates them at import time.
  const mongoose = (await import("mongoose")).default;
  const request = (await import("supertest")).default;
  const bcrypt = (await import("bcryptjs")).default;
  const { connectToDatabase } = await import("../config/db");
  const { createApp } = await import("../app");
  const { Admin } = await import("../models/Admin");

  await connectToDatabase();
  const app = createApp();

  const email = "admin@example.com";
  const password = "Sup3rSecret!";
  await Admin.create({
    name: "Test Admin",
    email,
    password: await bcrypt.hash(password, 4), // low cost factor: speed, not security, in a throwaway test
    role: "admin",
  });

  const agent = request.agent(app);
  let failures = 0;
  const check = (label: string, condition: boolean) => {
    console.log(`${condition ? "✔" : "✘"} ${label}`);
    if (!condition) failures += 1;
  };

  // 1. Unauthenticated /me is rejected, not silently "empty".
  let res = await agent.get("/api/auth/me");
  check("GET /me without a session -> 401", res.status === 401);

  // 2. Wrong password fails, with a generic message (no "password is wrong"
  //    vs "email not found" distinction).
  res = await agent.post("/api/auth/login").send({ email, password: "wrong-password" });
  check("login with wrong password -> 401", res.status === 401);
  check(
    "wrong-password message is generic",
    res.body.message === "Invalid email or password.",
  );

  // 3. Unknown email fails with the exact same message as #2.
  res = await agent.post("/api/auth/login").send({ email: "nobody@example.com", password: "whatever" });
  check("login with unknown email -> 401", res.status === 401);
  check(
    "unknown-email message matches wrong-password message (no account enumeration)",
    res.body.message === "Invalid email or password.",
  );

  // 4. Correct credentials succeed. Email comparison is case-insensitive.
  //    The password is never present anywhere in the response.
  res = await agent.post("/api/auth/login").send({ email: "ADMIN@Example.com", password });
  check("login with correct credentials (different case email) -> 200", res.status === 200);
  check("response contains the safe user, not the password", res.body?.user?.password === undefined);
  check("response user email is normalized to lowercase", res.body?.user?.email === email);
  const setCookie = res.headers["set-cookie"]?.[0] ?? "";
  check("session cookie is HttpOnly", setCookie.includes("HttpOnly"));

  // 5. The session persists across requests (cookie-based).
  res = await agent.get("/api/auth/me");
  check("GET /me with a session -> 200", res.status === 200);
  check("GET /me returns the same user", res.body?.user?.email === email);

  // 6. Logout clears the session; /me is rejected again afterwards.
  res = await agent.post("/api/auth/logout");
  check("logout -> 200", res.status === 200);
  res = await agent.get("/api/auth/me");
  check("GET /me after logout -> 401", res.status === 401);

  // 7. Login rate limiting kicks in after repeated failures from one client.
  const limiterAgent = request.agent(app);
  let lastStatus = 0;
  for (let i = 0; i < 12; i += 1) {
    const attempt = await limiterAgent.post("/api/auth/login").send({ email, password: "wrong" });
    lastStatus = attempt.status;
  }
  check("11th+ rapid login attempt from the same client -> 429", lastStatus === 429);

  await mongoose.disconnect();
  await mem.stop();

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log("\nAll auth smoke test checks passed.");
  }
};

main().catch((error) => {
  console.error("Smoke test crashed:", error);
  process.exitCode = 1;
});
