import { apiFetch } from "@/lib/apiClient";
import type { ContactMessage, ContactMessageCreateInput } from "@/types/cms";

export const contactMessagesService = {
  list: () => apiFetch<{ items: ContactMessage[] }>("/contact-messages").then((r) => r.items),
  get: (id: string) => apiFetch<{ item: ContactMessage }>(`/contact-messages/${id}`).then((r) => r.item),
  create: (input: ContactMessageCreateInput) =>
    apiFetch<{ message: string }>("/contact-messages", { method: "POST", body: input }),
  setRead: (id: string, read: boolean) =>
    apiFetch<{ item: ContactMessage }>(`/contact-messages/${id}`, { method: "PATCH", body: { read } }).then(
      (r) => r.item,
    ),
  remove: (id: string) => apiFetch<{ message: string }>(`/contact-messages/${id}`, { method: "DELETE" }),
};
