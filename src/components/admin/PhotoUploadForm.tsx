import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useGalleryMutations } from '@/hooks/useGalleryMutations';
import { useGalleryPhotos } from '@/hooks/useGalleryPhotos';

interface PhotoFile {
  file: File;
  preview: string;
  title: string;
  year: string;
  type: string;
}

export const PhotoUploadForm = () => {
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { uploadPhoto } = useGalleryMutations();
  const { data: existingPhotos } = useGalleryPhotos();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newPhotos = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      title: file.name.replace(/\.[^/.]+$/, ''),
      year: new Date().getFullYear().toString(),
      type: 'outros',
    }));
    setPhotos(prev => [...prev, ...newPhotos]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removePhoto = (index: number) => {
    setPhotos(prev => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const updatePhoto = (index: number, field: keyof PhotoFile, value: string) => {
    setPhotos(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleUpload = async () => {
    if (photos.length === 0) return;

    setUploading(true);
    setProgress(0);

    const maxOrder = existingPhotos?.reduce((max, p) => Math.max(max, p.display_order), 0) || 0;

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i];
      try {
        await uploadPhoto.mutateAsync({
          file: photo.file,
          title: photo.title,
          year: photo.year,
          type: photo.type,
          displayOrder: maxOrder + i + 1,
        });
        setProgress(((i + 1) / photos.length) * 100);
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }

    // Cleanup
    photos.forEach(p => URL.revokeObjectURL(p.preview));
    setPhotos([]);
    setUploading(false);
    setProgress(0);
  };

  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
  const types = [
    { value: 'premiacao', label: 'Premiação' },
    { value: 'desfile', label: 'Desfile' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'outros', label: 'Outros' },
  ];

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/5' : 'border-muted hover:border-primary/50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg">Solte as fotos aqui...</p>
        ) : (
          <div>
            <p className="text-lg mb-2">Arraste fotos aqui ou clique para selecionar</p>
            <p className="text-sm text-muted-foreground">
              Suporta JPG, PNG, WEBP até 10MB
            </p>
          </div>
        )}
      </div>

      {photos.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Fotos para upload ({photos.length})</h3>
          
          <div className="grid gap-4">
            {photos.map((photo, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-3">
                <div className="flex gap-4">
                  <img
                    src={photo.preview}
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor={`title-${index}`}>Título</Label>
                      <Input
                        id={`title-${index}`}
                        value={photo.title}
                        onChange={(e) => updatePhoto(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`year-${index}`}>Ano</Label>
                      <Select
                        value={photo.year}
                        onValueChange={(value) => updatePhoto(index, 'year', value)}
                      >
                        <SelectTrigger id={`year-${index}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map(year => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`type-${index}`}>Tipo</Label>
                      <Select
                        value={photo.type}
                        onValueChange={(value) => updatePhoto(index, 'type', value)}
                      >
                        <SelectTrigger id={`type-${index}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {types.map(type => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removePhoto(index)}
                    disabled={uploading}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} />
              <p className="text-sm text-center text-muted-foreground">
                Enviando... {Math.round(progress)}%
              </p>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full"
            size="lg"
          >
            {uploading ? 'Enviando...' : `Fazer Upload de ${photos.length} Foto(s)`}
          </Button>
        </div>
      )}
    </div>
  );
};
