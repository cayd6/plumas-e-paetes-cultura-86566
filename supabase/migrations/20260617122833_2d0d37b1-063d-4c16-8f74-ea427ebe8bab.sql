GRANT SELECT ON public.award_stats TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.award_stats TO authenticated;
GRANT ALL ON public.award_stats TO service_role;