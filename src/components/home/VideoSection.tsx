import { Play, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const VideoSection = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "IwJrey-jnjI";
  const startTime = 4923;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {language === 'pt' ? 'Conheça Nossa História' : 'Discover Our Story'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Duas décadas de transformação cultural através do carnaval carioca' 
              : 'Two decades of cultural transformation through Rio\'s carnival'}
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-muted group">
            {!isPlaying ? (
              <>
                {/* Thumbnail with overlay */}
                <div className="relative aspect-video">
                  <img
                    src={thumbnailUrl}
                    alt={language === 'pt' ? 'Vídeo institucional do Instituto Plumas e Paetês Cultural' : 'Institutional video of Instituto Plumas e Paetês Cultural'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300" />
                  
                  {/* Play button */}
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={language === 'pt' ? 'Reproduzir vídeo' : 'Play video'}
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </button>
                  
                  {/* Video info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {language === 'pt' ? '20 Anos de Plumas & Paetês' : '20 Years of Plumas & Paetês'}
                    </h3>
                    <p className="text-sm text-white/80">
                      {language === 'pt' ? 'Documentário institucional' : 'Institutional documentary'}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`}
                title={language === 'pt' ? 'Instituto Plumas e Paetês Cultural - Nossa História' : 'Instituto Plumas e Paetês Cultural - Our Story'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full aspect-video"
              />
            )}
          </div>
          
          {/* External link button */}
          <div className="text-center mt-6">
            <Button
              asChild
              variant="outline"
              className="rounded-full"
            >
              <a 
                href={`https://www.youtube.com/watch?v=${videoId}&t=${startTime}s`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {language === 'pt' ? 'Assistir no YouTube' : 'Watch on YouTube'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
