import { ArrowRight, MessageCircle } from "lucide-react";
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
      {/* Background — mantido intocado */}
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
          <div className="mb-6 animate-fade-in">
            <AnniversaryButton />
          </div>

          <p className="uppercase tracking-[0.3em] text-xs sm:text-sm text-secondary mb-4 animate-fade-in font-medium">
            {language === 'pt' ? 'Instituto Plumas & Paetês Cultural' : 'Plumas & Paetês Cultural Institute'}
          </p>

          {/* H1 enxuto — frase-manifesto */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 text-primary-foreground animate-fade-in leading-[1.05] tracking-tight">
            {language === 'pt' ? (
              <>Memória viva do <span className="italic text-secondary">carnaval</span> brasileiro.</>
            ) : (
              <>Living memory of Brazilian <span className="italic text-secondary">carnival</span>.</>
            )}
          </h1>

          <p className="text-base md:text-lg text-primary-foreground/85 mb-10 animate-fade-in max-w-2xl px-4 leading-relaxed">
            {language === 'pt'
              ? 'Há mais de 20 anos registrando, premiando e formando quem faz o maior espetáculo da Terra acontecer.'
              : 'For over 20 years documenting, awarding and training those who make the greatest show on Earth happen.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center animate-fade-in">
            <Button
              asChild
              size="lg"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold text-base md:text-lg px-7 md:px-8 py-5 md:py-6 rounded-full shadow-xl hover:scale-105 transition-all duration-300"
            >
              <a href="/sobre">
                {language === 'pt' ? 'Conheça o Instituto' : 'About the Institute'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground/30 text-primary-foreground bg-primary-foreground/10 hover:bg-primary-foreground/20 font-semibold text-base md:text-lg px-7 md:px-8 py-5 md:py-6 rounded-full backdrop-blur-sm transition-all duration-300"
            >
              <a href="https://wa.me/5521989392920" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {language === 'pt' ? 'Apoiar' : 'Support us'}
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator — mantido */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary-foreground/50 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
