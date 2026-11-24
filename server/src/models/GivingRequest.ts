import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";
import { GIVING_CURRENCIES, GIVING_PURPOSES, GIVING_REQUEST_STATUSES } from "../validators/givingRequest";

/**
 * A visitor's request for help completing a gift. This is deliberately NOT
 * a payment record and has nothing to do with ContactMessage — it lives in
 * its own collection. "completed" is an admin's confirmation after their
 * own follow-up, never something the website itself determines.
 */
const givingRequestSchema = new Schema(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 200 },
    phone: { type: String, required: true, trim: true, maxlength: 40 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254, default: "" },
    purpose: { type: String, required: true, enum: GIVING_PURPOSES },
    customPurpose: { type: String, trim: true, maxlength: 200, default: "" },
    amount: { type: Number, required: true, min: 0.01, max: 1_000_000_000 },
    currency: { type: String, required: true, enum: GIVING_CURRENCIES },
    // Not a hard ref: the method may later be deleted. The name snapshot
    // keeps historical requests understandable either way.
    preferredMethodId: { type: Schema.Types.ObjectId, required: true, index: true },
    preferredMethodName: { type: String, required: true, trim: true, maxlength: 100 },
    note: { type: String, trim: true, maxlength: 1000, default: "" },
    status: { type: String, enum: GIVING_REQUEST_STATUSES, default: "pending" },
    adminNotes: { type: String, trim: true, maxlength: 4000, default: "" },
    contactedAt: { type: Date, default: null },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

givingRequestSchema.index({ status: 1, createdAt: -1 });
givingRequestSchema.index({ createdAt: -1 });

export type GivingRequestSchemaShape = InferSchemaType<typeof givingRequestSchema>;
export type GivingRequestDocument = HydratedDocument<GivingRequestSchemaShape>;

export const GivingRequest = model("GivingRequest", givingRequestSchema);
