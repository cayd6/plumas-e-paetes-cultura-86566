import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GalleryVideo } from '@/hooks/useGalleryVideos';
import { useVideoMutations } from '@/hooks/useVideoMutations';

const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
const types = [
  { value: 'entrevista', label: 'Entrevista' },
  { value: 'documentario', label: 'Documentário' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'outros', label: 'Outros' },
];

interface VideoEditModalProps {
  video: GalleryVideo;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VideoEditModal({ video, open, onOpenChange }: VideoEditModalProps) {
  const [title, setTitle] = useState(video.title);
  const [year, setYear] = useState(video.year);
  const [type, setType] = useState(video.type);
  const [videoUrl, setVideoUrl] = useState(video.video_url);
  const [thumbnailUrl, setThumbnailUrl] = useState(video.thumbnail_url || '');
  const [description, setDescription] = useState(video.description || '');
  
  const { updateVideo } = useVideoMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await updateVideo.mutateAsync({
      id: video.id,
      title: title.trim(),
      year,
      type,
      video_url: videoUrl.trim(),
      thumbnail_url: thumbnailUrl.trim() || undefined,
      description: description.trim() || undefined,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Editar Vídeo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-video-url">URL do Vídeo</Label>
            <Input
              id="edit-video-url"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-year">Ano</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="edit-year">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map(y => (
                    <SelectItem key={y} value={y}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="edit-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {types.map(t => (
                    <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-thumbnail">URL da Thumbnail</Label>
            <Input
              id="edit-thumbnail"
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updateVideo.isPending}>
              {updateVideo.isPending ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
