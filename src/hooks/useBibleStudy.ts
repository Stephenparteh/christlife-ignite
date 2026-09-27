import { useQuery } from "@tanstack/react-query";
import { bibleStudyService } from "@/services/bibleStudy";
import { siteConfig } from "@/config/site";
import type { BibleStudy } from "@/types/cms";

/** Same values the CMS is seeded with — see server/src/scripts/seedContent.ts. */
const STATIC_FALLBACK: BibleStudy = {
  _id: "static-fallback",
  sessions: [
    { day: "Monday", title: "Monday Female Bible Study" },
    { day: "Tuesday", title: "Tuesday Bible Study" },
    { day: "Thursday", title: "Thursday Prayer" },
  ],
  time: siteConfig.bibleStudy.time,
  platform: siteConfig.bibleStudy.platform,
  meetUrl: siteConfig.meetUrl,
  whatsappUrl: siteConfig.whatsapp.channelUrl,
  description: "",
  published: true,
  createdAt: "",
  updatedAt: "",
};

/**
 * Bible Study schedule/meeting info, shared by the Home and Bible Study
 * pages. Always returns a usable value — see useSiteSettings for why.
 */
export const useBibleStudy = () => {
  const query = useQuery({
    queryKey: ["bible-study", "public"],
    queryFn: bibleStudyService.get,
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, bibleStudy: query.data ?? STATIC_FALLBACK };
};
