import { useState, useEffect } from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GalleryVideo } from '@/hooks/useGalleryVideos';
import { useVideoMutations } from '@/hooks/useVideoMutations';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GripVertical, Pencil, Trash2, ExternalLink } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { VideoEditModal } from './VideoEditModal';

interface SortableVideoProps {
  video: GalleryVideo;
  onEdit: (video: GalleryVideo) => void;
  onDelete: (video: GalleryVideo) => void;
}

function SortableVideo({ video, onEdit, onDelete }: SortableVideoProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: video.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const typeLabels: Record<string, string> = {
    entrevista: 'Entrevista',
    documentario: 'Documentário',
    cobertura: 'Cobertura',
    outros: 'Outros',
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="p-4 flex items-center gap-4"
    >
      <button
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded"
      >
        <GripVertical className="h-5 w-5 text-muted-foreground" />
      </button>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{video.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{video.year}</span>
          <span>•</span>
          <span>{typeLabels[video.type] || video.type}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <a href={video.video_url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onEdit(video)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(video)}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>
    </Card>
  );
}

interface AdminVideoGridProps {
  videos: GalleryVideo[];
}

export function AdminVideoGrid({ videos }: AdminVideoGridProps) {
  const [items, setItems] = useState<GalleryVideo[]>(videos);
  const [editingVideo, setEditingVideo] = useState<GalleryVideo | null>(null);
  const [deletingVideo, setDeletingVideo] = useState<GalleryVideo | null>(null);
  
  const { deleteVideo, reorderVideos } = useVideoMutations();

  useEffect(() => {
    setItems(videos);
  }, [videos]);

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
        reorderVideos.mutate(newItems);
        return newItems;
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingVideo) {
      await deleteVideo.mutateAsync(deletingVideo.id);
      setDeletingVideo(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Nenhum vídeo encontrado.
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
        <SortableContext items={items.map(v => v.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {items.map((video) => (
              <SortableVideo
                key={video.id}
                video={video}
                onEdit={setEditingVideo}
                onDelete={setDeletingVideo}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {editingVideo && (
        <VideoEditModal
          video={editingVideo}
          open={!!editingVideo}
          onOpenChange={(open) => !open && setEditingVideo(null)}
        />
      )}

      <AlertDialog open={!!deletingVideo} onOpenChange={(open) => !open && setDeletingVideo(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir vídeo?</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir "{deletingVideo?.title}"? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
