import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const DEFAULT_HERO_IMAGE = '/lovable-uploads/hero-background.jpg';

export const useHeroBanner = () => {
  return useQuery({
    queryKey: ['hero-banner'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_banners')
        .select('image_url')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(1)
        .maybeSingle();
      
      if (error) {
        console.error('Error fetching hero banner:', error);
        return DEFAULT_HERO_IMAGE;
      }
      
      return data?.image_url || DEFAULT_HERO_IMAGE;
    },
    staleTime: 5 * 60 * 1000,
  });
};
