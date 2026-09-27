import { apiFetch } from "@/lib/apiClient";
import type { Event, EventInput } from "@/types/cms";

export const eventsService = {
  list: () => apiFetch<{ items: Event[] }>("/events").then((r) => r.items),
  get: (id: string) => apiFetch<{ item: Event }>(`/events/${id}`).then((r) => r.item),
  create: (input: Partial<EventInput>) =>
    apiFetch<{ item: Event }>("/events", { method: "POST", body: input }).then((r) => r.item),
  update: (id: string, input: Partial<EventInput>) =>
    apiFetch<{ item: Event }>(`/events/${id}`, { method: "PATCH", body: input }).then((r) => r.item),
  remove: (id: string) => apiFetch<{ message: string }>(`/events/${id}`, { method: "DELETE" }),
};
