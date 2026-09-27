import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { buildHeadTags, findPage, normalizeSiteUrl } from "@/config/seo";

const siteUrl = normalizeSiteUrl(import.meta.env.VITE_SITE_URL);

/**
 * Keeps <title>, meta description, canonical, Open Graph and JSON-LD in sync
 * with the current route on client-side navigation. The initial values are
 * already in the HTML (see vite-plugin-seo.ts); this only swaps them.
 * Renders nothing.
 */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const tags = buildHeadTags(findPage(pathname), siteUrl);

    document.head
      .querySelectorAll("[data-seo]")
      .forEach((el) => el.remove());

    for (const { tag, attrs = {}, text } of tags) {
      const el = document.createElement(tag);
      el.setAttribute("data-seo", "");
      Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
      if (text) el.textContent = text;
      document.head.appendChild(el);
    }
  }, [pathname]);

  return null;
};

export default Seo;
