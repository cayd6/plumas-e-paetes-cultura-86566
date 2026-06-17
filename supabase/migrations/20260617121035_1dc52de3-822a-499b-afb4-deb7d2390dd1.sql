
-- Phase 4: Draft/Publish workflow
-- Add status + published_at to key editorial tables, backfill, tighten public RLS, add indexes

-- 1) Add columns (idempotent)
ALTER TABLE public.honored_people       ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.honored_people       ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.partners             ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.partners             ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.press_kit_assets     ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.press_kit_assets     ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.magazine_editions    ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.magazine_editions    ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.testimonials         ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.testimonials         ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.portfolio_projects   ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.portfolio_projects   ADD COLUMN IF NOT EXISTS published_at timestamptz;
ALTER TABLE public.timeline_events      ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'draft';
ALTER TABLE public.timeline_events      ADD COLUMN IF NOT EXISTS published_at timestamptz;

-- 2) Status check constraint via trigger-safe DO blocks
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY['honored_people','partners','press_kit_assets','magazine_editions','testimonials','portfolio_projects','timeline_events']
  LOOP
    EXECUTE format(
      'ALTER TABLE public.%I DROP CONSTRAINT IF EXISTS %I',
      t, t || '_status_check'
    );
    EXECUTE format(
      'ALTER TABLE public.%I ADD CONSTRAINT %I CHECK (status IN (''draft'',''published'',''archived''))',
      t, t || '_status_check'
    );
  END LOOP;
END $$;

-- 3) Backfill existing rows to published
UPDATE public.honored_people     SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.partners           SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.press_kit_assets   SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.magazine_editions  SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.testimonials       SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.portfolio_projects SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';
UPDATE public.timeline_events    SET status='published', published_at=COALESCE(published_at, created_at, now()) WHERE status='draft';

-- 4) Indexes
CREATE INDEX IF NOT EXISTS idx_honored_people_status_pub     ON public.honored_people (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_partners_status_pub           ON public.partners (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_press_kit_assets_status_pub   ON public.press_kit_assets (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_magazine_editions_status_pub  ON public.magazine_editions (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_status_pub       ON public.testimonials (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_portfolio_projects_status_pub ON public.portfolio_projects (status, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_timeline_events_status_pub    ON public.timeline_events (status, published_at DESC);

-- 5) Tighten public SELECT policies: only published rows visible to anonymous viewers; admins still see all

-- honored_people (had active flag)
DROP POLICY IF EXISTS "Public can view active honored people" ON public.honored_people;
CREATE POLICY "Public can view published honored people"
  ON public.honored_people FOR SELECT TO public
  USING ((status = 'published' AND COALESCE(active, true) = true) OR has_role(auth.uid(), 'admin'::app_role));

-- partners
DROP POLICY IF EXISTS "Public can view active partners" ON public.partners;
CREATE POLICY "Public can view published partners"
  ON public.partners FOR SELECT TO public
  USING ((status = 'published' AND COALESCE(active, true) = true) OR has_role(auth.uid(), 'admin'::app_role));

-- press_kit_assets
DROP POLICY IF EXISTS "Public can view active press assets" ON public.press_kit_assets;
CREATE POLICY "Public can view published press assets"
  ON public.press_kit_assets FOR SELECT TO public
  USING ((status = 'published' AND COALESCE(active, true) = true) OR has_role(auth.uid(), 'admin'::app_role));

-- magazine_editions
DROP POLICY IF EXISTS "Revistas são públicas" ON public.magazine_editions;
CREATE POLICY "Public can view published magazine editions"
  ON public.magazine_editions FOR SELECT TO public
  USING (status = 'published' OR has_role(auth.uid(), 'admin'::app_role));

-- testimonials
DROP POLICY IF EXISTS "Depoimentos são públicos" ON public.testimonials;
CREATE POLICY "Public can view published testimonials"
  ON public.testimonials FOR SELECT TO public
  USING (status = 'published' OR has_role(auth.uid(), 'admin'::app_role));

-- portfolio_projects
DROP POLICY IF EXISTS "Portfólio é público" ON public.portfolio_projects;
CREATE POLICY "Public can view published portfolio projects"
  ON public.portfolio_projects FOR SELECT TO public
  USING (status = 'published' OR has_role(auth.uid(), 'admin'::app_role));

-- timeline_events
DROP POLICY IF EXISTS "Timeline é pública" ON public.timeline_events;
CREATE POLICY "Public can view published timeline events"
  ON public.timeline_events FOR SELECT TO public
  USING (status = 'published' OR has_role(auth.uid(), 'admin'::app_role));
