import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { translate, language } = useLanguage();

  return (
    <section className="py-16 md:py-20 carnival-gradient">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="h-12 w-12 mx-auto mb-6 text-primary-foreground/80" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-primary-foreground">
            {translate('ctaTitle')}
          </h2>
          <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 max-w-2xl mx-auto">
            {translate('ctaSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-background text-primary hover:bg-background/90 font-bold text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-all duration-300"
            >
              <a href="/contato">
                {translate('entrarContato')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground/30 text-primary-foreground bg-transparent hover:bg-primary-foreground/10 font-semibold text-lg px-8 py-6 rounded-full transition-all duration-300"
            >
              <a href="/edicoes">
                {language === 'pt' ? 'Ver Edições do Prêmio' : 'View Award Editions'}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
