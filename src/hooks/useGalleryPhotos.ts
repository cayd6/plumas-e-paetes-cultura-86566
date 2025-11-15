import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GalleryPhoto {
  id: string;
  title: string;
  year: string;
  type: string;
  image_url: string;
  storage_path: string;
  rotation: number;
  display_order: number;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

export const useGalleryPhotos = (year?: string, type?: string) => {
  return useQuery({
    queryKey: ['gallery-photos', year, type],
    queryFn: async () => {
      let query = supabase
        .from('gallery_photos')
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
      return data as GalleryPhoto[];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
