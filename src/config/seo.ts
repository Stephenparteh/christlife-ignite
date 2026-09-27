/**
 * Central SEO configuration for Christ Life.
 *
 * Used in two places so they can never drift apart:
 *  - `vite-plugin-seo.ts` writes per-route <head> tags into the built HTML,
 *    plus sitemap.xml and the robots.txt sitemap line.
 *  - `src/components/Seo.tsx` keeps the same tags in sync on client-side navigation.
 *
 * This file must stay free of browser/Vite-only APIs (no `import.meta.env`,
 * no `@/` alias) because the Vite config imports it in Node.
 *
 * The final domain is NOT hard-coded. Set VITE_SITE_URL in `.env.production`
 * once the custom domain is connected (e.g. https://www.example.org).
 * Until then, canonical / og:url / og:image / sitemap output is skipped.
 */
import { siteConfig } from "./site";

export interface PageSeo {
  /** Route path, no trailing slash except "/" */
  path: string;
  title: string;
  description: string;
  /** Add to noindex pages; they are also left out of sitemap.xml */
  noindex?: boolean;
  /** Set false for routes that should not be pre-rendered/listed (404) */
  prerender?: boolean;
}

export const SITE_NAME = siteConfig.name;

/** Social preview image (1200x630), lives in /public so its URL is stable. */
export const OG_IMAGE_PATH = "/og-image.jpg";
export const OG_IMAGE_ALT =
  "Members of the Christ Life youth community gathered together at an evening fellowship";
export const LOGO_PATH = "/logo.png";

export const pages: PageSeo[] = [
  {
    path: "/",
    title: "Christ Life | Christian Youth Community in Liberia",
    description:
      "Christ Life is a Christian youth organization in Liberia. Join our weekly Bible study, prayer, and fellowship as we discover, follow, and share Christ.",
  },
  {
    path: "/about",
    title: "About Christ Life | Christian Organization in Liberia",
    description:
      "Learn about Christ Life, a Christian organization in Liberia helping young people discover, follow, and share Christ through Bible study, outreach, and community.",
  },
  {
    path: "/bible-study",
    title: "Bible Study & Fellowship in Liberia | Christ Life",
    description:
      "Join Christ Life's Bible study and Christian fellowship in Liberia. Study Scripture, discuss, and pray together online through Google Meet and WhatsApp.",
  },
  {
    path: "/events",
    title: "Christian Youth Events in Liberia | Christ Life",
    description:
      "Christian youth events in Liberia with Christ Life: weekly Bible study and prayer, door-to-door evangelism, a reconciliation conference, and our anniversary celebration.",
  },
  {
    path: "/gallery",
    title: "Photo & Video Gallery | Christ Life",
    description:
      "Photos and videos of Christ Life community gatherings, fellowship, prayer, and events.",
  },
  {
    path: "/contact",
    title: "Contact Christ Life | Connect With Our Community",
    description:
      "Get in touch with Christ Life. Send a message or prayer request, join our WhatsApp community, or follow us on Facebook.",
  },
  {
    // Template-era page that is not linked from the site; keep it out of search.
    path: "/get-involved",
    title: "Get Involved | Christ Life",
    description: "Ways to get involved with Christ Life.",
    noindex: true,
  },
];

/** Used for unknown routes (client-side 404). Never pre-rendered or listed. */
export const notFoundPage: PageSeo = {
  path: "*",
  title: "Page not found | Christ Life",
  description: "This page could not be found.",
  noindex: true,
  prerender: false,
};

export const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

export const findPage = (pathname: string): PageSeo =>
  pages.find((p) => p.path === normalizePath(pathname)) ?? notFoundPage;

/** Accepts "https://example.org", "https://example.org/", or "" (unset). */
export const normalizeSiteUrl = (raw: string | undefined | null) =>
  (raw ?? "").trim().replace(/\/+$/, "");

export const absoluteUrl = (siteUrl: string, path: string) =>
  `${siteUrl}${path === "/" ? "/" : path}`;

/* ------------------------------------------------------------------ */
/* Head tag model (rendered to a string at build, applied to DOM at runtime) */
/* ------------------------------------------------------------------ */

export interface HeadTag {
  tag: "title" | "meta" | "link" | "script";
  attrs?: Record<string, string>;
  text?: string;
}

const organizationJsonLd = (siteUrl: string) => {
  // Only facts that already exist on the site. No address, ratings, dates,
  // or social profiles are invented. `url`/`logo` need the final domain.
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    description:
      "Christ Life is a Christian youth organization in Liberia dedicated to discovering, following, and sharing Christ through Bible study, prayer, fellowship, and outreach.",
    areaServed: { "@type": "Country", name: "Liberia" },
    telephone: siteConfig.whatsapp.tel,
    founder: { "@type": "Person", name: "Phil Julius Railey" },
  };
  if (siteUrl) {
    data.url = `${siteUrl}/`;
    data.logo = `${siteUrl}${LOGO_PATH}`;
  }
  return data;
};

export const buildHeadTags = (page: PageSeo, siteUrl: string): HeadTag[] => {
  const url = siteUrl ? absoluteUrl(siteUrl, page.path) : "";
  const image = siteUrl ? `${siteUrl}${OG_IMAGE_PATH}` : "";
  const tags: HeadTag[] = [
    { tag: "title", text: page.title },
    { tag: "meta", attrs: { name: "description", content: page.description } },
  ];

  if (page.noindex) {
    tags.push({ tag: "meta", attrs: { name: "robots", content: "noindex, follow" } });
  }
  if (url && !page.noindex) {
    tags.push({ tag: "link", attrs: { rel: "canonical", href: url } });
  }

  tags.push(
    { tag: "meta", attrs: { property: "og:type", content: "website" } },
    { tag: "meta", attrs: { property: "og:site_name", content: SITE_NAME } },
    { tag: "meta", attrs: { property: "og:title", content: page.title } },
    { tag: "meta", attrs: { property: "og:description", content: page.description } },
  );
  if (url && !page.noindex) {
    tags.push({ tag: "meta", attrs: { property: "og:url", content: url } });
  }
  if (image) {
    tags.push(
      { tag: "meta", attrs: { property: "og:image", content: image } },
      { tag: "meta", attrs: { property: "og:image:width", content: "1200" } },
      { tag: "meta", attrs: { property: "og:image:height", content: "630" } },
      { tag: "meta", attrs: { property: "og:image:alt", content: OG_IMAGE_ALT } },
    );
  }

  tags.push(
    { tag: "meta", attrs: { name: "twitter:card", content: "summary_large_image" } },
    { tag: "meta", attrs: { name: "twitter:title", content: page.title } },
    { tag: "meta", attrs: { name: "twitter:description", content: page.description } },
  );
  if (image) {
    tags.push(
      { tag: "meta", attrs: { name: "twitter:image", content: image } },
      { tag: "meta", attrs: { name: "twitter:image:alt", content: OG_IMAGE_ALT } },
    );
  }

  if (page.path === "/") {
    tags.push({
      tag: "script",
      attrs: { type: "application/ld+json" },
      // "<" escaped so the JSON can never close the script tag early
      text: JSON.stringify(organizationJsonLd(siteUrl)).replace(/</g, "\\u003c"),
    });
  }

  return tags;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

/** Every generated tag carries data-seo so the runtime can swap them out. */
export const renderHeadTags = (tags: HeadTag[]) =>
  tags
    .map(({ tag, attrs = {}, text }) => {
      const attrString = Object.entries({ ...attrs, "data-seo": "" })
        .map(([k, v]) => (v === "" ? k : `${k}="${escapeHtml(v)}"`))
        .join(" ");
      if (tag === "meta" || tag === "link") return `<${tag} ${attrString} />`;
      const body = tag === "title" ? escapeHtml(text ?? "") : text ?? "";
      return `<${tag} ${attrString}>${body}</${tag}>`;
    })
    .join("\n    ");

export const SEO_START = "<!--seo:start-->";
export const SEO_END = "<!--seo:end-->";

/** Replace the marked block in an HTML document with tags for `page`. */
export const injectHead = (html: string, page: PageSeo, siteUrl: string) => {
  const start = html.indexOf(SEO_START);
  const end = html.indexOf(SEO_END);
  if (start === -1 || end === -1) return html;
  const block = renderHeadTags(buildHeadTags(page, siteUrl));
  return `${html.slice(0, start + SEO_START.length)}\n    ${block}\n    ${html.slice(end)}`;
};

export const buildSitemap = (siteUrl: string) => {
  const urls = pages
    .filter((p) => !p.noindex)
    .map((p) => `  <url>\n    <loc>${escapeHtml(absoluteUrl(siteUrl, p.path))}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
};
