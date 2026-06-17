import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

/**
 * Seção destaque do Prêmio Plumas & Paetês Cultural — formato editorial
 * "capa de revista". Substitui o uso do HeroBanner duplicado na home.
 */
const AwardFeatureSection = () => {
  const { language } = useLanguage();

  const honored = [
    'Maria Augusta', 'Joãosinho Trinta', 'Dona Ivone Lara', 'Monarco',
    'Elza Soares', 'Chiquinha Gonzaga', 'Donga', 'Beth Carvalho',
  ];

  return (
    <section className="py-20 md:py-28 bg-muted/40">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* "Capa" visual */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-2xl bg-primary">
              <img
                src="/lovable-uploads/hero-background.jpg"
                alt={language === 'pt'
                  ? 'Cerimônia do Prêmio Plumas & Paetês Cultural'
                  : 'Plumas & Paetês Cultural Award ceremony'}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start text-primary-foreground">
                <p className="uppercase tracking-[0.3em] text-xs">Vol. 19</p>
                <p className="uppercase tracking-[0.3em] text-xs">2024</p>
              </div>
              <div className="absolute bottom-8 left-8 right-8 text-primary-foreground">
                <p className="uppercase tracking-[0.25em] text-xs text-secondary mb-3">
                  {language === 'pt' ? 'Edição em destaque' : 'Featured edition'}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-semibold leading-tight mb-2">
                  {language === 'pt' ? 'Os mestres do brilho' : 'Masters of the shine'}
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  {language === 'pt'
                    ? 'Cerimônia no Theatro Municipal · 52 categorias'
                    : 'Ceremony at Theatro Municipal · 52 categories'}
                </p>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-secondary text-secondary-foreground flex flex-col items-center justify-center shadow-xl rotate-12">
              <span className="font-serif text-3xl font-bold leading-none">20</span>
              <span className="text-[10px] uppercase tracking-wider mt-1">
                {language === 'pt' ? 'anos' : 'years'}
              </span>
            </div>
          </div>

          {/* Texto editorial */}
          <div className="lg:col-span-6">
            <p className="uppercase tracking-[0.25em] text-xs text-primary mb-4 font-medium">
              {language === 'pt' ? '— Prêmio Plumas & Paetês Cultural' : '— Plumas & Paetês Cultural Award'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-[1.05] tracking-tight">
              {language === 'pt'
                ? 'O Oscar dos bastidores do carnaval.'
                : 'The Oscars of carnival\u2019s backstage.'}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              {language === 'pt'
                ? 'Desde 2005, mais de 1.400 profissionais foram reconhecidos em 52 categorias técnicas. O Prêmio é a maior celebração nacional dos artífices que fazem o carnaval acontecer.'
                : 'Since 2005, over 1,400 professionals have been recognized across 52 technical categories. The Award is the largest national celebration of the artisans who make carnival happen.'}
            </p>

            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
                {language === 'pt' ? 'Alguns homenageados' : 'Some honorees'}
              </p>
              <div className="flex flex-wrap gap-2">
                {honored.map((name) => (
                  <span
                    key={name}
                    className="px-3 py-1.5 text-sm border border-border rounded-full bg-background text-foreground/80 hover:border-primary hover:text-primary transition-colors"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/premio">
                  {language === 'pt' ? 'Conhecer o Prêmio' : 'Discover the Award'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link to="/edicoes">
                  {language === 'pt' ? 'Arquivo de edições' : 'Editions archive'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardFeatureSection;
