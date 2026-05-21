import { Archive, GraduationCap, Theater, Landmark, ArrowRight } from "lucide-react";
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
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${colorClass}`}>
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
      icon: <Archive className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Memória e reconhecimento' : 'Memory and recognition',
      summary: language === 'pt' 
        ? 'Valorizamos trajetórias, histórias e contribuições dos profissionais que constroem o carnaval, registrando e premiando seus trabalhos.'
        : 'We honor the journeys, stories and contributions of the professionals who build carnival, documenting and awarding their work.',
      colorClass: 'bg-gradient-to-br from-primary to-accent',
    },
    {
      icon: <GraduationCap className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Formação e futuro' : 'Training and future',
      summary: language === 'pt'
        ? 'Promovemos ações formativas que fortalecem a cadeia produtiva do carnaval e abrem caminhos para novas gerações de fazedores.'
        : 'We promote training initiatives that strengthen the carnival production chain and open paths for new generations of makers.',
      colorClass: 'bg-gradient-to-br from-secondary to-accent',
    },
    {
      icon: <Theater className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Produção cultural' : 'Cultural production',
      summary: language === 'pt'
        ? 'Levamos projetos, espetáculos e experiências relacionadas ao carnaval para palcos, espaços culturais e territórios diversos.'
        : 'We bring carnival-related projects, shows and experiences to stages, cultural venues and diverse territories.',
      colorClass: 'bg-gradient-to-br from-accent to-primary',
    },
    {
      icon: <Landmark className="h-7 w-7 text-primary-foreground" />,
      title: language === 'pt' ? 'Articulação e incidência' : 'Advocacy and engagement',
      summary: language === 'pt'
        ? 'Dialogamos com instituições públicas e privadas para ampliar o reconhecimento do carnaval como patrimônio cultural e motor da economia criativa.'
        : 'We engage with public and private institutions to expand recognition of carnival as cultural heritage and a driver of the creative economy.',
      colorClass: 'bg-gradient-to-br from-primary to-secondary',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'pt' ? 'Os pilares que norteiam nossa atuação com o carnaval' : 'The pillars that guide our work with carnival'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'pt' 
              ? 'Atuamos na interseção entre memória, reconhecimento, formação e produção cultural, sempre com foco em quem construiu o carnaval por trás do desfile.' 
              : 'We work at the intersection of memory, recognition, training and cultural production, always focused on those who built carnival behind the parade.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
