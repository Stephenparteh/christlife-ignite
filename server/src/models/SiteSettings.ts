import { Schema, model, type InferSchemaType, type HydratedDocument } from "mongoose";

/** Fixed id so there is exactly one settings document, ever. */
export const SITE_SETTINGS_SINGLETON_ID = "site-settings";

const siteSettingsSchema = new Schema(
  {
    _id: { type: String, default: SITE_SETTINGS_SINGLETON_ID },
    organizationName: { type: String, trim: true, default: "" },
    tagline: { type: String, trim: true, default: "" },
    email: { type: String, trim: true, lowercase: true, default: "" },
    whatsappDisplay: { type: String, trim: true, default: "" },
    whatsappChannelUrl: { type: String, trim: true, default: "" },
    facebookUrl: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export type SiteSettingsSchemaShape = InferSchemaType<typeof siteSettingsSchema>;
export type SiteSettingsDocument = HydratedDocument<SiteSettingsSchemaShape>;

export const SiteSettings = model("SiteSettings", siteSettingsSchema);
