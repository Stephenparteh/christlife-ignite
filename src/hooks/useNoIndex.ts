import { useEffect } from "react";

/**
 * Adds <meta name="robots" content="noindex, nofollow"> while the calling
 * component is mounted. Used by admin-only pages (login, dashboard) that
 * intentionally sit outside the public SEO setup in src/config/seo.ts.
 */
export const useNoIndex = () => {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => {
      meta.remove();
    };
  }, []);
};
