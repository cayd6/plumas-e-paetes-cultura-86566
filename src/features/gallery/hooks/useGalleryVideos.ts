import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryVideo {
  id: string;
  title: string;
  year: string;
  type: string;
  video_url: string;
  thumbnail_url: string | null;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export const useGalleryVideos = (year?: string, type?: string) => {
  return useQuery({
    queryKey: ['gallery-videos', year, type],
    queryFn: async () => {
      let query = supabase
        .from('gallery_videos')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (year && year !== 'todos') {
        query = query.eq('year', year);
      }
      
      if (type && type !== 'todos') {
        query = query.eq('type', type);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as GalleryVideo[];
    },
    staleTime: 5 * 60 * 1000,
  });
};
