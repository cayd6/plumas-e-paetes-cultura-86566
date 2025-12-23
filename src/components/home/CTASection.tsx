import { ArrowRight, Heart, Building, Users, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { language } = useLanguage();

  const audiences = [
    { icon: <Building className="h-5 w-5" />, label: language === 'pt' ? 'Empresas' : 'Companies' },
    { icon: <Users className="h-5 w-5" />, label: language === 'pt' ? 'Órgãos Públicos' : 'Public Agencies' },
    { icon: <Music className="h-5 w-5" />, label: language === 'pt' ? 'Escolas de Samba' : 'Samba Schools' },
  ];

  return (
    <section className="py-16 md:py-20 carnival-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 text-primary-foreground/80" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground">
            {language === 'pt' ? 'Faça Parte da Transformação Cultural' : 'Be Part of the Cultural Transformation'}
          </h2>
          <p className="text-lg md:text-xl mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Junte-se a nós na missão de valorizar a cultura popular brasileira e transformar vidas através da economia criativa.' 
              : 'Join us in the mission to value Brazilian popular culture and transform lives through the creative economy.'}
          </p>
          
          {/* Who can participate */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 rounded-full text-primary-foreground text-sm"
              >
                {audience.icon}
                <span>{audience.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 font-bold text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <a href="/contato">
                {language === 'pt' ? 'Entrar em Contato' : 'Get in Touch'}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              <a href="https://wa.me/5521989392920" target="_blank" rel="noopener noreferrer">
                {language === 'pt' ? 'WhatsApp Direto' : 'Direct WhatsApp'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
