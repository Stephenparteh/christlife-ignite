/**
 * Central place for Christ Life contact + link details.
 * Keeping this here makes it easy to swap for backend-provided data later.
 */
export const siteConfig = {
  name: "Christ Life",
  tagline: "Discovering, following, and sharing Christ.",
  email: "pjsaydyu@gmail.com",
  whatsapp: {
    display: "+231 778 282 210",
    tel: "+231778282210",
    channelUrl: "https://whatsapp.com/channel/0029VbAhuJw1XquNoRtWzl44",
  },
  meetUrl: "https://meet.google.com/see-egjy-ruo",
  social: {
    facebook:
      "https://www.facebook.com/share/1DDubvaPmz/?milbextid=wwXlfr",
  },
  bibleStudy: {
    days: "Tuesdays & Thursdays",
    time: "10:00 – 11:00 PM",
    platform: "Google Meet / WhatsApp",
  },
} as const;
