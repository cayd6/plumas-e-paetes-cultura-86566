import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  quotePt: string;
  quoteEn: string;
  name: string;
  rolePt: string;
  roleEn: string;
}

const testimonials: Testimonial[] = [
  {
    quotePt: "O Prêmio Plumas e Paetês é fundamental para reconhecer o trabalho dos artistas anônimos que fazem o carnaval acontecer.",
    quoteEn: "The Plumas e Paetês Award is fundamental to recognizing the work of anonymous artists who make carnival happen.",
    name: "Maria Augusta",
    rolePt: "Carnavalesca Homenageada",
    roleEn: "Honored Carnival Designer",
  },
  {
    quotePt: "O Instituto transformou minha vida profissional, me dando visibilidade e oportunidades únicas.",
    quoteEn: "The Institute transformed my professional life, giving me visibility and unique opportunities.",
    name: "João Silva",
    rolePt: "Artesão Premiado",
    roleEn: "Award-winning Artisan",
  },
  {
    quotePt: "As oficinas de capacitação são essenciais para a formação de novos profissionais da economia criativa.",
    quoteEn: "The training workshops are essential for forming new professionals in the creative economy.",
    name: "Ana Santos",
    rolePt: "Produtora Cultural",
    roleEn: "Cultural Producer",
  },
];

const TestimonialsSection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            {language === 'pt' ? 'Vozes do carnaval sobre o Instituto' : 'Carnival voices about the Institute'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {language === 'pt' 
              ? 'Quem vive o carnaval nos bastidores sabe o impacto que o reconhecimento e a memória têm na vida de cada profissional. Veja o que alguns parceiros e fazedores falam sobre o nosso trabalho.'
              : 'Those who experience carnival behind the scenes know the impact recognition and memory have on every professional\'s life.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-card border-border/50 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="pt-6">
                <Quote className="h-8 w-8 text-primary/30 mb-4" />
                <blockquote className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{language === 'pt' ? testimonial.quotePt : testimonial.quoteEn}"
                </blockquote>
                <div className="border-t border-border pt-4">
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {language === 'pt' ? testimonial.rolePt : testimonial.roleEn}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
