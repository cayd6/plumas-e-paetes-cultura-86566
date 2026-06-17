## Phase 4 — Editorial Governance, Bulk Ops & QA

Preserves Phase 1–3 baseline (hero image/animations, serif headings, header language controls, homepage hierarchy, /memoria /imprensa /parcerias, admin panel, real impact numbers, PageSEO + tracking).

---

### 1. Draft / Publish workflow (DB)

Single migration adding editorial status to key collections:

- Add `status text not null default 'draft' check (status in ('draft','published','archived'))` and `published_at timestamptz` to:
  - `honored_people`, `partners`, `press_kit_assets`, `blog_posts`, `magazine_editions`, `testimonials`, `portfolio_projects`, `timeline_events`
- Backfill existing rows → `status='published'`, `published_at = coalesce(created_at, now())`
- Update **public-read RLS policies** on each table to require `status='published'` for anon; keep admin policies unchanged so editors see all rows
- Indexes on `(status, published_at desc)` for fast listing

No grants change (tables already grant-correct).

### 2. CSV bulk import/export (admin only)

New file `src/lib/csv.ts` with tiny dependency-free parse/serialize (RFC4180-ish) + zod row schemas.

In `src/pages/admin/MemoryAssetsAdmin.tsx`:
- Per-tab **Export CSV** button → downloads current filtered rows with all PT/EN fields + status
- Per-tab **Import CSV** button → file picker → preview dialog (valid / invalid rows, dedup by `slug` or `name`) → batch upsert via supabase client
- Supported: `honored_people`, `partners` (press_kit_assets stays manual — files involved)

### 3. Admin list QA improvements

In the Memory/Press admin:
- Sortable columns (year, name, updated_at, status)
- Status badge column (draft / published / archived) + inline status toggle
- **Language completeness** indicator: PT ✓ / EN ✓ chips per row, computed from required `*_en` fields
- Search box (already partially present — extend to all tabs)
- Filter chips: status, language completeness, year/category where applicable
- Bulk select + bulk publish / unpublish / delete

Shared component: `src/components/admin/EditorialTable.tsx` to keep all three tabs consistent.

### 4. Tracking QA layer

`src/lib/tracking.ts`:
- Export typed `CtaClickEvent` schema enforcing snake_case `cta_id`, `cta_category` union, and auto-injected `page_lang` (from `LanguageContext`) + `page_path`
- Dev-only `validateCtaEvent()` that warns on missing/invalid fields
- `window.__lovableTrackingDebug = true` toggle to log every event

New `src/pages/admin/TrackingQA.tsx` (route `/admin/qa/tracking`):
- Enables debug mode
- Live table of `dataLayer` events captured this session
- Per-event validation status (✓ / warnings)
- "Replay last event" + copy-as-JSON for spec confirmation

Audit pass: grep all `trackCtaClick(` call sites, ensure each uses snake_case ids and a typed category. Fix any drift.

### 5. SEO consistency automation

`scripts/seo-audit.ts` (Node, run via `tsx`):
- Walks `src/App.tsx` route table → for each route renders the page server-side via a lightweight regex/AST scan of the source file looking for `<PageSEO ...>` usage
- Reports per route: title present, description present, og image, JSON-LD, canonical strategy
- Outputs `seo-audit.json` + console summary; non-zero exit on missing required fields

`src/pages/admin/SeoQA.tsx` (route `/admin/qa/seo`):
- Loads `seo-audit.json` (built at dev start) and DB-driven dynamic routes (blog posts, magazine editions)
- Flags rows missing title/description/og/canonical or with duplicate titles across routes
- Read-only dashboard; does not mutate `PageSEO`

### 6. Refinement-only UI pass (homepage trust signals)

ONLY presentational tweaks — no hierarchy/hero changes:
- `ImpactNumbers.tsx`: tighten vertical rhythm, ensure consistent label casing, add `aria-live="polite"` on counters
- `PartnersSection.tsx`: equalize logo cell heights, add subtle divider between "Institucionais" / "Poder público"
- `TestimonialsSection.tsx`: align attribution block, add quote-mark glyph (serif), unify pagination dots with other sections
- `RecognitionsSection.tsx` (if present in hierarchy): spacing parity with siblings

No edits to `HeroSection.tsx`, navigation, language controls, or section ordering in `Index.tsx`.

---

### Out of scope (kept as-is)

- Hero, animations, serif headings, language-controls location
- Homepage section order
- PageSEO API surface
- Existing admin auth model

### Technical notes

- Migration is additive + RLS-tightening; existing pages keep working because old rows are backfilled to `published`
- CSV import uses `supabase.upsert(..., { onConflict: 'slug' })` (or `name` where slug absent)
- Tracking schema is enforced via TypeScript only — no runtime breakage in prod
- SEO audit is a script + admin dashboard, not a build blocker
