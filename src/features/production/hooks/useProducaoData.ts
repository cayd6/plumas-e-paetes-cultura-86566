import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Service {
  id: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  icon: string;
  features_pt: string[];
  features_en: string[];
  display_order: number;
}

export interface PortfolioProject {
  id: string;
  title_pt: string;
  title_en: string;
  year: string;
  description_pt: string;
  description_en: string;
  image_url: string | null;
  display_order: number;
}

export function useServices() {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as Service[];
    },
  });
}

export function usePortfolioProjects() {
  return useQuery({
    queryKey: ['portfolio-projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolio_projects')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as PortfolioProject[];
    },
  });
}

export function useProducaoMutations() {
  const queryClient = useQueryClient();

  const addService = useMutation({
    mutationFn: async (service: Omit<Service, 'id'>) => {
      const { error } = await supabase.from('services').insert(service);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço adicionado');
    },
    onError: () => toast.error('Erro ao adicionar serviço'),
  });

  const updateService = useMutation({
    mutationFn: async (service: Service) => {
      const { error } = await supabase
        .from('services')
        .update(service)
        .eq('id', service.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço atualizado');
    },
    onError: () => toast.error('Erro ao atualizar serviço'),
  });

  const deleteService = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      toast.success('Serviço removido');
    },
    onError: () => toast.error('Erro ao remover serviço'),
  });

  const addProject = useMutation({
    mutationFn: async (project: Omit<PortfolioProject, 'id'>) => {
      const { error } = await supabase.from('portfolio_projects').insert(project);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-projects'] });
      toast.success('Projeto adicionado');
    },
    onError: () => toast.error('Erro ao adicionar projeto'),
  });

  const updateProject = useMutation({
    mutationFn: async (project: PortfolioProject) => {
      const { error } = await supabase
        .from('portfolio_projects')
        .update(project)
        .eq('id', project.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-projects'] });
      toast.success('Projeto atualizado');
    },
    onError: () => toast.error('Erro ao atualizar projeto'),
  });

  const deleteProject = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio-projects'] });
      toast.success('Projeto removido');
    },
    onError: () => toast.error('Erro ao remover projeto'),
  });

  return {
    addService,
    updateService,
    deleteService,
    addProject,
    updateProject,
    deleteProject,
  };
}
