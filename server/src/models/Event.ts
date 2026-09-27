import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const eventSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    // Real Christ Life events currently don't have confirmed calendar
    // dates ("TBA", "Every Monday, Tuesday & Thursday" for the recurring
    // Bible study). dateLabel is the free-text display value shown on the
    // public site; eventDate is an optional real date for when one is
    // actually known, so "upcoming vs past" can be computed without
    // fabricating a date for events that don't have one yet.
    dateLabel: { type: String, required: true, trim: true },
    eventDate: { type: Date, default: null },
    time: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    coverImageUrl: { type: String, trim: true, default: "" },
    link: { type: String, trim: true, default: "" },
    // Highlights this event in the public page's single "Featured Event"
    // slot. Only one event is expected to be featured at a time, enforced
    // in the controller rather than the schema.
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

eventSchema.index({ published: 1, eventDate: 1 });

export type EventSchemaShape = InferSchemaType<typeof eventSchema>;
export type EventDocument = HydratedDocument<EventSchemaShape>;

export const Event = model("Event", eventSchema);
