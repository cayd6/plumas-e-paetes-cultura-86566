import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const PillarCards = () => {
  const { language } = useLanguage();

  const pillars = [
    {
      titlePt: 'Memória e reconhecimento',
      titleEn: 'Memory and recognition',
      descPt: 'Seu trabalho registrado e celebrado como patrimônio: premiamos os profissionais que constroem o carnaval e damos visibilidade a quem sempre ficou nos bastidores.',
      descEn: 'Your work registered and celebrated as heritage: we honor the professionals who build carnival and give visibility to those who always worked behind the scenes.',
      link: '/premio',
    },
    {
      titlePt: 'Formação e renda',
      titleEn: 'Training and income',
      descPt: 'Oficinas e capacitações que abrem portas: novas oportunidades de trabalho e renda para quem vive da cadeia produtiva do carnaval.',
      descEn: 'Workshops and training that open doors: new job and income opportunities for those who live off the carnival production chain.',
      link: '/sobre',
    },
    {
      titlePt: 'Circulação',
      titleEn: 'Circulation',
      descPt: 'Levando o espetáculo da avenida para teatros e territórios: projetos e experiências do carnaval em palcos de todo o país.',
      descEn: 'Taking the show from the avenue to theaters and territories: carnival projects and experiences on stages across the country.',
      link: '/producao',
    },
    {
      titlePt: 'Defesa de direitos',
      titleEn: 'Advocacy',
      descPt: 'Transformando o carnaval em política pública e garantia de renda: dialogamos com instituições para reconhecer o setor como patrimônio e motor da economia criativa.',
      descEn: 'Turning carnival into public policy and income security: we engage institutions to recognize the sector as heritage and driver of the creative economy.',
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
