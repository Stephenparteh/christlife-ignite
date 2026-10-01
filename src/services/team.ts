import { apiFetch } from "@/lib/apiClient";
import type { TeamMember, TeamMemberInput } from "@/types/cms";

export const teamService = {
  list: () => apiFetch<{ items: TeamMember[] }>("/team").then((r) => r.items),
  get: (id: string) => apiFetch<{ item: TeamMember }>(`/team/${id}`).then((r) => r.item),
  create: (input: Partial<TeamMemberInput>) =>
    apiFetch<{ item: TeamMember }>("/team", { method: "POST", body: input }).then((r) => r.item),
  update: (id: string, input: Partial<TeamMemberInput>) =>
    apiFetch<{ item: TeamMember }>(`/team/${id}`, { method: "PATCH", body: input }).then((r) => r.item),
  remove: (id: string) => apiFetch<{ message: string }>(`/team/${id}`, { method: "DELETE" }),
};
