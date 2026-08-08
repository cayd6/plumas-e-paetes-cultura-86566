// Generates public/sitemap.xml before dev and build (predev/prebuild hooks).

import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://institutoplumasepaetescultural.org";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
  { path: "/sobre", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/premio", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/edicoes", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/revista", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/producao", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/galeria", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/blog", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/eventos", changefreq: "monthly", priority: "0.7", lastmod: today },
  { path: "/noticias", changefreq: "weekly", priority: "0.8", lastmod: today },
  { path: "/memoria", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/imprensa", changefreq: "monthly", priority: "0.8", lastmod: today },
  { path: "/parcerias", changefreq: "monthly", priority: "0.9", lastmod: today },
  { path: "/contato", changefreq: "monthly", priority: "0.7", lastmod: today },
];

// Dynamic content (blog posts, magazine editions, honored people)
async function loadDynamic(): Promise<SitemapEntry[]> {
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  const headers = { apikey: key, Authorization: `Bearer ${key}` };
  const extras: SitemapEntry[] = [];
  try {
    const posts = await fetch(`${url}/rest/v1/blog_posts?select=slug,updated_at&published=eq.true`, { headers });
    if (posts.ok) {
      const rows = (await posts.json()) as Array<{ slug: string; updated_at: string }>;
      rows.forEach((r) => extras.push({ path: `/blog/${r.slug}`, lastmod: r.updated_at?.slice(0, 10), changefreq: "monthly", priority: "0.6" }));
    }
  } catch { /* ignore network errors during build */ }
  return extras;
}

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ].filter(Boolean).join("\n")
  );
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const dynamic = await loadDynamic();
const all = [...entries, ...dynamic];
writeFileSync(resolve("public/sitemap.xml"), generateSitemap(all));
console.log(`sitemap.xml written (${all.length} entries)`);
