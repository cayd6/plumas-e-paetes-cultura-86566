import { ArrowRight, Heart, Building, Users, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { language } = useLanguage();

  const audiences = [
    {
      icon: <Building className="h-5 w-5" />,
      label: language === 'pt' ? 'Para empresas' : 'For companies',
      desc: language === 'pt'
        ? 'Desenvolvemos projetos culturais, ações de relacionamento, conteúdos e experiências compatíveis à sua marca e ao território do carnaval.'
        : 'We develop cultural projects, engagement actions, content and experiences aligned with your brand and the carnival territory.',
    },
    {
      icon: <Users className="h-5 w-5" />,
      label: language === 'pt' ? 'Para o poder público' : 'For public agencies',
      desc: language === 'pt'
        ? 'Atuamos em parceria com prefeituras, secretarias, instituições de cultura e educação para fortalecer a cultura popular e a economia criativa.'
        : 'We partner with city halls, secretariats, culture and education institutions to strengthen popular culture and the creative economy.',
    },
    {
      icon: <Music className="h-5 w-5" />,
      label: language === 'pt' ? 'Para escolas de samba' : 'For samba schools',
      desc: language === 'pt'
        ? 'Criamos pontes, projetos e ações que fortalecem os fazedores, preservam memórias e ampliam oportunidades.'
        : 'We build bridges, projects and actions that strengthen makers, preserve memories and expand opportunities.',
    },
  ];

  return (
    <section className="py-16 md:py-20 carnival-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 text-primary-foreground/80" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-primary-foreground">
            {language === 'pt' ? 'Vamos construir juntos o futuro do carnaval' : 'Let\'s build the future of carnival together'}
          </h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Seja apoiando projetos, levando nossas iniciativas para sua cidade, contratando espetáculos ou desenvolvendo ações em parceria, o Instituto Plumas & Paetês Cultural está pronto para dialogar com você.' 
              : 'Whether supporting projects, bringing our initiatives to your city, hiring shows or developing joint actions, Instituto Plumas & Paetês Cultural is ready to talk with you.'}
          </p>
          
          {/* Audiences with descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            {audiences.map((audience, index) => (
              <div 
                key={index}
                className="p-5 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl border border-primary-foreground/10"
              >
                <div className="flex items-center gap-2 mb-2 text-primary-foreground font-semibold">
                  {audience.icon}
                  <span>{audience.label}</span>
                </div>
                <p className="text-sm text-primary-foreground/85 leading-relaxed">
                  {audience.desc}
                </p>
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
                {language === 'pt' ? 'Falar com o Instituto' : 'Talk to the Institute'}
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
                {language === 'pt' ? 'Chamar no WhatsApp' : 'Message on WhatsApp'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
