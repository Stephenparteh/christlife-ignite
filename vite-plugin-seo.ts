import fs from "node:fs";
import path from "node:path";
import { loadEnv, type Plugin } from "vite";
import {
  buildSitemap,
  injectHead,
  normalizeSiteUrl,
  pages,
} from "./src/config/seo";

/**
 * Build-time SEO output for this client-rendered SPA:
 *  - fills the <head> of index.html with the home page tags (dev + build)
 *  - writes dist/<route>/index.html for every route with its own title,
 *    description, canonical and Open Graph tags (so crawlers that don't run
 *    JavaScript, such as social link previews, still see the right metadata)
 *  - writes dist/sitemap.xml and adds a Sitemap line to dist/robots.txt
 *
 * Canonical/sitemap output needs VITE_SITE_URL (see src/config/seo.ts).
 */
export default function seoPlugin(): Plugin {
  let siteUrl = "";
  let outDir = "dist";
  let isBuild = false;

  return {
    name: "christlife-seo",

    configResolved(config) {
      isBuild = config.command === "build";
      outDir = path.resolve(config.root, config.build.outDir);
      siteUrl = normalizeSiteUrl(
        loadEnv(config.mode, config.root, "VITE_").VITE_SITE_URL,
      );
    },

    transformIndexHtml(html) {
      return injectHead(html, pages[0], siteUrl);
    },

    closeBundle() {
      if (!isBuild) return;
      const indexPath = path.join(outDir, "index.html");
      if (!fs.existsSync(indexPath)) return;
      const template = fs.readFileSync(indexPath, "utf8");

      for (const page of pages) {
        if (page.prerender === false || page.path === "/") continue;
        const dir = path.join(outDir, page.path);
        fs.mkdirSync(dir, { recursive: true });
        fs.writeFileSync(
          path.join(dir, "index.html"),
          injectHead(template, page, siteUrl),
        );
      }

      if (!siteUrl) {
        console.warn(
          "\n[seo] VITE_SITE_URL is not set: canonical, og:url, og:image and " +
            "sitemap.xml were skipped. Set it in .env.production once the " +
            "final domain is connected.\n",
        );
        return;
      }

      fs.writeFileSync(path.join(outDir, "sitemap.xml"), buildSitemap(siteUrl));

      const robotsPath = path.join(outDir, "robots.txt");
      const robots = fs.existsSync(robotsPath)
        ? fs.readFileSync(robotsPath, "utf8").trimEnd()
        : "User-agent: *\nAllow: /";
      fs.writeFileSync(
        robotsPath,
        `${robots}\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      );
    },
  };
}
