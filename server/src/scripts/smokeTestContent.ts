/**
 * End-to-end check of the Milestone 3 CMS endpoints — same approach as
 * smokeTest.ts (in-memory MongoDB, real HTTP via supertest, no Atlas
 * credentials needed).
 *
 * Run with: npm run smoke-test-content
 */
export {}; // treat this file as its own module scope, not a global script

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "smoke-test-secret-do-not-use-in-production-0000000000";
process.env.CLIENT_ORIGINS = "http://localhost:8080";
process.env.COOKIE_SAMESITE = "lax";
process.env.AUTH_SESSION_DAYS = "7";
process.env.MONGODB_DB_NAME = "christ_life_content_test";

const main = async () => {
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mem = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mem.getUri();

  const mongoose = (await import("mongoose")).default;
  const request = (await import("supertest")).default;
  const bcrypt = (await import("bcryptjs")).default;
  const { connectToDatabase } = await import("../config/db");
  const { createApp } = await import("../app");
  const { Admin } = await import("../models/Admin");
  const { BIBLE_STUDY_SINGLETON_ID } = await import("../models/BibleStudy");

  await connectToDatabase();
  const app = createApp();

  await Admin.create({
    name: "Test Admin",
    email: "admin@example.com",
    password: await bcrypt.hash("Sup3rSecret!", 4),
    role: "admin",
  });

  const anon = request.agent(app); // never logs in — "the public site"
  const admin = request.agent(app); // logs in below — "the dashboard"

  let failures = 0;
  const check = (label: string, condition: boolean) => {
    console.log(`${condition ? "✔" : "✘"} ${label}`);
    if (!condition) failures += 1;
  };

  // ---- Events -----------------------------------------------------
  let res = await anon.post("/api/events").send({
    title: "Should be rejected",
    description: "x",
    dateLabel: "TBA",
  });
  check("unauthenticated POST /api/events -> 401", res.status === 401);

  res = await admin.post("/api/auth/login").send({ email: "admin@example.com", password: "Sup3rSecret!" });
  check("admin login -> 200", res.status === 200);

  res = await admin.post("/api/events").send({
    title: "Draft Outreach Day",
    description: "A draft event, not yet visible to the public.",
    dateLabel: "TBA",
    published: false,
  });
  check("authenticated POST /api/events -> 201", res.status === 201);
  const draftEventId = res.body?.item?._id;

  res = await admin.post("/api/events").send({
    title: "Published Fellowship Night",
    description: "A published event, visible to everyone.",
    dateLabel: "TBA",
    published: true,
  });
  check("authenticated POST /api/events (published) -> 201", res.status === 201);
  const publishedEventId = res.body?.item?._id;

  res = await anon.get("/api/events");
  const anonTitles: string[] = (res.body?.items ?? []).map((e: { title: string }) => e.title);
  check("public GET /api/events sees the published event", anonTitles.includes("Published Fellowship Night"));
  check("public GET /api/events does NOT see the draft event", !anonTitles.includes("Draft Outreach Day"));

  res = await admin.get("/api/events");
  const adminTitles: string[] = (res.body?.items ?? []).map((e: { title: string }) => e.title);
  check("authenticated GET /api/events sees both draft and published", adminTitles.includes("Draft Outreach Day") && adminTitles.includes("Published Fellowship Night"));

  res = await anon.get(`/api/events/${draftEventId}`);
  check("public GET of a draft event's own id -> 404 (not leaked)", res.status === 404);

  res = await admin.patch(`/api/events/${publishedEventId}`).send({ title: "Published Fellowship Night (edited)" });
  check("authenticated PATCH /api/events/:id -> 200", res.status === 200 && res.body?.item?.title === "Published Fellowship Night (edited)");

  res = await anon.delete(`/api/events/${publishedEventId}`);
  check("unauthenticated DELETE -> 401", res.status === 401);

  res = await admin.delete(`/api/events/${publishedEventId}`);
  check("authenticated DELETE -> 200", res.status === 200);

  res = await admin.get(`/api/events/${publishedEventId}`);
  check("deleted event is really gone -> 404", res.status === 404);

  await admin.delete(`/api/events/${draftEventId}`); // cleanup

  // ---- Gallery ------------------------------------------------------
  res = await admin.post("/api/gallery").send({ type: "photo", title: "Test photo", mediaUrl: "/gallery/photos/group1.jpeg" });
  check("authenticated POST /api/gallery -> 201", res.status === 201);
  const galleryId = res.body?.item?._id;

  res = await anon.post("/api/gallery").send({ type: "photo", title: "x", mediaUrl: "/x.jpg" });
  check("unauthenticated POST /api/gallery -> 401", res.status === 401);

  res = await admin.patch(`/api/gallery/${galleryId}`).send({ published: false });
  check("authenticated PATCH /api/gallery/:id (unpublish) -> 200", res.status === 200 && res.body?.item?.published === false);

  res = await anon.get("/api/gallery");
  check("public GET /api/gallery hides the now-unpublished item", !(res.body?.items ?? []).some((g: { _id: string }) => g._id === galleryId));

  res = await admin.delete(`/api/gallery/${galleryId}`);
  check("authenticated DELETE /api/gallery/:id -> 200", res.status === 200);

  // ---- Testimonials --------------------------------------------------
  res = await admin.post("/api/testimonials").send({ author: "Test Person", quote: "A test testimonial." });
  check("authenticated POST /api/testimonials -> 201", res.status === 201);
  const testimonialId = res.body?.item?._id;

  res = await anon.get("/api/testimonials");
  check("public GET /api/testimonials sees it (published by default)", (res.body?.items ?? []).some((t: { _id: string }) => t._id === testimonialId));

  res = await admin.delete(`/api/testimonials/${testimonialId}`);
  check("authenticated DELETE /api/testimonials/:id -> 200", res.status === 200);

  // ---- Bible Study (singleton) ---------------------------------------
  res = await anon.get("/api/bible-study");
  check("public GET /api/bible-study -> 200 (auto-created empty)", res.status === 200 && res.body?.bibleStudy?._id === BIBLE_STUDY_SINGLETON_ID);

  res = await anon.patch("/api/bible-study").send({ time: "hacked" });
  check("unauthenticated PATCH /api/bible-study -> 401", res.status === 401);

  res = await admin.patch("/api/bible-study").send({
    time: "10:00 – 11:00 PM",
    sessions: [{ day: "Monday", title: "Monday Female Bible Study" }],
  });
  check("authenticated PATCH /api/bible-study -> 200", res.status === 200 && res.body?.bibleStudy?.time === "10:00 – 11:00 PM");

  res = await anon.get("/api/bible-study");
  check("Bible Study change persists on next GET", res.body?.bibleStudy?.sessions?.[0]?.title === "Monday Female Bible Study");

  // ---- Settings (singleton) ------------------------------------------
  res = await admin.patch("/api/settings").send({ email: "hello@christlife.test" });
  check("authenticated PATCH /api/settings -> 200", res.status === 200 && res.body?.settings?.email === "hello@christlife.test");

  res = await anon.get("/api/settings");
  check("public GET /api/settings sees the update", res.body?.settings?.email === "hello@christlife.test");

  res = await admin.patch("/api/settings").send({ email: "not-an-email" });
  check("invalid email in PATCH /api/settings -> 400", res.status === 400);

  await mongoose.disconnect();
  await mem.stop();

  if (failures > 0) {
    console.error(`\n${failures} check(s) failed.`);
    process.exitCode = 1;
  } else {
    console.log("\nAll CMS smoke test checks passed.");
  }
};

main().catch((error) => {
  console.error("Smoke test crashed:", error);
  process.exitCode = 1;
});
