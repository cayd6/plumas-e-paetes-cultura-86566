import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryVideo } from '@/hooks/useGalleryVideos';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: GalleryVideo;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

// Convert Google Drive link to embed URL
const getGoogleDriveEmbedUrl = (url: string): string => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/file/d/${match[1]}/preview`;
  }
  return url;
};

export const VideoModal = ({
  isOpen,
  onClose,
  video,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: VideoModalProps) => {
  const embedUrl = getGoogleDriveEmbedUrl(video.video_url);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black border-none">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-50 text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Video player */}
          <div className="aspect-video w-full">
            <iframe
              src={embedUrl}
              title={video.title}
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
          </div>

          {/* Video info */}
          <div className="p-4 bg-card">
            <h2 className="text-xl font-bold text-foreground">{video.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{video.year}</p>
            {video.description && (
              <p className="text-muted-foreground mt-2">{video.description}</p>
            )}
          </div>

          {/* Navigation buttons */}
          {hasPrevious && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={onPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}

          {hasNext && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 h-12 w-12"
              onClick={onNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
