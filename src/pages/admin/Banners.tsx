import { useState, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useDropzone } from 'react-dropzone';
import { useBanners, useBannerMutations, SiteBanner } from '@/hooks/useBanners';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Trash2, Upload, GripVertical, Image, Eye, EyeOff } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function AdminBanners() {
  const { data: banners, isLoading } = useBanners();
  const { addBanner, updateBanner, deleteBanner } = useBannerMutations();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    const file = acceptedFiles[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `hero-${Date.now()}.${fileExt}`;
    const filePath = `banners/${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(filePath);

      await addBanner.mutateAsync({
        image_url: publicUrl,
        storage_path: filePath,
        title_pt: 'Novo Banner',
        title_en: 'New Banner',
        is_active: true,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Erro ao fazer upload',
        description: error.message,
      });
    } finally {
      setUploading(false);
    }
  }, [addBanner, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const handleToggleActive = async (banner: SiteBanner) => {
    await updateBanner.mutateAsync({
      id: banner.id,
      is_active: !banner.is_active,
    });
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    const banner = banners?.find(b => b.id === deleteId);
    if (banner?.storage_path) {
      await supabase.storage.from('gallery').remove([banner.storage_path]);
    }

    await deleteBanner.mutateAsync(deleteId);
    setDeleteId(null);
  };

  const heroBanner = banners?.find(b => b.is_active);

  return (
    <AdminLayout title="Gerenciar Capa do Site">
      <div className="space-y-6">
        {/* Current Hero Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Image className="h-5 w-5" />
              Capa Atual do Hero
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Skeleton className="w-full h-48 rounded-lg" />
            ) : heroBanner ? (
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={heroBanner.image_url}
                  alt="Hero atual"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70 flex items-center justify-center">
                  <p className="text-primary-foreground font-bold text-lg">Preview do Hero</p>
                </div>
              </div>
            ) : (
              <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Nenhuma imagem de capa definida</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upload New */}
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Imagem</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              {uploading ? (
                <p className="text-muted-foreground">Enviando...</p>
              ) : isDragActive ? (
                <p className="text-primary">Solte a imagem aqui...</p>
              ) : (
                <div>
                  <p className="text-muted-foreground mb-1">
                    Arraste uma imagem ou clique para selecionar
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    Recomendado: 1920x1080px ou maior
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* All Banners */}
        <Card>
          <CardHeader>
            <CardTitle>Todas as Imagens</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
                  <Skeleton key={i} className="h-40 rounded-lg" />
                ))}
              </div>
            ) : banners && banners.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {banners.map((banner) => (
                  <div
                    key={banner.id}
                    className={`relative group rounded-lg overflow-hidden border ${
                      banner.is_active ? 'border-primary ring-2 ring-primary' : 'border-border'
                    }`}
                  >
                    <img
                      src={banner.image_url}
                      alt={banner.title_pt}
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant={banner.is_active ? "secondary" : "default"}
                        onClick={() => handleToggleActive(banner)}
                      >
                        {banner.is_active ? (
                          <>
                            <EyeOff className="h-4 w-4 mr-1" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="h-4 w-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(banner.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {banner.is_active && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Ativa
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma imagem cadastrada. Faça upload de uma imagem acima.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir imagem?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. A imagem será removida permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}
