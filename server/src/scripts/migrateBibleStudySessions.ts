/**
 * One-time, idempotent migration for the Bible Study schema change that
 * gave each session its own time/platform/meetUrl/whatsappUrl instead of
 * sharing one set across all of them (see models/BibleStudy.ts).
 *
 * For each existing session missing its own value for a field, this
 * copies in the singleton's top-level (shared) value for that field —
 * exactly what the public site was already effectively showing for every
 * session, so nothing changes visibly. It never overwrites a session that
 * already has its own value, which is what makes running this more than
 * once safe: the second run finds nothing left to backfill and changes
 * nothing.
 *
 * Run with: npm run migrate-bible-study
 */
import { connectToDatabase, disconnectFromDatabase } from "../config/db";
import { BibleStudy, BIBLE_STUDY_SINGLETON_ID } from "../models/BibleStudy";

const FIELDS = ["time", "platform", "meetUrl", "whatsappUrl"] as const;

const run = async () => {
  await connectToDatabase();

  const doc = await BibleStudy.findById(BIBLE_STUDY_SINGLETON_ID);
  if (!doc) {
    console.log("No Bible Study document exists yet — nothing to migrate.");
    return;
  }

  let changedSessions = 0;
  for (const session of doc.sessions) {
    let changed = false;
    for (const field of FIELDS) {
      if (!session[field]) {
        session[field] = doc[field];
        changed = true;
      }
    }
    if (changed) changedSessions += 1;
  }

  if (changedSessions === 0) {
    console.log("Every session already has its own meeting info. Nothing to migrate.");
    return;
  }

  await doc.save();
  console.log(`Backfilled shared meeting info into ${changedSessions} session(s).`);
};

run()
  .catch((error) => {
    console.error("Migration failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });
