import { useState } from "react";
import { ArrowRight, Play, BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Revista + Documentário — bloco editorial combinado.
 * Capa da revista mais recente + thumbnails de edições anteriores + player do documentário.
 */
const MagazineDocSection = () => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "IwJrey-jnjI";
  const startTime = 4923;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  // TODO: substituir pelo link externo das revistas (Drive/OneDrive) quando disponível
  const revistaPdfUrl = "";

  const archive = [2023, 2022, 2021];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-12">
          <p className="uppercase tracking-[0.25em] text-xs text-primary mb-4 font-medium">
            {language === 'pt' ? '— Biblioteca e arquivo audiovisual' : '— Library and audiovisual archive'}
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground leading-[1.05] tracking-tight">
            {language === 'pt'
              ? 'Revista, documentário e a memória que circula.'
              : 'Magazine, documentary and the memory that circulates.'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Revista */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="col-span-2 aspect-[3/4] bg-gradient-to-br from-primary to-accent rounded-sm shadow-xl flex flex-col justify-between p-6 text-primary-foreground">
                <div>
                  <p className="uppercase tracking-[0.3em] text-[10px] mb-2 opacity-80">
                    {language === 'pt' ? 'Revista nº 15' : 'Magazine nº 15'}
                  </p>
                  <h3 className="font-serif text-2xl md:text-3xl font-semibold leading-tight">
                    {language === 'pt' ? 'Plumas & Paetês' : 'Plumas & Paetês'}
                  </h3>
                </div>
                <p className="text-xs opacity-80">2024 · 5.000 exemplares</p>
              </div>
              <div className="grid grid-rows-3 gap-3">
                {archive.map((year) => (
                  <div
                    key={year}
                    className="aspect-square bg-muted border border-border rounded-sm flex items-center justify-center font-serif text-foreground/60 hover:text-primary hover:border-primary transition-colors cursor-pointer"
                  >
                    {year}
                  </div>
                ))}
              </div>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              {language === 'pt'
                ? 'Publicação anual desde 2010 — circulação gratuita, conteúdo editorial sobre os fazedores do carnaval brasileiro.'
                : 'Annual publication since 2010 — free circulation, editorial content on the makers of Brazilian carnival.'}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/revista">
                  <BookOpen className="mr-2 h-4 w-4" />
                  {language === 'pt' ? 'Biblioteca digital' : 'Digital library'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              {revistaPdfUrl && (
                <Button asChild className="rounded-full">
                  <a href={revistaPdfUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-4 w-4" />
                    {language === 'pt' ? 'Baixar Revista em PDF' : 'Download magazine PDF'}
                  </a>
                </Button>
              )}
            </div>
          </div>

          {/* Documentário */}
          <div className="lg:col-span-7">
            <div className="relative rounded-sm overflow-hidden shadow-xl bg-muted aspect-video group">
              {!isPlaying ? (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="block w-full h-full text-left"
                  aria-label={language === 'pt' ? 'Reproduzir documentário' : 'Play documentary'}
                >
                  <img
                    src={thumbnailUrl}
                    alt={language === 'pt'
                      ? 'Documentário 20 anos de Plumas & Paetês Cultural'
                      : '20 years of Plumas & Paetês Cultural documentary'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-primary-foreground">
                    <p className="uppercase tracking-[0.25em] text-[10px] text-secondary mb-2">
                      {language === 'pt' ? 'Documentário institucional' : 'Institutional documentary'}
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold">
                      {language === 'pt' ? '20 anos de Plumas & Paetês' : '20 years of Plumas & Paetês'}
                    </h3>
                  </div>
                </button>
              ) : (
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?start=${startTime}&autoplay=1`}
                  title={language === 'pt' ? 'Documentário Plumas & Paetês' : 'Plumas & Paetês documentary'}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MagazineDocSection;
