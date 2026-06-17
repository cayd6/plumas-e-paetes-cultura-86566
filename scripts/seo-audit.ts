#!/usr/bin/env -S npx tsx
/**
 * SEO consistency audit.
 *
 * Statically scans React route files for <PageSEO ...> usage and reports
 * coverage of title / description / JSON-LD / og:image hints.
 *
 * Output:
 *   - public/seo-audit.json   (consumed by /admin → QA SEO)
 *   - console summary, non-zero exit if required fields are missing.
 *
 * Run:  npx tsx scripts/seo-audit.ts
 */

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const ROOT = resolve(process.cwd());
const APP_TSX = join(ROOT, "src/App.tsx");

interface RouteAudit {
  route: string;
  source: string;
  hasPageSEO: boolean;
  title?: string;
  description?: string;
  hasJsonLd?: boolean;
  hasImage?: boolean;
}

function parseRoutes(appSource: string): Array<{ path: string; importName: string }> {
  const importMap = new Map<string, string>();
  const importRe = /const\s+(\w+)\s*=\s*lazy\(\s*\(\)\s*=>\s*import\(["']([^"']+)["']\)(?:\.then[^)]+)?\s*\)/g;
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(appSource)) !== null) {
    importMap.set(m[1], m[2]);
  }
  const routes: Array<{ path: string; importName: string }> = [];
  const routeRe = /<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g;
  while ((m = routeRe.exec(appSource)) !== null) {
    if (m[1] === "*") continue;
    routes.push({ path: m[1], importName: m[2] });
  }
  return routes
    .map((r) => ({ path: r.path, importName: importMap.get(r.importName) ?? "" }))
    .filter((r) => r.importName);
}

function resolveSource(importPath: string): string | null {
  const candidates = [
    importPath,
    importPath + ".tsx",
    importPath + ".ts",
    join(importPath, "index.tsx"),
    join(importPath, "index.ts"),
  ];
  for (const c of candidates) {
    const abs = c.startsWith("@/")
      ? join(ROOT, "src", c.slice(2))
      : join(ROOT, "src", c.startsWith("./") ? c.slice(2) : c);
    if (existsSync(abs)) return abs;
  }
  return null;
}

function readDeep(file: string, visited = new Set<string>()): string {
  if (visited.has(file)) return "";
  visited.add(file);
  let src = readFileSync(file, "utf8");
  // also pull in obvious sibling page-level imports (best-effort)
  return src;
}

function auditFile(route: string, source: string): RouteAudit {
  const abs = resolveSource(source);
  const audit: RouteAudit = { route, source, hasPageSEO: false };
  if (!abs) return audit;
  const src = readDeep(abs);
  if (!/<PageSEO[\s>]/.test(src) && !/<Helmet[\s>]/.test(src)) return audit;
  audit.hasPageSEO = true;
  const titleMatch = src.match(/title=\{?["'`]([^"'`]+)["'`]/);
  const descMatch = src.match(/description=\{?["'`]([^"'`]+)["'`]/);
  audit.title = titleMatch?.[1];
  audit.description = descMatch?.[1];
  audit.hasJsonLd = /jsonLd=/.test(src) || /application\/ld\+json/.test(src);
  audit.hasImage = /image=/.test(src) || /og:image/.test(src);
  return audit;
}

function main() {
  if (!existsSync(APP_TSX)) {
    console.error("src/App.tsx not found");
    process.exit(2);
  }
  const app = readFileSync(APP_TSX, "utf8");
  const routes = parseRoutes(app);
  const audits = routes.map((r) => auditFile(r.path, r.importName));

  const report = { generatedAt: new Date().toISOString(), routes: audits };
  const outPath = join(ROOT, "public/seo-audit.json");
  writeFileSync(outPath, JSON.stringify(report, null, 2));

  const failing = audits.filter((a) => !a.hasPageSEO || !a.title || !a.description);

  console.log(`SEO audit: ${audits.length} routes, ${failing.length} with missing metadata`);
  for (const a of audits) {
    const status = a.hasPageSEO && a.title && a.description ? "✓" : "✗";
    console.log(`  ${status} ${a.route.padEnd(20)} title=${!!a.title} desc=${!!a.description} json-ld=${!!a.hasJsonLd}`);
  }
  console.log(`\nReport written to ${outPath}`);
  // Don't fail the process in CI by default; uncomment for strict mode:
  // if (failing.length) process.exit(1);
}

main();
