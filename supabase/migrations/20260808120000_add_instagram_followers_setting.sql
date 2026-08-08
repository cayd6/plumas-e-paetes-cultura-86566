-- Add instagram_followers setting to site_settings
INSERT INTO public.site_settings (key, value, type, label_pt, label_en)
VALUES ('instagram_followers', '20.3k', 'text', 'Seguidores no Instagram', 'Instagram Followers')
ON CONFLICT (key) DO NOTHING;
