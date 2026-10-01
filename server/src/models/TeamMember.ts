import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

const teamMemberSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    // Social links exist on the model because About.tsx already has
    // commented-out UI for them — they're just not rendered publicly yet.
    facebookUrl: { type: String, trim: true, default: "" },
    instagramUrl: { type: String, trim: true, default: "" },
    linkedinUrl: { type: String, trim: true, default: "" },
    // Lower sorts first. Lets an admin reorder the leadership list without
    // depending on creation order.
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

teamMemberSchema.index({ published: 1, order: 1 });

export type TeamMemberSchemaShape = InferSchemaType<typeof teamMemberSchema>;
export type TeamMemberDocument = HydratedDocument<TeamMemberSchemaShape>;

export const TeamMember = model("TeamMember", teamMemberSchema);
