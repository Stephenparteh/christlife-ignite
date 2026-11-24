/**
 * End-to-end check of the Giving Methods + Giving Requests APIs against an
 * in-memory MongoDB (no real database is touched). Run: npm run smoke-test-giving
 */
export {};

process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "smoke-test-secret-do-not-use-in-production-0000000000";
process.env.CLIENT_ORIGINS = "http://localhost:8080";
process.env.COOKIE_SAMESITE = "lax";
process.env.AUTH_SESSION_DAYS = "7";
process.env.MONGODB_DB_NAME = "christ_life_test";

const main = async () => {
  const password = (await import("node:crypto")).randomBytes(16).toString("hex");
  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const mem = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mem.getUri();

  const mongoose = (await import("mongoose")).default;
  const request = (await import("supertest")).default;
  const bcrypt = (await import("bcryptjs")).default;
  const { connectToDatabase } = await import("../config/db");
  const { createApp } = await import("../app");
  const { Admin } = await import("../models/Admin");
  const { ContactMessage } = await import("../models/ContactMessage");
  const { GivingRequest } = await import("../models/GivingRequest");

  await connectToDatabase();
  const app = createApp();
  await Admin.create({
    name: "Test Admin",
    email: "admin@example.com",
    password: await bcrypt.hash(password, 4),
    role: "admin",
  });

  let failures = 0;
  const check = (label: string, ok: boolean, extra?: unknown) => {
    console.log(`${ok ? "✔" : "✘"} ${label}${!ok && extra !== undefined ? ` -> ${JSON.stringify(extra)}` : ""}`);
    if (!ok) failures += 1;
  };

  const anon = request(app);
  // The limiter is per-IP; give each test submission its own client IP
  // (trust proxy is on) so only the dedicated rate-limit check exhausts one.
  let ipCounter = 0;
  const submit = (body: unknown, ip = `10.0.0.${++ipCounter}`) =>
    anon.post("/api/giving-requests").set("X-Forwarded-For", ip).send(body as object);
  const admin = request.agent(app);
  await admin.post("/api/auth/login").send({ email: "admin@example.com", password });

  // ---- Auth on admin endpoints
  for (const [m, p] of [
    ["get", "/api/admin/giving-methods"],
    ["post", "/api/admin/giving-methods"],
    ["get", "/api/admin/giving-requests"],
  ] as const) {
    const r = await anon[m](p).send({});
    check(`${m.toUpperCase()} ${p} without session -> 401`, r.status === 401, r.status);
  }

  // ---- Methods CRUD
  let res = await admin.post("/api/admin/giving-methods").send({
    name: "Example Local Wallet", // custom name, not in any list
    type: "My Custom Type",
    description: "Pay by wallet",
    details: [{ label: "Wallet ID", value: "TEST-0001" }],
  });
  check("create custom method (custom name + type) -> 201", res.status === 201, res.body);
  const walletId: string = res.body.item?._id;
  check("new methods default to inactive", res.body.item?.isActive === false);

  res = await admin.post("/api/admin/giving-methods").send({ name: "Second", isActive: true, instructions: "Ask us" });
  const secondId: string = res.body.item?._id;
  res = await admin.post("/api/admin/giving-methods").send({ name: "" });
  check("create with empty name -> 400", res.status === 400);
  res = await admin.post("/api/admin/giving-methods").send({ name: "X", imageUrl: "javascript:alert(1)" });
  check("create with unsafe imageUrl -> 400", res.status === 400);

  res = await anon.get("/api/giving-methods");
  check("public list returns only active (1 of 2)", res.status === 200 && res.body.items.length === 1 && res.body.items[0].name === "Second", res.body);
  check("public list has no internal fields", !("isActive" in res.body.items[0]) && !("createdAt" in res.body.items[0]));

  res = await admin.patch(`/api/admin/giving-methods/${walletId}`).send({ isActive: true });
  check("activate custom method", res.status === 200 && res.body.item.isActive === true);
  check("PATCH did not wipe untouched fields", res.body.item.description === "Pay by wallet" && res.body.item.details.length === 1);
  res = await anon.get("/api/giving-methods");
  check("public list now shows custom method", res.body.items.some((m: { name: string }) => m.name === "Example Local Wallet"));

  res = await admin.put("/api/admin/giving-methods/reorder").send({ ids: [secondId, walletId] });
  check("reorder", res.status === 200 && res.body.items[0]._id === secondId, res.body);
  res = await anon.get("/api/giving-methods");
  check("public order follows reorder", res.body.items[0].name === "Second");
  res = await admin.put("/api/admin/giving-methods/reorder").send({ ids: ["nope"] });
  check("reorder with bad id -> 400", res.status === 400);
  res = await admin.get("/api/admin/giving-methods/not-an-id");
  check("malformed id -> 400", res.status === 400);

  // ---- Public request
  const valid = {
    fullName: "John Doe",
    phone: "+231 770 000 000",
    email: "John@Example.com",
    purpose: "Missions",
    amount: 100,
    currency: "USD",
    preferredMethodId: walletId,
    note: "Please contact me.",
  };
  res = await submit({ ...valid, status: "completed", adminNotes: "hacked", contactedAt: new Date() });
  check("valid request -> 201", res.status === 201 && res.body.success === true, res.body);
  check("response exposes only id + status", JSON.stringify(Object.keys(res.body.data).sort()) === '["id","status"]');
  const saved = await GivingRequest.findById(res.body.data.id);
  check("persisted in DB", !!saved);
  check("status forced to pending", saved?.status === "pending");
  check("adminNotes / contactedAt not settable", saved?.adminNotes === "" && saved?.contactedAt === null);
  check("method name snapshot stored", saved?.preferredMethodName === "Example Local Wallet");
  check("email normalised", saved?.email === "john@example.com");
  const firstRequestId = res.body.data.id;

  res = await submit(valid);
  check("identical resubmit is idempotent (same id, not stored twice)", res.status === 200 && res.body.data.id === firstRequestId && (await GivingRequest.countDocuments()) === 1);

  const bad = async (label: string, patch: Record<string, unknown>) => {
    const r = await submit({ ...valid, amount: 55, ...patch });
    check(`reject: ${label}`, r.status === 400, { status: r.status, body: r.body });
  };
  await bad("negative amount", { amount: -5 });
  await bad("zero amount", { amount: 0 });
  await bad("string amount", { amount: "abc" });
  await bad("Infinity-ish amount", { amount: 1e300 });
  await bad("bad currency", { currency: "EUR" });
  await bad("bad email", { email: "nope" });
  await bad("bad phone", { phone: "abc" });
  await bad("missing name", { fullName: "" });
  await bad("bad purpose", { purpose: "Lottery" });
  await bad("'Other' without custom purpose", { purpose: "Other" });
  await bad("malformed method id", { preferredMethodId: "zzz" });
  await bad("nonexistent method id", { preferredMethodId: new mongoose.Types.ObjectId().toString() });
  await admin.patch(`/api/admin/giving-methods/${walletId}`).send({ isActive: false });
  await bad("inactive method", { preferredMethodId: walletId });
  await admin.patch(`/api/admin/giving-methods/${walletId}`).send({ isActive: true });

  res = await submit({ ...valid, fullName: "Mary Roe", phone: "0881234567", amount: 20, purpose: "Other", customPurpose: "Roof", email: "" });
  check("'Other' with custom purpose + empty email ok", res.status === 201, res.body);

  // ---- Admin requests
  res = await anon.get("/api/admin/giving-requests");
  check("list requires auth", res.status === 401);
  res = await admin.get("/api/admin/giving-requests");
  check("admin list: items, pagination, stats", res.status === 200 && res.body.items.length === 2 && res.body.stats.total === 2 && res.body.stats.pending === 2 && res.body.pagination.total === 2, res.body.stats);
  res = await admin.get("/api/admin/giving-requests?limit=1&page=2");
  check("pagination", res.body.items.length === 1 && res.body.pagination.totalPages === 2);
  res = await admin.get("/api/admin/giving-requests?q=john");
  check("search by name", res.body.items.length === 1);
  res = await admin.get("/api/admin/giving-requests?q=770%20000");
  check("search by phone", res.body.items.length === 1);
  res = await admin.get("/api/admin/giving-requests?q=example.com");
  check("search by email", res.body.items.length === 1);
  res = await admin.get("/api/admin/giving-requests?q=.*");
  check("regex chars in search are escaped", res.body.items.length === 0);
  res = await admin.get("/api/admin/giving-requests?purpose=Other");
  check("filter by purpose", res.body.items.length === 1);
  res = await admin.get(`/api/admin/giving-requests?methodId=${walletId}`);
  check("filter by method", res.body.items.length === 2);
  res = await admin.get("/api/admin/giving-requests?status=bogus");
  check("bad status filter -> 400", res.status === 400);

  res = await admin.patch(`/api/admin/giving-requests/${firstRequestId}`).send({ status: "contacted", adminNotes: "Called him" });
  check("mark contacted sets contactedAt", res.status === 200 && !!res.body.item.contactedAt && res.body.item.adminNotes === "Called him", res.body);
  const contactedAt = res.body.item.contactedAt;
  res = await admin.patch(`/api/admin/giving-requests/${firstRequestId}`).send({ status: "completed" });
  check("mark completed sets completedAt, keeps contactedAt", !!res.body.item.completedAt && res.body.item.contactedAt === contactedAt);
  res = await admin.patch(`/api/admin/giving-requests/${firstRequestId}`).send({ status: "pending" });
  check("moving back keeps history timestamps", !!res.body.item.completedAt && !!res.body.item.contactedAt);
  res = await admin.patch(`/api/admin/giving-requests/${firstRequestId}`).send({ amount: 1 });
  check("PATCH rejects arbitrary fields", res.status === 400);
  res = await admin.patch(`/api/admin/giving-requests/${firstRequestId}`).send({ status: "paid" });
  check("PATCH rejects unknown status", res.status === 400);
  res = await admin.get(`/api/admin/giving-requests/${firstRequestId}`);
  check("detail includes admin notes", res.body.item.adminNotes === "Called him");
  res = await admin.get("/api/admin/giving-requests");
  check("stats reflect DB", res.body.stats.pending === 2);

  // ---- Method deletion keeps history
  res = await admin.delete(`/api/admin/giving-methods/${walletId}`);
  check("delete method", res.status === 200);
  res = await admin.get(`/api/admin/giving-requests/${firstRequestId}`);
  check("request keeps method name after method deleted", res.body.item.preferredMethodName === "Example Local Wallet");

  // ---- Delete request
  res = await anon.delete(`/api/admin/giving-requests/${firstRequestId}`);
  check("anon cannot delete request", res.status === 401);
  res = await admin.delete(`/api/admin/giving-requests/${firstRequestId}`);
  check("admin deletes request", res.status === 200 && (await GivingRequest.countDocuments()) === 1);

  // ---- Preferred-method options: defaults + custom, dedupe, validation
  const DEFAULT_LABELS = [
    "Orange Money", "MTN Mobile Money", "Lonestar Cell MTN Mobile Money", "PayPal", "Zelle",
    "Cash App", "Venmo", "Bank Transfer", "In Person", "Other",
  ];
  res = await anon.get("/api/giving-methods");
  let labels: string[] = res.body.requestOptions.map((o: { label: string }) => o.label);
  check("options include every common default with no methods configured", DEFAULT_LABELS.every((l) => labels.includes(l)), labels);
  check("'Other' is listed last", labels[labels.length - 1] === "Other");
  check("public items hold only configured methods, no defaults", res.body.items.length === 1 && res.body.items[0].name === "Second", res.body.items);

  res = await admin.post("/api/admin/giving-methods").send({ name: "Local Bank X", isActive: true });
  const localBankId: string = res.body.item._id;
  res = await admin.post("/api/admin/giving-methods").send({ name: "orange money", isActive: true, details: [{ label: "Number", value: "TEST" }] });
  const orangeId: string = res.body.item._id;
  res = await admin.post("/api/admin/giving-methods").send({ name: "Hidden Wallet", isActive: false });
  const hiddenId: string = res.body.item._id;

  res = await anon.get("/api/giving-methods");
  labels = res.body.requestOptions.map((o: { label: string }) => o.label);
  const values: string[] = res.body.requestOptions.map((o: { value: string }) => o.value);
  check("custom method appears in options", labels.includes("Local Bank X"));
  check("inactive custom method not in options", !labels.includes("Hidden Wallet"));
  check("same-name custom/default appears once", labels.filter((l) => l.toLowerCase().replace(/\s+/g, "") === "orangemoney").length === 1, labels);
  check("deduped entry links to the configured method", res.body.requestOptions.find((o: { label: string }) => o.label === "Orange Money")?.value === orangeId);
  check("no duplicate option values", new Set(values).size === values.length);
  check("MTN and Lonestar Cell MTN stay separate", labels.includes("MTN Mobile Money") && labels.includes("Lonestar Cell MTN Mobile Money"));
  check("public items list only configured active methods", res.body.items.length === 3 && !res.body.items.some((m: { name: string }) => m.name === "PayPal"));

  const reqWith = (preferredMethodId: string, extra: Record<string, unknown> = {}) =>
    submit({ ...valid, fullName: "Pat Default", phone: "0771112222", amount: 7, preferredMethodId, ...extra });

  res = await reqWith("paypal");
  check("predefined method with no DB record -> 201", res.status === 201, res.body);
  let rec = await GivingRequest.findById(res.body.data?.id);
  check("saved with name snapshot 'PayPal' and null method id", rec?.preferredMethodName === "PayPal" && rec?.preferredMethodId === null, rec);
  const paypalReqId: string = res.body.data?.id;

  res = await reqWith("other", { amount: 8 });
  check("'Other' default accepted", res.status === 201, res.body);
  res = await reqWith("lonestar-cell-mtn-mobile-money", { amount: 9 });
  rec = await GivingRequest.findById(res.body.data?.id);
  check("Lonestar default saved under its own name", res.status === 201 && rec?.preferredMethodName === "Lonestar Cell MTN Mobile Money");

  res = await reqWith(localBankId, { amount: 10 });
  rec = await GivingRequest.findById(res.body.data?.id);
  check("active custom method -> 201 with id + name snapshot", res.status === 201 && rec?.preferredMethodName === "Local Bank X" && String(rec?.preferredMethodId) === localBankId, res.body);

  res = await reqWith("orange-money", { amount: 11 });
  rec = await GivingRequest.findById(res.body.data?.id);
  check("default key links to same-named configured method", res.status === 201 && String(rec?.preferredMethodId) === orangeId && rec?.preferredMethodName === "orange money", rec);

  res = await reqWith(hiddenId, { amount: 12 });
  check("inactive custom method rejected", res.status === 400, res.body);
  res = await reqWith("bitcoin-atm", { amount: 13 });
  check("unsupported arbitrary value rejected", res.status === 400, res.body);
  res = await reqWith("", { amount: 15 });
  check("empty method rejected", res.status === 400);
  res = await reqWith("<script>alert(1)</script>", { amount: 16 });
  check("malicious string rejected", res.status === 400);
  res = await reqWith("Orange Money", { amount: 17 });
  check("display name (not a key/id) rejected", res.status === 400);

  // Admin view
  res = await admin.get("/api/admin/giving-requests?limit=100");
  const methodNames = res.body.items.map((r: { preferredMethodName: string }) => r.preferredMethodName);
  check("admin list shows default + custom method names", methodNames.includes("PayPal") && methodNames.includes("Local Bank X") && methodNames.includes("Other"), methodNames);
  const optLabels = res.body.methodOptions.map((o: { label: string }) => o.label);
  check("admin filter options = defaults + custom (incl. inactive)", ["PayPal", "Local Bank X", "Hidden Wallet"].every((l) => optLabels.includes(l)), optLabels);
  res = await admin.get("/api/admin/giving-requests?methodId=paypal");
  check("filter by predefined method", res.status === 200 && res.body.items.length === 1 && res.body.items[0].preferredMethodName === "PayPal", res.body.items?.length);
  res = await admin.get(`/api/admin/giving-requests?methodId=${localBankId}`);
  check("filter by custom method", res.body.items.length === 1 && res.body.items[0].preferredMethodName === "Local Bank X");
  res = await admin.get("/api/admin/giving-requests?methodId=not-valid");
  check("filter by invalid method -> 400", res.status === 400);
  res = await admin.get(`/api/admin/giving-requests?methodId=${orangeId}`);
  check("filter by configured Orange Money matches linked request", res.body.items.length === 1);

  // Reference search + detail retrieval
  const suffix = paypalReqId.slice(-10).toUpperCase();
  res = await admin.get(`/api/admin/giving-requests?q=GR-${suffix}`);
  check("search by reference (GR-xxxxxxxxxx) finds the request", res.body.items.length === 1 && res.body.items[0]._id === paypalReqId, res.body.items?.length);

  // Legacy-shaped record (created before this change) stays readable/updatable.
  const legacyMethodId = new mongoose.Types.ObjectId();
  const legacy = await GivingRequest.collection.insertOne({
    fullName: "Legacy Donor", phone: "+231770000001", email: "", purpose: "Tithes", customPurpose: "", amount: 5, currency: "LRD",
    preferredMethodId: legacyMethodId, preferredMethodName: "Old Deleted Method", note: "", status: "pending", adminNotes: "",
    contactedAt: null, completedAt: null, createdAt: new Date(), updatedAt: new Date(),
  });
  res = await admin.get(`/api/admin/giving-requests/${legacy.insertedId}`);
  check("legacy record readable with its method name", res.status === 200 && res.body.item.preferredMethodName === "Old Deleted Method");
  res = await admin.patch(`/api/admin/giving-requests/${legacy.insertedId}`).send({ status: "contacted" });
  check("legacy record can be updated", res.status === 200 && res.body.item.status === "contacted");
  res = await admin.get(`/api/admin/giving-requests?methodId=${legacyMethodId}`);
  check("legacy record filterable by its (deleted) method id", res.body.items.length === 1);

  // Existing methods management still works; snapshots are stable
  res = await admin.patch(`/api/admin/giving-methods/${localBankId}`).send({ name: "Local Bank X2" });
  check("editing a method still works", res.status === 200 && res.body.item.name === "Local Bank X2");
  res = await admin.delete(`/api/admin/giving-methods/${localBankId}`);
  check("deleting a method still works", res.status === 200);
  res = await admin.get("/api/admin/giving-requests?q=Pat&limit=100");
  check("request keeps original custom method name after edit + delete", res.body.items.some((r: { preferredMethodName: string }) => r.preferredMethodName === "Local Bank X"));

  // ---- Separation from contact messages
  res = await anon.post("/api/contact-messages").send({ name: "Jane", email: "j@example.com", message: "Hello" });
  check("contact message still works", res.status === 201);
  check("giving requests did not land in ContactMessage", (await ContactMessage.countDocuments()) === 1 && !(await ContactMessage.findOne({ name: "John Doe" })));
  check("contact message did not land in GivingRequest", !(await GivingRequest.findOne({ fullName: "Jane" })));
  const names = (await mongoose.connection.db!.listCollections().toArray()).map((c) => c.name);
  check("separate collections", names.includes("givingrequests") && names.includes("contactmessages") && names.includes("givingmethods"), names);

  // ---- Rate limit (6th request from same IP inside window)
  let last = 0;
  for (let i = 0; i < 7; i++) {
    const r = await submit({}, "9.9.9.9");
    last = r.status;
  }
  check("rate limit eventually returns 429", last === 429, last);

  await mongoose.disconnect();
  await mem.stop();
  console.log(failures === 0 ? "\nAll giving checks passed." : `\n${failures} check(s) FAILED.`);
  process.exit(failures === 0 ? 0 : 1);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
