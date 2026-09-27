import { apiFetch } from "@/lib/apiClient";
import type { Testimonial, TestimonialInput } from "@/types/cms";

export const testimonialsService = {
  list: () => apiFetch<{ items: Testimonial[] }>("/testimonials").then((r) => r.items),
  get: (id: string) => apiFetch<{ item: Testimonial }>(`/testimonials/${id}`).then((r) => r.item),
  create: (input: Partial<TestimonialInput>) =>
    apiFetch<{ item: Testimonial }>("/testimonials", { method: "POST", body: input }).then((r) => r.item),
  update: (id: string, input: Partial<TestimonialInput>) =>
    apiFetch<{ item: Testimonial }>(`/testimonials/${id}`, { method: "PATCH", body: input }).then((r) => r.item),
  remove: (id: string) => apiFetch<{ message: string }>(`/testimonials/${id}`, { method: "DELETE" }),
};
