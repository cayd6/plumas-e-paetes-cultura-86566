import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GalleryVideo } from './useGalleryVideos';

interface VideoFormData {
  title: string;
  year: string;
  type: string;
  video_url: string;
  thumbnail_url?: string;
  description?: string;
}

export const useVideoMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const addVideo = useMutation({
    mutationFn: async (data: VideoFormData) => {
      const { data: user } = await supabase.auth.getUser();
      
      // Get max display_order
      const { data: maxOrderData } = await supabase
        .from('gallery_videos')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);
      
      const nextOrder = (maxOrderData?.[0]?.display_order ?? -1) + 1;

      const { error } = await supabase
        .from('gallery_videos')
        .insert({
          ...data,
          display_order: nextOrder,
          created_by: user?.user?.id,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      toast({
        title: 'Vídeo adicionado!',
        description: 'O vídeo foi salvo com sucesso.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar vídeo',
        description: error.message,
      });
    },
  });

  const updateVideo = useMutation({
    mutationFn: async ({ id, ...data }: VideoFormData & { id: string }) => {
      const { error } = await supabase
        .from('gallery_videos')
        .update(data)
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      toast({
        title: 'Vídeo atualizado!',
        description: 'As alterações foram salvas.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar vídeo',
        description: error.message,
      });
    },
  });

  const deleteVideo = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('gallery_videos')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
      toast({
        title: 'Vídeo excluído!',
        description: 'O vídeo foi removido da galeria.',
      });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir vídeo',
        description: error.message,
      });
    },
  });

  const reorderVideos = useMutation({
    mutationFn: async (videos: GalleryVideo[]) => {
      const updates = videos.map((video, index) => 
        supabase
          .from('gallery_videos')
          .update({ display_order: index })
          .eq('id', video.id)
      );

      await Promise.all(updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-videos'] });
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao reordenar vídeos',
        description: error.message,
      });
    },
  });

  return { addVideo, updateVideo, deleteVideo, reorderVideos };
};
