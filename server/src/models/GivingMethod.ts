import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

/**
 * An administrator-managed way to give (Mobile Money, Bank Transfer, In
 * Person, or anything else the admin invents). Nothing here is an enum:
 * `name` and `type` are free text, and method-specific information lives
 * in `details` as ordered label/value rows, so any payment method can be
 * described without a code change.
 */
const givingMethodSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    type: { type: String, trim: true, maxlength: 50, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
    instructions: { type: String, trim: true, maxlength: 2000, default: "" },
    details: {
      type: [
        new Schema(
          {
            label: { type: String, required: true, trim: true, maxlength: 60 },
            value: { type: String, required: true, trim: true, maxlength: 300 },
          },
          { _id: false },
        ),
      ],
      default: [],
    },
    imageUrl: { type: String, trim: true, maxlength: 2048, default: "" },
    // Hidden from the public until an admin has verified the details.
    isActive: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

givingMethodSchema.index({ isActive: 1, sortOrder: 1, createdAt: 1 });

export type GivingMethodSchemaShape = InferSchemaType<typeof givingMethodSchema>;
export type GivingMethodDocument = HydratedDocument<GivingMethodSchemaShape>;

export const GivingMethod = model("GivingMethod", givingMethodSchema);
