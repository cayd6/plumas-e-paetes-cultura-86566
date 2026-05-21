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
          
          {/* H1 - Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 text-primary-foreground animate-fade-in leading-tight">
            Instituto <span className="text-secondary">Plumas & Paetês</span> Cultural
          </h1>
          
          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-primary-foreground/90 mb-4 animate-fade-in font-light max-w-3xl px-4 leading-relaxed">
            {language === 'pt' 
              ? 'Há mais de 20 anos registrando, valorizando e conectando os fazedores do carnaval carioca e de todo o Brasil, transformando bastidores em patrimônio cultural e economia criativa.' 
              : 'For over 20 years documenting, valuing and connecting the makers of Rio\'s carnival and across Brazil, turning backstage work into cultural heritage and creative economy.'}
          </p>
          <p className="text-sm md:text-base text-primary-foreground/75 mb-8 md:mb-10 animate-fade-in italic max-w-2xl px-4">
            {language === 'pt' 
              ? 'Prêmio, revista, formação, produção de espetáculos e memória viva dos profissionais que fazem o maior espetáculo da Terra acontecer.' 
              : 'Award, magazine, training, show production and living memory of the professionals who make the greatest show on Earth happen.'}
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
