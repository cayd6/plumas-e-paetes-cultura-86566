import { Play } from 'lucide-react';
import { GalleryVideo } from '@/hooks/useGalleryVideos';
import OptimizedImage from './OptimizedImage';

interface VideoCardProps {
  video: GalleryVideo;
  onClick: () => void;
  priority?: boolean;
}

// Extract video ID from Google Drive URL
const getGoogleDriveThumbnail = (url: string): string => {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match) {
    return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w640`;
  }
  return '/placeholder.svg';
};

export const VideoCard = ({ video, onClick, priority = false }: VideoCardProps) => {
  const thumbnailUrl = video.thumbnail_url || getGoogleDriveThumbnail(video.video_url);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer bg-card"
    >
      <div className="aspect-video relative">
        <OptimizedImage
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full"
          priority={priority}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play className="w-8 h-8 text-ppc-purple ml-1" fill="currentColor" />
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-1">
          {video.title}
        </h3>
        <p className="text-sm text-muted-foreground">{video.year}</p>
        {video.description && (
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
};
