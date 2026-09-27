/**
 * Seeds the CMS collections with Christ Life's real, already-public
 * content — the same text/links currently hardcoded in the public pages —
 * so the database doesn't start empty once the public site switches to
 * reading from the API.
 *
 * Idempotent by design, not by accident: each collection is only ever
 * seeded while it is completely empty. Re-running this script after an
 * admin has created/edited/deleted things through the dashboard is a
 * no-op for that collection — it will not resurrect a deleted record or
 * duplicate anything. (The one edge case: deleting *every* record in a
 * collection and then re-running this script would repopulate the
 * original seed content, since "empty" is what triggers seeding. That's
 * intentional — it's still real content, never fabricated — but worth
 * knowing.)
 *
 * Run with: npm run seed-content
 */
import { connectToDatabase, disconnectFromDatabase } from "../config/db";
import { Event } from "../models/Event";
import { GalleryItem } from "../models/GalleryItem";
import { Testimonial } from "../models/Testimonial";
import { BibleStudy, BIBLE_STUDY_SINGLETON_ID } from "../models/BibleStudy";
import { SiteSettings, SITE_SETTINGS_SINGLETON_ID } from "../models/SiteSettings";

// The real WhatsApp link every "Join WhatsApp" button on the live site
// points to today (see src/components/Navigation.tsx, src/pages/*.tsx).
const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/IrsmtYoFqur9dkK1dSLVhu?s=cl&p=i&mlu=4";
const MEET_URL = "https://meet.google.com/see-egjy-ruo";

const seedEvents = async () => {
  if ((await Event.countDocuments()) > 0) {
    console.log("Events: already has data, skipping.");
    return;
  }

  await Event.insertMany([
    {
      title: "Weekly Bible Study and Prayer",
      description:
        "Deep Bible study, discussion, prayer, and fellowship as we grow together in our understanding of God's Word.",
      dateLabel: "Every Monday, Tuesday & Thursday",
      time: "10:00 – 11:00 PM",
      location: "Google Meet",
      category: "Bible Study",
      coverImageUrl: "/gallery/photos/group1.jpeg",
      link: WHATSAPP_GROUP_URL,
      featured: true,
      published: true,
    },
    {
      title: "Door - Door Evangelism",
      description: "Grassroots outreach, personal connection.",
      dateLabel: "TBA",
      time: "Afternoon",
      location: "In-Person",
      category: "Outreach",
      coverImageUrl: "/gallery/photos/group1.jpeg",
      published: true,
    },
    {
      title: "Reconciliation Conference",
      description: "Conference that bring youth together to reconciled with Christ.",
      dateLabel: "TBA",
      time: "Afternoon",
      location: "In-Person",
      category: "Outreach",
      coverImageUrl: "/gallery/photos/group1.jpeg",
      published: true,
    },
    {
      title: "Anniversary",
      description: "Celebration of growth and impact.",
      dateLabel: "TBA",
      time: "Afternoon",
      location: "In-Person",
      category: "Outreach",
      coverImageUrl: "/gallery/photos/group1.jpeg",
      published: true,
    },
  ]);
  console.log("Events: seeded 4 events.");
};

const seedGallery = async () => {
  if ((await GalleryItem.countDocuments()) > 0) {
    console.log("Gallery: already has data, skipping.");
    return;
  }

  const photos = [
    {
      title: "Fellowship gathering",
      caption: "Christ Life members posing together at an evening outdoor gathering, holding food and drinks.",
      mediaUrl: "/gallery/photos/group1.jpeg",
    },
    {
      title: "Community picnic",
      caption: "Young people at an outdoor picnic, one wearing a shirt that reads “Live His Life, Do His Work.”",
      mediaUrl: "/gallery/photos/group2.jpeg",
    },
    {
      title: "Indoor fellowship",
      caption: "Young people standing together indoors as one member speaks into a microphone.",
      mediaUrl: "/gallery/photos/group3.jpeg",
    },
    {
      title: "Prayer time",
      caption: "Young man kneeling with his head bowed, praying into a microphone.",
      mediaUrl: "/gallery/photos/praying1.jpeg",
    },
    {
      title: "Moment of prayer",
      caption: "Young man sitting on the floor with his eyes closed and hands held to his face in prayer.",
      mediaUrl: "/gallery/photos/praying2.jpeg",
    },
    {
      title: "Worship night",
      caption: "Two people embracing in front of a stage with a drum kit and stage lighting.",
      mediaUrl: "/gallery/photos/praying3.jpeg",
    },
    {
      title: "Football outreach",
      caption: "Group of young men in white football kits posing with a ball on a dirt pitch.",
      mediaUrl: "/gallery/photos/officialImg01.jpeg",
    },
    {
      title: "Fellowship meal",
      caption: "Young people standing along a long table of food and refreshments in a meeting room.",
      mediaUrl: "/gallery/photos/officialImg02.jpeg",
    },
    {
      title: "Women's football team",
      caption: "Women in neon-green football kits sitting in a line on a dirt field.",
      mediaUrl: "/gallery/photos/officialImg03.jpeg",
    },
    {
      title: "Team meeting",
      caption: "Smiling young woman at a long table during a group meeting, with a speaker at the far end of the room.",
      mediaUrl: "/gallery/photos/officialImg04.jpeg",
    },
    {
      title: "Women's football outreach",
      caption: "Group of young women in pink and blue football kits posing with a ball on a dirt pitch.",
      mediaUrl: "/gallery/photos/officialImg05.jpeg",
    },
    {
      title: "Football team",
      caption: "Football team in white and green kits posing on a pitch with a woman in a white jersey.",
      mediaUrl: "/gallery/photos/officialImg06.jpeg",
    },
  ].map((photo) => ({ ...photo, type: "photo" as const, published: true }));

  const videos = Array.from({ length: 6 }, (_, i) => ({
    type: "video" as const,
    title: `Christ Life community video ${i + 1}`,
    caption: "",
    mediaUrl: `/gallery/videos/officialVideo0${i + 1}.mp4`,
    published: true,
  }));

  await GalleryItem.insertMany([...photos, ...videos]);
  console.log(`Gallery: seeded ${photos.length} photos and ${videos.length} videos.`);
};

const seedTestimonials = async () => {
  if ((await Testimonial.countDocuments()) > 0) {
    console.log("Testimonials: already has data, skipping.");
    return;
  }

  await Testimonial.insertMany([
    {
      author: "Emily Emily",
      role: "Member",
      quote:
        "Joining Christ life has strengthened my faith, my prayer life, and my relationship with God. The sermons and the people here have encouraged me a lot. I'm growing, and I'm thankful for how God is using this organization in my life",
      published: true,
    },
    {
      author: "Thomas Surprise Dugbeh Jr.",
      role: "Member",
      quote: "Being part of Christ's life has helped strengthen my communication and relationship with God",
      published: true,
    },
  ]);
  console.log("Testimonials: seeded 2 testimonials.");
};

const seedBibleStudy = async () => {
  const existing = await BibleStudy.findById(BIBLE_STUDY_SINGLETON_ID);
  if (existing) {
    console.log("Bible Study: already configured, skipping.");
    return;
  }

  await BibleStudy.create({
    _id: BIBLE_STUDY_SINGLETON_ID,
    sessions: [
      { day: "Monday", title: "Monday Female Bible Study" },
      { day: "Tuesday", title: "Tuesday Bible Study" },
      { day: "Thursday", title: "Thursday Prayer" },
    ],
    time: "10:00 – 11:00 PM",
    platform: "Google Meet / WhatsApp",
    meetUrl: MEET_URL,
    whatsappUrl: WHATSAPP_GROUP_URL,
    description: "",
    published: true,
  });
  console.log("Bible Study: seeded the Monday/Tuesday/Thursday schedule.");
};

const seedSettings = async () => {
  const existing = await SiteSettings.findById(SITE_SETTINGS_SINGLETON_ID);
  if (existing) {
    console.log("Settings: already configured, skipping.");
    return;
  }

  await SiteSettings.create({
    _id: SITE_SETTINGS_SINGLETON_ID,
    organizationName: "Christ Life",
    tagline: "Discovering, following, and sharing Christ.",
    email: "pjsaydyu@gmail.com",
    whatsappDisplay: "+231 778 282 210",
    whatsappChannelUrl: WHATSAPP_GROUP_URL,
    facebookUrl: "https://www.facebook.com/share/1DDubvaPmz/?milbextid=wwXlfr",
  });
  console.log("Settings: seeded organization/contact info.");
};

const run = async () => {
  await connectToDatabase();
  await seedEvents();
  await seedGallery();
  await seedTestimonials();
  await seedBibleStudy();
  await seedSettings();
};

run()
  .catch((error) => {
    console.error("Seeding failed:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });
