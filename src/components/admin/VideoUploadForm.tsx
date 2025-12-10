import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useVideoMutations } from '@/hooks/useVideoMutations';

const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
const types = [
  { value: 'entrevista', label: 'Entrevista' },
  { value: 'documentario', label: 'Documentário' },
  { value: 'cobertura', label: 'Cobertura' },
  { value: 'outros', label: 'Outros' },
];

export function VideoUploadForm() {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('2025');
  const [type, setType] = useState('entrevista');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [description, setDescription] = useState('');
  
  const { addVideo } = useVideoMutations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !videoUrl.trim()) {
      return;
    }

    await addVideo.mutateAsync({
      title: title.trim(),
      year,
      type,
      video_url: videoUrl.trim(),
      thumbnail_url: thumbnailUrl.trim() || undefined,
      description: description.trim() || undefined,
    });

    // Reset form
    setTitle('');
    setVideoUrl('');
    setThumbnailUrl('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Título *</Label>
          <Input
            id="title"
            placeholder="Título do vídeo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="video-url">URL do Vídeo *</Label>
          <Input
            id="video-url"
            placeholder="https://drive.google.com/... ou https://youtube.com/..."
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            required
          />
          <p className="text-xs text-muted-foreground">
            Cole a URL do Google Drive ou YouTube
          </p>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="year">Ano</Label>
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger id="year">
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
          <Label htmlFor="type">Tipo</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {types.map(t => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="thumbnail-url">URL da Thumbnail (opcional)</Label>
          <Input
            id="thumbnail-url"
            placeholder="https://..."
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Descrição (opcional)</Label>
        <Textarea
          id="description"
          placeholder="Descrição do vídeo..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <Button type="submit" disabled={addVideo.isPending}>
        {addVideo.isPending ? 'Salvando...' : 'Adicionar Vídeo'}
      </Button>
    </form>
  );
}
