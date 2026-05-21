import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface AboutContent {
  id: string;
  key: string;
  value_pt: string;
  value_en: string;
  type: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title_pt: string;
  title_en: string;
  description_pt: string;
  description_en: string;
  image_url: string | null;
  display_order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role_pt: string;
  role_en: string;
  quote_pt: string;
  quote_en: string;
  image_url: string | null;
  display_order: number;
}

export function useAboutContent() {
  return useQuery({
    queryKey: ['about-content'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('about_content')
        .select('*')
        .order('key');
      if (error) throw error;
      return data as AboutContent[];
    },
  });
}

export function useTimelineEvents() {
  return useQuery({
    queryKey: ['timeline-events'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('timeline_events')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as TimelineEvent[];
    },
  });
}

export function useTestimonials() {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order');
      if (error) throw error;
      return data as Testimonial[];
    },
  });
}

export function useAboutMutations() {
  const queryClient = useQueryClient();

  const updateContent = useMutation({
    mutationFn: async (content: AboutContent) => {
      const { error } = await supabase
        .from('about_content')
        .update(content)
        .eq('id', content.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-content'] });
      toast.success('Conteúdo atualizado');
    },
    onError: () => toast.error('Erro ao atualizar conteúdo'),
  });

  const addContent = useMutation({
    mutationFn: async (content: Omit<AboutContent, 'id'>) => {
      const { error } = await supabase.from('about_content').insert(content);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['about-content'] });
      toast.success('Conteúdo adicionado');
    },
    onError: () => toast.error('Erro ao adicionar conteúdo'),
  });

  const addTimelineEvent = useMutation({
    mutationFn: async (event: Omit<TimelineEvent, 'id'>) => {
      const { error } = await supabase.from('timeline_events').insert(event);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-events'] });
      toast.success('Evento adicionado');
    },
    onError: () => toast.error('Erro ao adicionar evento'),
  });

  const updateTimelineEvent = useMutation({
    mutationFn: async (event: TimelineEvent) => {
      const { error } = await supabase
        .from('timeline_events')
        .update(event)
        .eq('id', event.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-events'] });
      toast.success('Evento atualizado');
    },
    onError: () => toast.error('Erro ao atualizar evento'),
  });

  const deleteTimelineEvent = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('timeline_events').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['timeline-events'] });
      toast.success('Evento removido');
    },
    onError: () => toast.error('Erro ao remover evento'),
  });

  const addTestimonial = useMutation({
    mutationFn: async (testimonial: Omit<Testimonial, 'id'>) => {
      const { error } = await supabase.from('testimonials').insert(testimonial);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento adicionado');
    },
    onError: () => toast.error('Erro ao adicionar depoimento'),
  });

  const updateTestimonial = useMutation({
    mutationFn: async (testimonial: Testimonial) => {
      const { error } = await supabase
        .from('testimonials')
        .update(testimonial)
        .eq('id', testimonial.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento atualizado');
    },
    onError: () => toast.error('Erro ao atualizar depoimento'),
  });

  const deleteTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('testimonials').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Depoimento removido');
    },
    onError: () => toast.error('Erro ao remover depoimento'),
  });

  return {
    updateContent,
    addContent,
    addTimelineEvent,
    updateTimelineEvent,
    deleteTimelineEvent,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
  };
}
