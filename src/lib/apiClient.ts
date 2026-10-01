/**
 * Thin fetch wrapper for talking to the Express API.
 *
 * In dev, requests go to a relative "/api/..." path that Vite's dev server
 * proxies to the backend (see vite.config.ts) — same-origin from the
 * browser's point of view, so cookies just work with zero CORS setup. In
 * production, set VITE_API_URL if the API ends up on a different origin
 * than the static site; leave it empty if they share a domain.
 */
const API_BASE = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "");

export class ApiClientError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { body, headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${API_BASE}/api${path}`, {
      ...rest,
      credentials: "include",
      headers: {
        ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiClientError(0, "Couldn't reach the server. Check your connection and try again.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = (data && typeof data === "object" && "message" in data && typeof data.message === "string")
      ? data.message
      : "Something went wrong. Please try again.";
    throw new ApiClientError(response.status, message);
  }

  return data as T;
}

/**
 * Multipart upload — kept separate from apiFetch because it must NOT set a
 * JSON Content-Type header; the browser sets the correct multipart
 * boundary itself as long as the body is a FormData and we leave that
 * header alone.
 */
export async function apiUpload(
  path: string,
  file: File,
  fields: Record<string, string> = {},
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const query = new URLSearchParams(fields).toString();
  const url = `${API_BASE}/api${path}${query ? `?${query}` : ""}`;

  let response: Response;
  try {
    response = await fetch(url, { method: "POST", credentials: "include", body: formData });
  } catch {
    throw new ApiClientError(0, "Couldn't reach the server. Check your connection and try again.");
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    const message = (data && typeof data === "object" && "message" in data && typeof data.message === "string")
      ? data.message
      : "Something went wrong. Please try again.";
    throw new ApiClientError(response.status, message);
  }

  return data as { url: string };
}
