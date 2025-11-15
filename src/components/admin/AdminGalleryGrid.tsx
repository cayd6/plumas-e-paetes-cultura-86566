import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Edit, RotateCw, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { GalleryPhoto } from '@/hooks/useGalleryPhotos';
import { useGalleryMutations } from '@/hooks/useGalleryMutations';
import { PhotoEditModal } from './PhotoEditModal';

interface AdminGalleryGridProps {
  photos: GalleryPhoto[];
}

function SortablePhoto({ photo, onEdit, onRotate, onDelete }: {
  photo: GalleryPhoto;
  onEdit: () => void;
  onRotate: () => void;
  onDelete: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border rounded-lg p-4 bg-card"
    >
      <div className="flex gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing flex-shrink-0 flex items-start pt-2"
        >
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>
        
        <img
          src={photo.image_url}
          alt={photo.title}
          className="w-24 h-24 object-cover rounded flex-shrink-0"
          style={{ transform: `rotate(${photo.rotation}deg)` }}
        />
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate">{photo.title}</h4>
          <p className="text-sm text-muted-foreground">
            {photo.year} • {photo.type}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Ordem: {photo.display_order}
          </p>
        </div>
        
        <div className="flex gap-1 flex-shrink-0">
          <Button variant="ghost" size="icon" onClick={onEdit}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onRotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export const AdminGalleryGrid = ({ photos }: AdminGalleryGridProps) => {
  const [items, setItems] = useState(photos);
  const [editingPhoto, setEditingPhoto] = useState<GalleryPhoto | null>(null);
  const [deletingPhoto, setDeletingPhoto] = useState<GalleryPhoto | null>(null);
  const { rotatePhoto, deletePhoto, reorderPhotos } = useGalleryMutations();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // Update display_order for all affected items
        const updates = newItems.map((item, index) => ({
          id: item.id,
          display_order: index + 1,
        }));
        
        reorderPhotos.mutate(updates);
        
        return newItems;
      });
    }
  };

  const handleRotate = (photo: GalleryPhoto) => {
    rotatePhoto.mutate({ id: photo.id, currentRotation: photo.rotation });
  };

  const handleDeleteConfirm = () => {
    if (deletingPhoto) {
      deletePhoto.mutate({
        id: deletingPhoto.id,
        storagePath: deletingPhoto.storage_path,
      });
      setDeletingPhoto(null);
    }
  };

  // Update items when photos prop changes
  useState(() => {
    setItems(photos);
  });

  if (photos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhuma foto encontrada. Adicione fotos usando o formulário acima.
      </div>
    );
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((photo) => (
              <SortablePhoto
                key={photo.id}
                photo={photo}
                onEdit={() => setEditingPhoto(photo)}
                onRotate={() => handleRotate(photo)}
                onDelete={() => setDeletingPhoto(photo)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <PhotoEditModal
        photo={editingPhoto}
        open={!!editingPhoto}
        onOpenChange={(open) => !open && setEditingPhoto(null)}
      />

      <AlertDialog open={!!deletingPhoto} onOpenChange={(open) => !open && setDeletingPhoto(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja deletar a foto "{deletingPhoto?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Deletar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
