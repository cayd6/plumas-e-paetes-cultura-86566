import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const PillarCards = () => {
  const { language } = useLanguage();

  const pillars = [
    {
      titlePt: 'Memória e reconhecimento',
      titleEn: 'Memory and recognition',
      descPt: 'Registramos trajetórias e premiamos os profissionais que constroem o carnaval, transformando bastidores em patrimônio cultural.',
      descEn: 'We document journeys and honor the professionals who build carnival, turning backstage work into cultural heritage.',
      link: '/premio',
    },
    {
      titlePt: 'Formação e futuro',
      titleEn: 'Training and future',
      descPt: 'Promovemos oficinas e capacitações que fortalecem a cadeia produtiva do carnaval e abrem caminhos para novas gerações.',
      descEn: 'We run workshops and training that strengthen the carnival production chain and open paths for new generations.',
      link: '/sobre',
    },
    {
      titlePt: 'Produção cultural',
      titleEn: 'Cultural production',
      descPt: 'Levamos espetáculos, projetos e experiências do carnaval a palcos e territórios em todo o país.',
      descEn: 'We bring carnival-related shows, projects and experiences to stages and territories nationwide.',
      link: '/producao',
    },
    {
      titlePt: 'Articulação e incidência',
      titleEn: 'Advocacy and engagement',
      descPt: 'Dialogamos com instituições públicas e privadas para reconhecer o carnaval como patrimônio e motor da economia criativa.',
      descEn: 'We engage public and private institutions to recognize carnival as heritage and driver of the creative economy.',
      link: '/sobre',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Coluna editorial à esquerda */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start">
            <p className="uppercase tracking-[0.25em] text-xs text-primary mb-4 font-medium">
              {language === 'pt' ? '— Pilares institucionais' : '— Institutional pillars'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6 leading-[1.05] tracking-tight">
              {language === 'pt'
                ? 'Quatro frentes que iluminam quem faz o carnaval.'
                : 'Four fronts shining a light on those who make carnival.'}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {language === 'pt'
                ? 'Atuamos na interseção entre memória, reconhecimento, formação e produção cultural — sempre com foco nos fazedores por trás do desfile.'
                : 'We work at the intersection of memory, recognition, training and cultural production — always focused on the makers behind the parade.'}
            </p>
          </div>

          {/* Lista numerada editorial */}
          <ol className="lg:col-span-7 divide-y divide-border border-t border-border">
            {pillars.map((p, i) => (
              <li key={i} className="group">
                <Link
                  to={p.link}
                  className="flex gap-6 md:gap-8 py-8 md:py-10 hover:bg-muted/30 transition-colors -mx-4 px-4 rounded-md"
                >
                  <span className="font-serif text-3xl md:text-4xl text-primary/40 group-hover:text-primary transition-colors tabular-nums shrink-0 w-12">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors flex items-center gap-3 leading-tight">
                      {language === 'pt' ? p.titlePt : p.titleEn}
                      <ArrowUpRight className="h-5 w-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {language === 'pt' ? p.descPt : p.descEn}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default PillarCards;
