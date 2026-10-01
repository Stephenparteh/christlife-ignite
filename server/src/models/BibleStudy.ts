import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

/** Fixed id so there is exactly one Bible Study document, ever. */
export const BIBLE_STUDY_SINGLETON_ID = "bible-study-settings";

/**
 * Each session carries its own meeting info now (time/platform/links can
 * differ per session — e.g. a Saturday debate on a different platform than
 * the regular Mon/Tue/Thu study). The top-level time/platform/meetUrl/
 * whatsappUrl fields below still exist as the *shared defaults* new
 * sessions start from and a fallback for any session that hasn't set its
 * own — nothing reads them as if they were the only source of truth
 * anymore. See scripts/migrateBibleStudySessions.ts for how existing
 * sessions were backfilled when this changed.
 */
const sessionSchema = new Schema(
  {
    day: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    time: { type: String, trim: true, default: "" },
    platform: { type: String, trim: true, default: "" },
    meetUrl: { type: String, trim: true, default: "" },
    whatsappUrl: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
  },
  { _id: false },
);

const bibleStudySchema = new Schema(
  {
    _id: { type: String, default: BIBLE_STUDY_SINGLETON_ID },
    sessions: { type: [sessionSchema], default: [] },
    // Shared defaults — used to pre-fill a new session, and as a fallback
    // display value for any older session missing its own equivalent field.
    time: { type: String, trim: true, default: "" },
    platform: { type: String, trim: true, default: "" },
    meetUrl: { type: String, trim: true, default: "" },
    whatsappUrl: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    // Whether the schedule shows on the public Bible Study/Home pages.
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export type BibleStudySchemaShape = InferSchemaType<typeof bibleStudySchema>;
export type BibleStudyDocument = HydratedDocument<BibleStudySchemaShape>;
export type BibleStudySessionShape = BibleStudySchemaShape["sessions"][number];

export const BibleStudy = model("BibleStudy", bibleStudySchema);
