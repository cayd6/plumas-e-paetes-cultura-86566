import { ArrowRight, Landmark, TrendingUp, Users, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpactLegacySection = () => {
  const { language } = useLanguage();

  const stats = [
    {
      value: '20',
      labelPt: 'anos de atuação contínua',
      labelEn: 'years of continuous work',
    },
    {
      value: '1.400+',
      labelPt: 'profissionais premiados',
      labelEn: 'awarded professionals',
    },
    {
      value: '52',
      labelPt: 'categorias por edição',
      labelEn: 'categories per edition',
    },
    {
      value: '5.000',
      labelPt: 'exemplares da revista por edição',
      labelEn: 'magazine copies per edition',
    },
  ];

  const pillars = [
    {
      icon: <Landmark className="h-5 w-5" />,
      titlePt: 'Impacto para o poder público',
      titleEn: 'Impact for public institutions',
      descPt: 'Projetos que transformam o carnaval em política cultural, geração de emprego e renda para milhares de profissionais.',
      descEn: 'Projects that turn carnival into cultural policy, jobs and income for thousands of professionals.',
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      titlePt: 'Retorno para patrocinadores',
      titleEn: 'Return for sponsors',
      descPt: 'Marca associada à maior memória viva do carnaval, com alcance em cerimônias, revista impressa e plataformas digitais.',
      descEn: 'A brand associated with the largest living memory of carnival, reaching ceremonies, print magazine and digital platforms.',
    },
    {
      icon: <Users className="h-5 w-5" />,
      titlePt: 'Legado para as comunidades',
      titleEn: 'Legacy for communities',
      descPt: 'Reconhecimento que valoriza profissionais historicamente invisibilizados e fortalece a cadeia criativa do carnaval.',
      descEn: 'Recognition that values historically invisible professionals and strengthens the carnival creative chain.',
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      titlePt: 'Alcance editorial',
      titleEn: 'Editorial reach',
      descPt: 'Revista anual de circulação gratuita e acervo audiovisual que documentam os bastidores do maior espetáculo da Terra.',
      descEn: 'Annual free-circulation magazine and audiovisual archive documenting behind the scenes of the greatest show on Earth.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-5">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary mb-4 font-medium">
              {language === 'pt' ? '— Impacto e legado' : '— Impact and legacy'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              {language === 'pt'
                ? 'Mais que celebração, um retorno concreto para quem investe no carnaval.'
                : 'More than celebration — a concrete return for those who invest in carnival.'}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed">
              {language === 'pt'
                ? 'Há mais de duas décadas transformando bastidores em patrimônio: reconhecimento, formação e produção que geram renda, valorizam o território e constroem a memória cultural do país.'
                : 'For over two decades turning backstage work into heritage: recognition, training and production that generate income, value the territory and build the country cultural memory.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-primary-foreground/15 border-y border-primary-foreground/20 mb-16">
          {stats.map((s) => (
            <div key={s.labelPt} className="py-8 px-4 first:pl-0">
              <div className="font-serif text-4xl md:text-5xl text-secondary mb-3 font-semibold">{s.value}</div>
              <p className="text-sm md:text-base text-primary-foreground/80">
                {language === 'pt' ? s.labelPt : s.labelEn}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((p) => (
            <div key={p.titlePt} className="rounded-2xl bg-primary-foreground/5 border border-primary-foreground/15 p-6 hover:bg-primary-foreground/10 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h3 className="font-semibold text-primary-foreground mb-2">{language === 'pt' ? p.titlePt : p.titleEn}</h3>
              <p className="text-sm text-primary-foreground/75 leading-relaxed">{language === 'pt' ? p.descPt : p.descEn}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-full px-7">
            <Link to="/contato">
              {language === 'pt' ? 'Discutir uma parceria' : 'Discuss a partnership'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold rounded-full px-7"
          >
            <a href="https://wa.me/5521989392920" target="_blank" rel="noopener noreferrer">
              {language === 'pt' ? 'Falar com nossa equipe' : 'Talk to our team'}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactLegacySection;
