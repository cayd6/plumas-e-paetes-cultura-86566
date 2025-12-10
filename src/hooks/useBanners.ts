import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteBanner {
  id: string;
  image_url: string;
  storage_path: string | null;
  title_pt: string;
  title_en: string;
  description_pt: string | null;
  description_en: string | null;
  link: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  created_by: string | null;
}

interface BannerFormData {
  image_url: string;
  storage_path?: string;
  title_pt: string;
  title_en: string;
  description_pt?: string;
  description_en?: string;
  link?: string;
  is_active?: boolean;
}

export const useBanners = (activeOnly?: boolean) => {
  return useQuery({
    queryKey: ['site-banners', activeOnly],
    queryFn: async () => {
      let query = supabase
        .from('site_banners')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (activeOnly) {
        query = query.eq('is_active', true);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data as SiteBanner[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useBannerMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addBanner = useMutation({
    mutationFn: async (data: BannerFormData) => {
      const { data: user } = await supabase.auth.getUser();
      
      const { data: maxOrderData } = await supabase
        .from('site_banners')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);
      
      const nextOrder = (maxOrderData?.[0]?.display_order ?? -1) + 1;

      const { error } = await supabase
        .from('site_banners')
        .insert({
          ...data,
          display_order: nextOrder,
          created_by: user?.user?.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-banners'] });
      toast({
        title: 'Banner adicionado!',
        description: 'O banner foi salvo com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar banner',
        description: error.message,
      });
    },
  });

  const updateBanner = useMutation({
    mutationFn: async ({ id, ...data }: Partial<BannerFormData> & { id: string }) => {
      const { error } = await supabase
        .from('site_banners')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-banners'] });
      toast({
        title: 'Banner atualizado!',
        description: 'As alterações foram salvas.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar banner',
        description: error.message,
      });
    },
  });

  const deleteBanner = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('site_banners')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-banners'] });
      toast({
        title: 'Banner excluído!',
        description: 'O banner foi removido.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir banner',
        description: error.message,
      });
    },
  });

  const reorderBanners = useMutation({
    mutationFn: async (banners: SiteBanner[]) => {
      const updates = banners.map((banner, index) => 
        supabase
          .from('site_banners')
          .update({ display_order: index })
          .eq('id', banner.id)
      );

      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-banners'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao reordenar banners',
        description: error.message,
      });
    },
  });

  return { addBanner, updateBanner, deleteBanner, reorderBanners };
};
