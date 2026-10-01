import { useQuery } from "@tanstack/react-query";
import { teamService } from "@/services/team";
import type { TeamMember } from "@/types/cms";

/** Same 5 real leaders the CMS is seeded with — see server/src/scripts/seedContent.ts. */
const STATIC_FALLBACK: TeamMember[] = [
  { name: "Phil Julius Railey", role: "CEO/Founder", imageUrl: "/team/phil.jpeg", order: 0 },
  { name: "Ma-Lois D Cheyee", role: "Executive Director", imageUrl: "/team/ma-lois.jpeg", order: 1 },
  { name: "Min. Blessing M Jonah", role: "Worship & Women's Ministry Leader", imageUrl: "/team/blessing.jpeg", order: 2 },
  { name: "Jorii S. Kullie", role: "Secretary", imageUrl: "/team/jorii.jpeg", order: 3 },
  { name: "Gracesia Angel Vienn", role: "Chief Operating Officer", imageUrl: "/team/gracesia.jpeg", order: 4 },
].map((m, i) => ({
  ...m,
  _id: `static-fallback-${i}`,
  bio: "",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  published: true,
  createdAt: "",
  updatedAt: "",
}));

/**
 * Leadership profiles shown on the About page. Always returns a usable
 * value — while loading, or if the API is briefly unreachable, callers get
 * the same 5 real leaders the site already shipped with instead of a
 * blank section.
 */
export const useTeam = () => {
  const query = useQuery({
    queryKey: ["team", "public"],
    queryFn: teamService.list,
    staleTime: 5 * 60 * 1000,
  });

  return { ...query, team: query.data ?? STATIC_FALLBACK };
};
