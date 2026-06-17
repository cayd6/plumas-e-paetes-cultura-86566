
-- ============ honored_people ============
CREATE TABLE public.honored_people (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  year integer,
  edition_number integer,
  role text,
  role_en text,
  city text,
  description text,
  description_en text,
  image_url text,
  featured boolean NOT NULL DEFAULT false,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.honored_people TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.honored_people TO authenticated;
GRANT ALL ON public.honored_people TO service_role;

ALTER TABLE public.honored_people ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active honored people"
  ON public.honored_people FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert honored people"
  ON public.honored_people FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update honored people"
  ON public.honored_people FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete honored people"
  ON public.honored_people FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_honored_people_updated_at
  BEFORE UPDATE ON public.honored_people
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ partners ============
CREATE TABLE public.partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL CHECK (type IN ('institutional','public_sector','sponsor','media','cultural','support')),
  logo_url text,
  website_url text,
  description text,
  description_en text,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.partners TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.partners TO authenticated;
GRANT ALL ON public.partners TO service_role;

ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active partners"
  ON public.partners FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert partners"
  ON public.partners FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update partners"
  ON public.partners FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete partners"
  ON public.partners FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_partners_updated_at
  BEFORE UPDATE ON public.partners
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ press_kit_assets ============
CREATE TABLE public.press_kit_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_en text,
  type text NOT NULL CHECK (type IN ('logo','release','photos','pdf','brand_asset','video_link')),
  description text,
  description_en text,
  file_url text,
  thumbnail_url text,
  display_order integer NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.press_kit_assets TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.press_kit_assets TO authenticated;
GRANT ALL ON public.press_kit_assets TO service_role;

ALTER TABLE public.press_kit_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active press assets"
  ON public.press_kit_assets FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert press assets"
  ON public.press_kit_assets FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update press assets"
  ON public.press_kit_assets FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete press assets"
  ON public.press_kit_assets FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_press_kit_assets_updated_at
  BEFORE UPDATE ON public.press_kit_assets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PT/EN columns on existing content tables ============
ALTER TABLE public.about_content ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.about_content ADD COLUMN IF NOT EXISTS content_en text;
ALTER TABLE public.about_content ADD COLUMN IF NOT EXISTS subtitle_en text;

ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS excerpt_en text;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS content_en text;

ALTER TABLE public.blog_categories ADD COLUMN IF NOT EXISTS name_en text;
ALTER TABLE public.blog_categories ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS quote_en text;
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS role_en text;

ALTER TABLE public.magazine_editions ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.magazine_editions ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.portfolio_projects ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE public.services ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.services ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE public.timeline_events ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.timeline_events ADD COLUMN IF NOT EXISTS description_en text;

ALTER TABLE public.award_curiosities ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.award_curiosities ADD COLUMN IF NOT EXISTS content_en text;

ALTER TABLE public.site_banners ADD COLUMN IF NOT EXISTS title_en text;
ALTER TABLE public.site_banners ADD COLUMN IF NOT EXISTS subtitle_en text;
