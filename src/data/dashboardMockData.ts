/**
 * TEMPORARY DEVELOPMENT DATA — Milestone 1 (dashboard UI) only.
 *
 * Nothing here is persisted or real "activity" — it exists so the dashboard
 * UI has something to render. Where possible it reuses real, already-public
 * content (siteConfig, the actual homepage testimonials, real gallery
 * photos) instead of inventing anything new, but the list contents below
 * (ids, "status", counts, "recent activity" timestamps) are illustrative
 * only.
 *
 * Milestone 3 replaces every array/object in this file with data fetched
 * from the Express/MongoDB API. Pages should keep importing from this one
 * module so that swap stays localized here instead of scattered through
 * the UI.
 */
import { siteConfig } from "@/config/site";

import group1 from "@/assets/group1.jpeg";
import group2 from "@/assets/group2.jpeg";
import group3 from "@/assets/group3.jpeg";
import praying1 from "@/assets/praying1.jpeg";
import praying2 from "@/assets/praying2.jpeg";
import officialImg01 from "@/assets/officialImg01.jpeg";
import officialImg04 from "@/assets/officialImg04.jpeg";
import officialVideo01 from "@/assets/officialVideo01.mp4";
import officialVideo02 from "@/assets/officialVideo02.mp4";

export type ContentStatus = "published" | "draft";

/* ------------------------------------------------------------------ */
/* Events — mirrors the real content on the public /events page.       */
/* ------------------------------------------------------------------ */

export interface DashboardEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
  description: string;
  status: ContentStatus;
}

export const mockEvents: DashboardEvent[] = [
  {
    id: "evt-featured",
    title: "Weekly Bible Study and Prayer",
    date: "Every Tuesday & Thursday",
    time: "10:00 – 11:00 PM",
    location: "Google Meet",
    category: "Bible Study",
    description:
      "Deep Bible study, discussion, prayer, and fellowship as we grow together in our understanding of God's Word.",
    status: "published",
  },
  {
    id: "evt-outreach-1",
    title: "Door - Door Evangelism",
    date: "TBA",
    time: "Afternoon",
    location: "In-Person",
    category: "Outreach",
    description: "Grassroots outreach, personal connection.",
    status: "draft",
  },
  {
    id: "evt-outreach-2",
    title: "Reconciliation Conference",
    date: "TBA",
    time: "Afternoon",
    location: "In-Person",
    category: "Outreach",
    description: "Conference that brings youth together to reconcile with Christ.",
    status: "draft",
  },
  {
    id: "evt-outreach-3",
    title: "Anniversary",
    date: "TBA",
    time: "Afternoon",
    location: "In-Person",
    category: "Outreach",
    description: "Celebration of growth and impact.",
    status: "draft",
  },
];

/* ------------------------------------------------------------------ */
/* Bible study — reuses the real schedule from src/config/site.ts.     */
/* ------------------------------------------------------------------ */

export interface BibleStudySession {
  id: string;
  day: string;
  title: string;
}

export const mockBibleStudySessions: BibleStudySession[] = [
  { id: "bs-mon", day: "Monday", title: "Ladies Bible Study" },
  { id: "bs-tue", day: "Tuesday", title: "Bible Study" },
  { id: "bs-thu", day: "Thursday", title: "Prayer" },
];

export const mockBibleStudyInfo = {
  days: siteConfig.bibleStudy.days,
  time: siteConfig.bibleStudy.time,
  platform: siteConfig.bibleStudy.platform,
  meetUrl: siteConfig.meetUrl,
  whatsappUrl: siteConfig.whatsapp.channelUrl,
  status: "published" as ContentStatus,
};

/* ------------------------------------------------------------------ */
/* Gallery — reuses real photos/videos already on the public site.     */
/* ------------------------------------------------------------------ */

export interface DashboardGalleryItem {
  id: string;
  type: "photo" | "video";
  title: string;
  thumbnail: string;
  status: ContentStatus;
}

export const mockGalleryItems: DashboardGalleryItem[] = [
  { id: "gal-1", type: "photo", title: "Fellowship gathering", thumbnail: group1, status: "published" },
  { id: "gal-2", type: "photo", title: "Community picnic", thumbnail: group2, status: "published" },
  { id: "gal-3", type: "photo", title: "Worship night", thumbnail: group3, status: "published" },
  { id: "gal-4", type: "photo", title: "Prayer session", thumbnail: praying1, status: "published" },
  { id: "gal-5", type: "photo", title: "Prayer time", thumbnail: praying2, status: "draft" },
  { id: "gal-6", type: "photo", title: "Football outreach", thumbnail: officialImg01, status: "published" },
  { id: "gal-7", type: "photo", title: "Team meeting", thumbnail: officialImg04, status: "draft" },
  { id: "gal-8", type: "video", title: "Community video", thumbnail: group1, status: "published" },
  { id: "gal-9", type: "video", title: "Fellowship highlight", thumbnail: group2, status: "draft" },
];

export const mockGalleryVideoFiles = [officialVideo01, officialVideo02];

/* ------------------------------------------------------------------ */
/* Testimonials — verbatim from the real homepage. Protected content:  */
/* never edit the quote/author/role wording, only "status" here.       */
/* ------------------------------------------------------------------ */

export interface DashboardTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  status: ContentStatus;
}

export const mockTestimonials: DashboardTestimonial[] = [
  {
    id: "test-1",
    quote:
      "Joining Christ life has strengthened my faith, my prayer life, and my relationship with God. The sermons and the people here have encouraged me a lot. I'm growing, and I'm thankful for how God is using this organization in my life",
    author: "Emily Emily",
    role: "Member",
    status: "published",
  },
  {
    id: "test-2",
    quote:
      "Being part of Christ's life has helped strengthen my communication and relationship with God",
    author: "Thomas Surprise Dugbeh Jr.",
    role: "Member",
    status: "published",
  },
];

/* ------------------------------------------------------------------ */
/* Contact — reuses siteConfig, the same source the public site uses.  */
/* ------------------------------------------------------------------ */

export const mockContactInfo = {
  email: siteConfig.email,
  whatsappDisplay: siteConfig.whatsapp.display,
  whatsappChannelUrl: siteConfig.whatsapp.channelUrl,
  facebookUrl: siteConfig.social.facebook,
};

/* ------------------------------------------------------------------ */
/* Settings — reuses siteConfig for the organization identity fields.  */
/* ------------------------------------------------------------------ */

export const mockOrganizationSettings = {
  name: siteConfig.name,
  tagline: siteConfig.tagline,
};

/* ------------------------------------------------------------------ */
/* Recent activity — sample entries only, for the overview page.       */
/* Derived from the mock content above, not from any real event log.   */
/* ------------------------------------------------------------------ */

export interface RecentActivityItem {
  id: string;
  label: string;
  target: string;
  relativeTime: string;
}

export const mockRecentActivity: RecentActivityItem[] = [
  { id: "act-1", label: "Event drafted", target: "Anniversary", relativeTime: "2 days ago" },
  { id: "act-2", label: "Gallery photo added", target: "Team meeting", relativeTime: "4 days ago" },
  { id: "act-3", label: "Testimonial published", target: "Thomas Surprise Dugbeh Jr.", relativeTime: "1 week ago" },
  { id: "act-4", label: "Bible study schedule confirmed", target: "Monday, Tuesday, Thursday", relativeTime: "2 weeks ago" },
];
