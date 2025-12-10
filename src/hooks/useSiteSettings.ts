import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface SiteSetting {
  id: string;
  key: string;
  value: string;
  type: string;
  label_pt: string;
  label_en: string;
  created_at: string;
  updated_at: string;
}

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ['site-settings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .order('key', { ascending: true });
      
      if (error) throw error;
      return data as SiteSetting[];
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSiteSetting = (key: string) => {
  return useQuery({
    queryKey: ['site-settings', key],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', key)
        .maybeSingle();
      
      if (error) throw error;
      return data as SiteSetting | null;
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useSettingsMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const updateSetting = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { error } = await supabase
        .from('site_settings')
        .update({ value })
        .eq('key', key);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: 'Configuração salva!',
        description: 'As alterações foram aplicadas.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar configuração',
        description: error.message,
      });
    },
  });

  const updateMultipleSettings = useMutation({
    mutationFn: async (settings: { key: string; value: string }[]) => {
      const updates = settings.map(({ key, value }) =>
        supabase
          .from('site_settings')
          .update({ value })
          .eq('key', key)
      );

      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-settings'] });
      toast({
        title: 'Configurações salvas!',
        description: 'Todas as alterações foram aplicadas.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao salvar configurações',
        description: error.message,
      });
    },
  });

  return { updateSetting, updateMultipleSettings };
};
