import { z } from "zod";

/**
 * Shared "is this a usable URL" checks, used by every optional
 * link/image/video field (Event.link, Event.coverImageUrl,
 * GalleryItem.mediaUrl, GalleryItem.thumbnailUrl, TeamMember.imageUrl, …).
 *
 * Centralized after a reported bug where adding an RSVP link to an
 * existing event could fail with "Must be a full http(s) URL." even for a
 * genuinely valid URL. That exact case (create without a link, then PATCH
 * one in) was tested directly against this validator + the update route
 * and did not reproduce — see server/src/scripts/smokeTestContent.ts's
 * "RSVP URL" checks. What *did* turn up a real, related defect: every
 * field's validation error used the exact same generic message with no
 * indication of which field failed, so a bad `coverImageUrl` sitting next
 * to a perfectly valid new `link` value looked, from the error alone,
 * like the link itself was rejected. Fixed in two places:
 *   1. Here: swapped a hand-rolled regex for `new URL()`, which is the
 *      correct way to validate a URL's structure (handles things a regex
 *      easily misses — ports, userinfo, IPv6 hosts, unicode domains, a
 *      copy-pasted URL with surrounding whitespace, etc.) and rejects
 *      protocols other than http/https explicitly.
 *   2. utils/crudFactory.ts and the controllers now report the field path
 *      alongside the message ("coverImageUrl: Must be a full http(s)
 *      URL."), and the dashboard forms show each error under its own
 *      field instead of one ambiguous toast.
 */
const isHttpUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

/** A URL that must be present. */
export const requiredUrl = (message = "A full http(s) URL is required.") =>
  z.string().trim().max(2048).refine(isHttpUrl, message);

/** A URL field that's fine left blank, but must be a real http(s) URL if it's filled in. */
export const optionalUrl = (message = "Must be a full http(s) URL.") =>
  z
    .string()
    .trim()
    .max(2048)
    .refine((value) => value === "" || isHttpUrl(value), message)
    .optional()
    .default("");

/**
 * Like optionalUrl, but also accepts a site-relative path ("/gallery/…")
 * for media that's served from this app's own public/ folder rather than
 * an external host or Cloudinary.
 */
export const optionalUrlOrPath = (message = "Must be a full http(s) URL or a site path starting with /.") =>
  z
    .string()
    .trim()
    .max(2048)
    .refine((value) => value === "" || value.startsWith("/") || isHttpUrl(value), message)
    .optional()
    .default("");
