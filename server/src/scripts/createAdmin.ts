/**
 * Creates the first (and, for now, only) administrator account.
 *
 * There is deliberately no public /register endpoint or page — this script
 * is the only way an admin account gets created. Run it once, locally,
 * against the real database:
 *
 *   cd server
 *   npm install
 *   cp .env.example .env        # then fill in MONGODB_URI, JWT_SECRET, and
 *                                 ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD
 *   npm run create-admin
 *
 * It's idempotent: if an admin with that email already exists, it does
 * nothing and exits cleanly rather than overwriting the password. Remove
 * the ADMIN_* lines from your local .env afterwards — the running server
 * never reads them.
 */
import { z } from "zod";
import { connectToDatabase, disconnectFromDatabase } from "../config/db";
import { Admin } from "../models/Admin";
import { hashPassword } from "../utils/password";

const seedSchema = z.object({
  ADMIN_NAME: z.string().trim().min(1, "Set ADMIN_NAME in server/.env."),
  ADMIN_EMAIL: z.string().trim().toLowerCase().email("Set ADMIN_EMAIL to a valid email in server/.env."),
  // A minimum length is enforced here — and only here — because this is the
  // one place a new credential is actually chosen.
  ADMIN_PASSWORD: z.string().min(8, "ADMIN_PASSWORD must be at least 8 characters."),
});

const run = async () => {
  const parsed = seedSchema.safeParse(process.env);
  if (!parsed.success) {
    console.error("Cannot create admin — fix server/.env:");
    for (const issue of parsed.error.issues) {
      console.error(`  - ${issue.message}`);
    }
    process.exitCode = 1;
    return;
  }

  const { ADMIN_NAME: name, ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = parsed.data;

  await connectToDatabase();

  const existing = await Admin.findOne({ email });
  if (existing) {
    console.log(`An admin with the email "${email}" already exists. No changes made.`);
    return;
  }

  const passwordHash = await hashPassword(password);

  try {
    await Admin.create({ name, email, password: passwordHash, role: "admin" });
    console.log(`Created admin "${name}" <${email}>.`);
    console.log("You can remove the ADMIN_* lines from server/.env now.");
  } catch (error) {
    // A duplicate-key error here means another process created the same
    // admin between our check above and this insert — treat it the same
    // as "already exists" rather than leaking a raw MongoDB error.
    if (error && typeof error === "object" && "code" in error && (error as { code?: number }).code === 11000) {
      console.log(`An admin with the email "${email}" already exists. No changes made.`);
      return;
    }
    throw error;
  }
};

run()
  .catch((error) => {
    console.error("Failed to create admin:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });
