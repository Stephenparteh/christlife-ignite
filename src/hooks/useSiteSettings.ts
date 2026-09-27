import { useQuery } from "@tanstack/react-query";
import { settingsService } from "@/services/settings";
import { siteConfig } from "@/config/site";
import type { SiteSettings } from "@/types/cms";

/** Same values the CMS is seeded with — see server/src/scripts/seedContent.ts. */
const STATIC_FALLBACK: SiteSettings = {
  _id: "static-fallback",
  organizationName: siteConfig.name,
  tagline: siteConfig.tagline,
  email: siteConfig.email,
  whatsappDisplay: siteConfig.whatsapp.display,
  whatsappChannelUrl: siteConfig.whatsapp.channelUrl,
  facebookUrl: siteConfig.social.facebook,
  createdAt: "",
  updatedAt: "",
};

/**
 * Public-facing contact/social settings, shared by the Footer and Contact
 * page. Always returns a usable value — while loading, or if the API is
 * briefly unreachable, callers get the same values the site already
 * shipped with instead of a blank/broken footer.
 */
export const useSiteSettings = () => {
  const query = useQuery({
    queryKey: ["settings", "public"],
    queryFn: settingsService.get,
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, settings: query.data ?? STATIC_FALLBACK };
};
