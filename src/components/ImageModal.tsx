import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { useEffect } from "react";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    title: string;
    year: string;
    type?: string;
  };
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

const ImageModal = ({ 
  isOpen, 
  onClose, 
  image, 
  onPrevious, 
  onNext,
  hasPrevious = false,
  hasNext = false 
}: ImageModalProps) => {
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasPrevious, hasNext, onPrevious, onNext, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black/95 border-0">
        <div className="relative w-full h-full flex flex-col">
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-xl font-semibold">{image.title}</h3>
                <p className="text-sm text-white/70">{image.year}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Baixar imagem"
                >
                  <Download size={20} className="text-white" />
                </button>
                <DialogClose asChild>
                  <button
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Fechar"
                  >
                    <X size={24} className="text-white" />
                  </button>
                </DialogClose>
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="flex-1 flex items-center justify-center p-4 pt-20">
            <img
              src={image.src}
              alt={image.title}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          </div>

          {/* Navigation Arrows */}
          {hasPrevious && onPrevious && (
            <button
              onClick={onPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>
          )}
          
          {hasNext && onNext && (
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
