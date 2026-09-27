import { apiFetch } from "@/lib/apiClient";
import type { SiteSettings, SiteSettingsInput } from "@/types/cms";

export const settingsService = {
  get: () => apiFetch<{ settings: SiteSettings }>("/settings").then((r) => r.settings),
  update: (input: SiteSettingsInput) =>
    apiFetch<{ settings: SiteSettings }>("/settings", { method: "PATCH", body: input }).then((r) => r.settings),
};
