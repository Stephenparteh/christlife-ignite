import { apiFetch } from "@/lib/apiClient";
import type { GalleryItem, GalleryItemInput } from "@/types/cms";

export const galleryService = {
  list: () => apiFetch<{ items: GalleryItem[] }>("/gallery").then((r) => r.items),
  get: (id: string) => apiFetch<{ item: GalleryItem }>(`/gallery/${id}`).then((r) => r.item),
  create: (input: Partial<GalleryItemInput>) =>
    apiFetch<{ item: GalleryItem }>("/gallery", { method: "POST", body: input }).then((r) => r.item),
  update: (id: string, input: Partial<GalleryItemInput>) =>
    apiFetch<{ item: GalleryItem }>(`/gallery/${id}`, { method: "PATCH", body: input }).then((r) => r.item),
  remove: (id: string) => apiFetch<{ message: string }>(`/gallery/${id}`, { method: "DELETE" }),
};
