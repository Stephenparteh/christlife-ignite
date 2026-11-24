/**
 * Shared CMS entity types — the frontend's view of what the API in
 * server/src/models/*.ts returns. Mongo's _id comes back as a string over
 * JSON, which is all the frontend ever needs (no ObjectId handling here).
 */

export interface CmsTimestamps {
  createdAt: string;
  updatedAt: string;
}

export interface Event extends CmsTimestamps {
  _id: string;
  title: string;
  description: string;
  dateLabel: string;
  eventDate: string | null;
  time: string;
  location: string;
  category: string;
  coverImageUrl: string;
  link: string;
  featured: boolean;
  published: boolean;
}

export type EventInput = Omit<Event, "_id" | "createdAt" | "updatedAt">;

export interface GalleryItem extends CmsTimestamps {
  _id: string;
  type: "photo" | "video";
  title: string;
  caption: string;
  mediaUrl: string;
  thumbnailUrl: string;
  category: string;
  published: boolean;
}

export type GalleryItemInput = Omit<GalleryItem, "_id" | "createdAt" | "updatedAt">;

export interface Testimonial extends CmsTimestamps {
  _id: string;
  author: string;
  role: string;
  quote: string;
  imageUrl: string;
  published: boolean;
}

export type TestimonialInput = Omit<Testimonial, "_id" | "createdAt" | "updatedAt">;

export interface BibleStudySession {
  day: string;
  title: string;
  time: string;
  platform: string;
  meetUrl: string;
  whatsappUrl: string;
  description: string;
}

export interface BibleStudy extends CmsTimestamps {
  _id: string;
  sessions: BibleStudySession[];
  time: string;
  platform: string;
  meetUrl: string;
  whatsappUrl: string;
  description: string;
  published: boolean;
}

export type BibleStudyInput = Partial<Omit<BibleStudy, "_id" | "createdAt" | "updatedAt">>;

export interface SiteSettings extends CmsTimestamps {
  _id: string;
  organizationName: string;
  tagline: string;
  email: string;
  whatsappDisplay: string;
  whatsappChannelUrl: string;
  facebookUrl: string;
}

export type SiteSettingsInput = Partial<Omit<SiteSettings, "_id" | "createdAt" | "updatedAt">>;

export interface TeamMember extends CmsTimestamps {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
  bio: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  order: number;
  published: boolean;
}

export type TeamMemberInput = Omit<TeamMember, "_id" | "createdAt" | "updatedAt">;

export interface ContactMessage extends CmsTimestamps {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
}

export type ContactMessageCreateInput = Pick<ContactMessage, "name" | "email" | "subject" | "message">;

/* ------------------------------------------------------------------ */
/* Giving                                                              */
/* ------------------------------------------------------------------ */

export const GIVING_PURPOSES = [
  "General Giving",
  "Tithes",
  "Offering",
  "Missions",
  "Building / Development",
  "Community Outreach",
  "Other",
] as const;
export const GIVING_CURRENCIES = ["LRD", "USD"] as const;
export const GIVING_REQUEST_STATUSES = ["pending", "contacted", "completed", "closed"] as const;

export type GivingPurpose = (typeof GIVING_PURPOSES)[number];
export type GivingCurrency = (typeof GIVING_CURRENCIES)[number];
export type GivingRequestStatus = (typeof GIVING_REQUEST_STATUSES)[number];

export interface GivingMethodDetail {
  label: string;
  value: string;
}

/** What the public Giving page gets — no internal fields. */
export interface PublicGivingMethod {
  id: string;
  name: string;
  type: string;
  description: string;
  instructions: string;
  details: GivingMethodDetail[];
  imageUrl: string;
}

export interface GivingMethod extends CmsTimestamps {
  _id: string;
  name: string;
  type: string;
  description: string;
  instructions: string;
  details: GivingMethodDetail[];
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
}

export type GivingMethodInput = Pick<
  GivingMethod,
  "name" | "type" | "description" | "instructions" | "details" | "isActive"
>;

export interface GivingRequestCreateInput {
  fullName: string;
  phone: string;
  email: string;
  purpose: GivingPurpose;
  customPurpose: string;
  amount: number;
  currency: GivingCurrency;
  preferredMethodId: string;
  note: string;
}

export interface GivingRequest extends CmsTimestamps {
  _id: string;
  fullName: string;
  phone: string;
  email: string;
  purpose: GivingPurpose;
  customPurpose: string;
  amount: number;
  currency: GivingCurrency;
  preferredMethodId: string;
  preferredMethodName: string;
  note: string;
  status: GivingRequestStatus;
  adminNotes: string;
  contactedAt: string | null;
  completedAt: string | null;
}

export interface GivingRequestStats {
  total: number;
  pending: number;
  contacted: number;
  completed: number;
  closed: number;
}

export interface GivingRequestListResponse {
  items: GivingRequest[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  stats: GivingRequestStats;
}

export interface GivingRequestFilters {
  page: number;
  q: string;
  status: GivingRequestStatus | "";
  purpose: GivingPurpose | "";
  methodId: string;
}
