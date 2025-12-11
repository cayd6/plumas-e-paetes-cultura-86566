import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MagazineEdition {
  id: string;
  year: string;
  title_pt: string;
  title_en: string;
  description_pt: string | null;
  description_en: string | null;
  cover_url: string | null;
  pages: string[];
  display_order: number;
}

export function useMagazineEditions() {
  return useQuery({
    queryKey: ['magazine-editions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('magazine_editions')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as MagazineEdition[];
    },
  });
}

export function useMagazineMutations() {
  const queryClient = useQueryClient();

  const addEdition = useMutation({
    mutationFn: async (edition: Omit<MagazineEdition, 'id'>) => {
      const { error } = await supabase.from('magazine_editions').insert(edition);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazine-editions'] });
      toast.success('Edição adicionada');
    },
    onError: () => toast.error('Erro ao adicionar edição'),
  });

  const updateEdition = useMutation({
    mutationFn: async (edition: MagazineEdition) => {
      const { error } = await supabase
        .from('magazine_editions')
        .update(edition)
        .eq('id', edition.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazine-editions'] });
      toast.success('Edição atualizada');
    },
    onError: () => toast.error('Erro ao atualizar edição'),
  });

  const deleteEdition = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('magazine_editions').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['magazine-editions'] });
      toast.success('Edição removida');
    },
    onError: () => toast.error('Erro ao remover edição'),
  });

  return {
    addEdition,
    updateEdition,
    deleteEdition,
  };
}
