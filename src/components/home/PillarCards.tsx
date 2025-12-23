import { Target, Eye, Heart, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  summary: string;
  colorClass: string;
}

const PillarCard = ({ icon, title, summary, colorClass }: PillarCardProps) => {
  const { language } = useLanguage();
  
  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-card">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorClass}`} />
      <CardHeader className="relative z-10 pb-2">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${colorClass.replace('bg-gradient-to-br', 'bg-gradient-to-br').replace('/5', '')}`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10">
        <CardDescription className="text-muted-foreground text-base leading-relaxed mb-4">
          {summary}
        </CardDescription>
        <Link 
          to="/sobre" 
          className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all duration-300 gap-1"
        >
          {language === 'pt' ? 'Ler mais' : 'Read more'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

const PillarCards = () => {
  const { language } = useLanguage();

  const pillars = [
    {
      icon: <Target className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Missão' : 'Mission',
      summary: language === 'pt' 
        ? 'Transformar a sociedade brasileira pela economia criativa, valorizando artistas e promovendo a cultura popular.'
        : 'Transform Brazilian society through the creative economy, valuing artists and promoting popular culture.',
      colorClass: 'bg-gradient-to-br from-primary/5 to-accent/5',
    },
    {
      icon: <Eye className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Visão' : 'Vision',
      summary: language === 'pt'
        ? 'Ser um agente amplificador da riqueza cultural do país, iluminando a arte de seus fazedores.'
        : 'To be an amplifying agent of the country\'s cultural wealth, illuminating the art of its creators.',
      colorClass: 'bg-gradient-to-br from-secondary/5 to-accent/5',
    },
    {
      icon: <Heart className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Valores' : 'Values',
      summary: language === 'pt'
        ? 'Criatividade, diversidade, acessibilidade e sustentabilidade em tudo que fazemos.'
        : 'Creativity, diversity, accessibility and sustainability in everything we do.',
      colorClass: 'bg-gradient-to-br from-[hsl(142,76%,36%)]/5 to-secondary/5',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'pt' ? 'Nossos Pilares' : 'Our Pillars'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Os fundamentos que guiam nossa jornada de 20 anos' 
              : 'The foundations that guide our 20-year journey'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={index}
              icon={pillar.icon}
              title={pillar.title}
              summary={pillar.summary}
              colorClass={pillar.colorClass}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarCards;
