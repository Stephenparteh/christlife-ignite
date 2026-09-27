import { apiFetch } from "@/lib/apiClient";
import type { BibleStudy, BibleStudyInput } from "@/types/cms";

export const bibleStudyService = {
  get: () => apiFetch<{ bibleStudy: BibleStudy }>("/bible-study").then((r) => r.bibleStudy),
  update: (input: BibleStudyInput) =>
    apiFetch<{ bibleStudy: BibleStudy }>("/bible-study", { method: "PATCH", body: input }).then((r) => r.bibleStudy),
};
