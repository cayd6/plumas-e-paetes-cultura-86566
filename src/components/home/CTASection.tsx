import { ArrowRight, Building, Users, Music, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { language } = useLanguage();

  const audiences = [
    {
      icon: <Building className="h-5 w-5" />,
      labelPt: 'Empresas e patrocinadores',
      labelEn: 'Companies and sponsors',
      ctaPt: 'Quero patrocinar o carnaval',
      ctaEn: 'I want to sponsor carnival',
      href: '/contato',
    },
    {
      icon: <Users className="h-5 w-5" />,
      labelPt: 'Prefeituras e instituições',
      labelEn: 'City halls and institutions',
      ctaPt: 'Levar o prêmio para minha cidade',
      ctaEn: 'Bring the award to my city',
      href: '/contato',
    },
    {
      icon: <Music className="h-5 w-5" />,
      labelPt: 'Escolas de samba',
      labelEn: 'Samba schools',
      ctaPt: 'Agendar uma oficina de formação',
      ctaEn: 'Book a training workshop',
      href: '/contato',
    },
    {
      icon: <Newspaper className="h-5 w-5" />,
      labelPt: 'Imprensa e mídia',
      labelEn: 'Press and media',
      ctaPt: 'Baixar o media kit',
      ctaEn: 'Download the media kit',
      href: '/contato',
    },
  ];

  return (
    <section className="py-20 md:py-28 carnival-gradient text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* 60% — manifesto */}
          <div className="lg:col-span-7">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary mb-4 font-medium">
              {language === 'pt' ? '— Parcerias' : '— Partnerships'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 leading-[1.05] tracking-tight">
              {language === 'pt'
                ? 'Construa com o Instituto a próxima década do carnaval.'
                : 'Build the next decade of carnival with the Institute.'}
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/85 leading-relaxed mb-8 max-w-2xl">
              {language === 'pt'
                ? 'Patrocínio, projetos culturais para cidades, produção de espetáculos, programas formativos e propostas editoriais — estamos prontos para co-criar.'
                : 'Sponsorship, cultural projects for cities, show production, training programs and editorial proposals — we are ready to co-create.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-background text-primary hover:bg-background/90 font-semibold rounded-full px-7">
                <Link to="/contato">
                  {language === 'pt' ? 'Iniciar uma parceria' : 'Start a partnership'}
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
                  {language === 'pt' ? 'WhatsApp direto' : 'Direct WhatsApp'}
                </a>
              </Button>
            </div>
          </div>

          {/* 40% — públicos segmentados */}
          <ul className="lg:col-span-5 divide-y divide-primary-foreground/20 border-y border-primary-foreground/20">
            {audiences.map((a, i) => (
              <li key={i}>
                <Link
                  to={a.href}
                  className="flex items-center gap-4 py-5 group hover:pl-2 transition-all"
                >
                  <span className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-secondary shrink-0">
                    {a.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-primary-foreground leading-tight">
                      {language === 'pt' ? a.labelPt : a.labelEn}
                    </p>
                    <p className="text-sm text-primary-foreground/70">
                      {language === 'pt' ? a.ctaPt : a.ctaEn}
                    </p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-primary-foreground/60 group-hover:text-secondary group-hover:translate-x-1 transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
