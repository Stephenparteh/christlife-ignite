import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

/** Fixed id so there is exactly one Bible Study document, ever. */
export const BIBLE_STUDY_SINGLETON_ID = "bible-study-settings";

const sessionSchema = new Schema(
  {
    day: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const bibleStudySchema = new Schema(
  {
    _id: { type: String, default: BIBLE_STUDY_SINGLETON_ID },
    sessions: { type: [sessionSchema], default: [] },
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

export const BibleStudy = model("BibleStudy", bibleStudySchema);
