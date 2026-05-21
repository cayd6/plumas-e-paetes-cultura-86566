import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { GalleryPhoto } from './useGalleryPhotos';

export const useGalleryMutations = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const uploadPhoto = useMutation({
    mutationFn: async ({ 
      file, 
      title, 
      year, 
      type, 
      displayOrder 
    }: { 
      file: File; 
      title: string; 
      year: string; 
      type: string; 
      displayOrder: number;
    }) => {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${year}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      // Insert record in database
      const { data, error: dbError } = await supabase
        .from('gallery_photos')
        .insert({
          title,
          year,
          type,
          image_url: publicUrl,
          storage_path: filePath,
          rotation: 0,
          display_order: displayOrder,
        })
        .select()
        .single();

      if (dbError) throw dbError;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({
        title: 'Foto adicionada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao adicionar foto',
        description: error.message,
      });
    },
  });

  const updatePhoto = useMutation({
    mutationFn: async ({ 
      id, 
      updates 
    }: { 
      id: string; 
      updates: Partial<GalleryPhoto>;
    }) => {
      const { data, error } = await supabase
        .from('gallery_photos')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({
        title: 'Foto atualizada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao atualizar foto',
        description: error.message,
      });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async ({ id, storagePath }: { id: string; storagePath: string }) => {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([storagePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('gallery_photos')
        .delete()
        .eq('id', id);

      if (dbError) throw dbError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({
        title: 'Foto deletada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao deletar foto',
        description: error.message,
      });
    },
  });

  const rotatePhoto = useMutation({
    mutationFn: async ({ id, currentRotation }: { id: string; currentRotation: number }) => {
      const newRotation = (currentRotation + 90) % 360;
      const { data, error } = await supabase
        .from('gallery_photos')
        .update({ rotation: newRotation })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({
        title: 'Foto rotacionada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao rotacionar foto',
        description: error.message,
      });
    },
  });

  const reorderPhotos = useMutation({
    mutationFn: async (photos: { id: string; display_order: number }[]) => {
      const promises = photos.map(photo =>
        supabase
          .from('gallery_photos')
          .update({ display_order: photo.display_order })
          .eq('id', photo.id)
      );

      const results = await Promise.all(promises);
      const errors = results.filter(r => r.error);
      
      if (errors.length > 0) {
        throw new Error('Erro ao reordenar algumas fotos');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery-photos'] });
      toast({
        title: 'Ordem atualizada com sucesso!',
      });
    },
    onError: (error: any) => {
      toast({
        variant: 'destructive',
        title: 'Erro ao reordenar fotos',
        description: error.message,
      });
    },
  });

  return {
    uploadPhoto,
    updatePhoto,
    deletePhoto,
    rotatePhoto,
    reorderPhotos,
  };
};
