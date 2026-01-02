import { MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnniversaryButton from "@/components/AnniversaryButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHeroBanner } from "@/hooks/useHeroBanner";

const HeroSection = () => {
  const { language } = useLanguage();
  const { data: heroImage } = useHeroBanner();

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex flex-col bg-black"
    >
      {/* Top Zone - Badge + Title */}
      <div className="flex flex-col items-center justify-center pt-24 pb-6 px-4 z-10">
        {/* Anniversary Badge */}
        <div className="mb-4 animate-fade-in">
          <AnniversaryButton />
        </div>
        
        {/* H1 - Institute Name */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground animate-fade-in leading-tight text-center">
          Instituto <span className="text-secondary">Plumas & Paetês</span> Cultural
        </h1>
      </div>
      
      {/* Middle Zone - Hero Image */}
      <div className="flex-1 flex items-center justify-center px-4">
        <img 
          src={heroImage || '/lovable-uploads/hero-background.jpg'}
          alt="Instituto Plumas & Paetês Cultural"
          className="max-w-full max-h-[65vh] object-contain animate-fade-in"
        />
      </div>
      
      {/* Bottom Zone - Description + CTA */}
      <div className="flex flex-col items-center justify-center pb-12 pt-6 px-4 z-10">
        {/* Description */}
        <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 animate-fade-in font-light max-w-2xl text-center">
          {language === 'pt' 
            ? 'Há 20 anos valorizando artistas e promovendo a economia criativa do carnaval carioca.' 
            : 'For 20 years valuing artists and promoting the creative economy of Rio\'s carnival.'}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center animate-fade-in">
          <Button
            asChild
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
          >
            <a href="https://wa.me/5521989392920" target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              {language === 'pt' ? 'Quero Apoiar' : 'I Want to Support'}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-full backdrop-blur-sm transition-all duration-300"
          >
            <a href="/contato">
              <MapPin className="mr-2 h-5 w-5" />
              {language === 'pt' ? 'Levar para Minha Cidade' : 'Bring to My City'}
            </a>
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
