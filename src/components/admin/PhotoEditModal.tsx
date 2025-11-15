import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GalleryPhoto } from '@/hooks/useGalleryPhotos';
import { useGalleryMutations } from '@/hooks/useGalleryMutations';

interface PhotoEditModalProps {
  photo: GalleryPhoto | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PhotoEditModal = ({ photo, open, onOpenChange }: PhotoEditModalProps) => {
  const [title, setTitle] = useState(photo?.title || '');
  const [year, setYear] = useState(photo?.year || '');
  const [type, setType] = useState(photo?.type || '');
  const { updatePhoto } = useGalleryMutations();

  const handleSave = async () => {
    if (!photo) return;

    await updatePhoto.mutateAsync({
      id: photo.id,
      updates: { title, year, type },
    });
    onOpenChange(false);
  };

  const years = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010', '2009', '2008', '2007', '2006', '2005'];
  const types = [
    { value: 'premiacao', label: 'Premiação' },
    { value: 'desfile', label: 'Desfile' },
    { value: 'oficina', label: 'Oficina' },
    { value: 'outros', label: 'Outros' },
  ];

  if (!photo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Editar Foto</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <img
              src={photo.image_url}
              alt={photo.title}
              className="max-w-full h-48 object-contain rounded"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-title">Título</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="edit-year">Ano</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="edit-year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map(y => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
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
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={updatePhoto.isPending}>
            {updatePhoto.isPending ? 'Salvando...' : 'Salvar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
