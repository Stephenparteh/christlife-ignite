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
