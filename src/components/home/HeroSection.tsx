import { ArrowRight, MessageCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnniversaryButton from "@/components/AnniversaryButton";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { language } = useLanguage();

  return (
    <section 
      id="inicio" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url('/lovable-uploads/hero-background.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Anniversary Badge */}
          <div className="mb-6 animate-fade-in">
            <AnniversaryButton />
          </div>
          
          {/* H1 - Main Title with Benefit */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 md:mb-6 text-primary-foreground animate-fade-in leading-tight">
            {language === 'pt' ? (
              <>
                <span className="text-secondary">Transformando</span> vidas
                <br className="hidden sm:block" />
                <span className="block sm:inline"> pela </span>
                <span className="text-secondary">cultura</span>
              </>
            ) : (
              <>
                <span className="text-secondary">Transforming</span> lives
                <br className="hidden sm:block" />
                <span className="block sm:inline"> through </span>
                <span className="text-secondary">culture</span>
              </>
            )}
          </h1>
          
          {/* Subtitle with Institute Name */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-4 animate-fade-in font-medium">
            Instituto Plumas & Paetês Cultural
          </p>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-8 md:mb-10 animate-fade-in font-light max-w-2xl px-4">
            {language === 'pt' 
              ? 'Há 20 anos valorizando artistas e promovendo a economia criativa do carnaval carioca.' 
              : 'For 20 years valuing artists and promoting the creative economy of Rio\'s carnival.'}
          </p>
          
          {/* CTA Buttons - Clear actions */}
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
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
