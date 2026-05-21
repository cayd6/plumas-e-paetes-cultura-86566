import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

// Types
export interface AwardStat {
  id: string;
  key: string;
  value: number;
  label_pt: string;
  label_en: string;
  display_order: number;
}

export interface AwardProfessional {
  id: string;
  name: string;
  awards_count: number;
  rank: number;
}

export interface AwardSchool {
  id: string;
  name: string;
  awards_count: number;
  rank: number;
}

export interface AwardCuriosity {
  id: string;
  text_pt: string;
  text_en: string;
  icon: string;
  display_order: number;
}

// Hooks for Award Stats
export function useAwardStats() {
  return useQuery({
    queryKey: ['award-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('award_stats')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as AwardStat[];
    },
  });
}

export function useAwardProfessionals() {
  return useQuery({
    queryKey: ['award-professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('award_professionals')
        .select('*')
        .order('rank');
      if (error) throw error;
      return data as AwardProfessional[];
    },
  });
}

export function useAwardSchools() {
  return useQuery({
    queryKey: ['award-schools'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('award_schools')
        .select('*')
        .order('rank');
      if (error) throw error;
      return data as AwardSchool[];
    },
  });
}

export function useAwardCuriosities() {
  return useQuery({
    queryKey: ['award-curiosities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('award_curiosities')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as AwardCuriosity[];
    },
  });
}

// Mutations
export function useAwardMutations() {
  const queryClient = useQueryClient();

  const updateStat = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: number }) => {
      const { error } = await supabase
        .from('award_stats')
        .update({ value })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-stats'] });
      toast.success('Estatística atualizada');
    },
    onError: () => toast.error('Erro ao atualizar estatística'),
  });

  const updateProfessional = useMutation({
    mutationFn: async (professional: Partial<AwardProfessional> & { id: string }) => {
      const { error } = await supabase
        .from('award_professionals')
        .update(professional)
        .eq('id', professional.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-professionals'] });
      toast.success('Profissional atualizado');
    },
    onError: () => toast.error('Erro ao atualizar profissional'),
  });

  const addProfessional = useMutation({
    mutationFn: async (professional: Omit<AwardProfessional, 'id'>) => {
      const { error } = await supabase
        .from('award_professionals')
        .insert(professional);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-professionals'] });
      toast.success('Profissional adicionado');
    },
    onError: () => toast.error('Erro ao adicionar profissional'),
  });

  const deleteProfessional = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('award_professionals')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-professionals'] });
      toast.success('Profissional removido');
    },
    onError: () => toast.error('Erro ao remover profissional'),
  });

  const updateSchool = useMutation({
    mutationFn: async (school: Partial<AwardSchool> & { id: string }) => {
      const { error } = await supabase
        .from('award_schools')
        .update(school)
        .eq('id', school.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-schools'] });
      toast.success('Escola atualizada');
    },
    onError: () => toast.error('Erro ao atualizar escola'),
  });

  const addSchool = useMutation({
    mutationFn: async (school: Omit<AwardSchool, 'id'>) => {
      const { error } = await supabase
        .from('award_schools')
        .insert(school);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-schools'] });
      toast.success('Escola adicionada');
    },
    onError: () => toast.error('Erro ao adicionar escola'),
  });

  const deleteSchool = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('award_schools')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-schools'] });
      toast.success('Escola removida');
    },
    onError: () => toast.error('Erro ao remover escola'),
  });

  const updateCuriosity = useMutation({
    mutationFn: async (curiosity: Partial<AwardCuriosity> & { id: string }) => {
      const { error } = await supabase
        .from('award_curiosities')
        .update(curiosity)
        .eq('id', curiosity.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-curiosities'] });
      toast.success('Curiosidade atualizada');
    },
    onError: () => toast.error('Erro ao atualizar curiosidade'),
  });

  const addCuriosity = useMutation({
    mutationFn: async (curiosity: Omit<AwardCuriosity, 'id'>) => {
      const { error } = await supabase
        .from('award_curiosities')
        .insert(curiosity);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-curiosities'] });
      toast.success('Curiosidade adicionada');
    },
    onError: () => toast.error('Erro ao adicionar curiosidade'),
  });

  const deleteCuriosity = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('award_curiosities')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['award-curiosities'] });
      toast.success('Curiosidade removida');
    },
    onError: () => toast.error('Erro ao remover curiosidade'),
  });

  return {
    updateStat,
    updateProfessional,
    addProfessional,
    deleteProfessional,
    updateSchool,
    addSchool,
    deleteSchool,
    updateCuriosity,
    addCuriosity,
    deleteCuriosity,
  };
}

// Combined hook for reading all award data
export function useAwardData() {
  const { data: stats = [], isLoading: statsLoading } = useAwardStats();
  const { data: professionals = [], isLoading: professionalsLoading } = useAwardProfessionals();
  const { data: schools = [], isLoading: schoolsLoading } = useAwardSchools();
  const { data: curiosities = [], isLoading: curiositiesLoading } = useAwardCuriosities();

  return {
    stats,
    professionals,
    schools,
    curiosities,
    isLoading: statsLoading || professionalsLoading || schoolsLoading || curiositiesLoading,
  };
}
