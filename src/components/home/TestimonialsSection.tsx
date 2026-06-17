import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  quotePt: string;
  quoteEn: string;
  name: string;
  rolePt: string;
  roleEn: string;
}

const testimonials: Testimonial[] = [
  {
    quotePt: "O Prêmio Plumas & Paetês é fundamental para reconhecer o trabalho dos artistas anônimos que fazem o carnaval acontecer.",
    quoteEn: "The Plumas & Paetês Award is fundamental to recognizing the work of anonymous artists who make carnival happen.",
    name: "Maria Augusta",
    rolePt: "Carnavalesca homenageada",
    roleEn: "Honored carnival designer",
  },
  {
    quotePt: "O Instituto transformou minha vida profissional, me dando visibilidade e oportunidades únicas dentro da economia criativa.",
    quoteEn: "The Institute transformed my professional life, giving me visibility and unique opportunities within the creative economy.",
    name: "João Silva",
    rolePt: "Artesão premiado",
    roleEn: "Award-winning artisan",
  },
  {
    quotePt: "As oficinas de capacitação são essenciais para a formação de novos profissionais da economia criativa do carnaval.",
    quoteEn: "The training workshops are essential for forming new professionals in the carnival creative economy.",
    name: "Ana Santos",
    rolePt: "Produtora cultural",
    roleEn: "Cultural producer",
  },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const go = (dir: 1 | -1) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4">
        <p className="uppercase tracking-[0.25em] text-xs text-primary mb-4 font-medium text-center">
          {language === 'pt' ? '— Vozes do carnaval' : '— Carnival voices'}
        </p>

        <div className="max-w-4xl mx-auto text-center">
          <Quote className="h-12 w-12 mx-auto mb-8 text-primary/30" aria-hidden="true" />
          <blockquote
            key={index}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-foreground leading-snug mb-10 animate-fade-in"
          >
            &ldquo;{language === 'pt' ? t.quotePt : t.quoteEn}&rdquo;
          </blockquote>
          <div className="mb-10">
            <p className="font-semibold text-foreground text-lg">{t.name}</p>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              {language === 'pt' ? t.rolePt : t.roleEn}
            </p>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={language === 'pt' ? 'Depoimento anterior' : 'Previous testimonial'}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm tabular-nums text-muted-foreground">
              {String(index + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={language === 'pt' ? 'Próximo depoimento' : 'Next testimonial'}
              className="w-11 h-11 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
