import { apiFetch } from "@/lib/apiClient";
import type {
  GivingMethod,
  GivingMethodInput,
  GivingRequest,
  GivingRequestCreateInput,
  GivingRequestFilters,
  GivingRequestListResponse,
  GivingRequestStatus,
  PublicGivingMethod,
} from "@/types/cms";

/** Public: active giving methods, public fields only. */
export const givingMethodsPublicService = {
  list: () => apiFetch<{ items: PublicGivingMethod[] }>("/giving-methods").then((r) => r.items),
};

export const givingRequestsPublicService = {
  create: (input: GivingRequestCreateInput) =>
    apiFetch<{ success: boolean; message: string; data: { id: string; status: string } }>("/giving-requests", {
      method: "POST",
      body: input,
    }),
};

/** Admin (session cookie required). */
export const givingMethodsAdminService = {
  list: () => apiFetch<{ items: GivingMethod[] }>("/admin/giving-methods").then((r) => r.items),
  create: (input: Partial<GivingMethodInput>) =>
    apiFetch<{ item: GivingMethod }>("/admin/giving-methods", { method: "POST", body: input }).then((r) => r.item),
  update: (id: string, input: Partial<GivingMethodInput>) =>
    apiFetch<{ item: GivingMethod }>(`/admin/giving-methods/${id}`, { method: "PATCH", body: input }).then(
      (r) => r.item,
    ),
  reorder: (ids: string[]) =>
    apiFetch<{ items: GivingMethod[] }>("/admin/giving-methods/reorder", { method: "PUT", body: { ids } }).then(
      (r) => r.items,
    ),
  remove: (id: string) => apiFetch<{ message: string }>(`/admin/giving-methods/${id}`, { method: "DELETE" }),
};

export const givingRequestsAdminService = {
  list: (filters: GivingRequestFilters) => {
    const params = new URLSearchParams({ page: String(filters.page), limit: "20" });
    if (filters.q) params.set("q", filters.q);
    if (filters.status) params.set("status", filters.status);
    if (filters.purpose) params.set("purpose", filters.purpose);
    if (filters.methodId) params.set("methodId", filters.methodId);
    return apiFetch<GivingRequestListResponse>(`/admin/giving-requests?${params.toString()}`);
  },
  update: (id: string, input: { status?: GivingRequestStatus; adminNotes?: string }) =>
    apiFetch<{ item: GivingRequest }>(`/admin/giving-requests/${id}`, { method: "PATCH", body: input }).then(
      (r) => r.item,
    ),
  remove: (id: string) => apiFetch<{ message: string }>(`/admin/giving-requests/${id}`, { method: "DELETE" }),
};
