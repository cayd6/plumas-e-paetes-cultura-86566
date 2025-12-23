import { useLanguage } from "@/contexts/LanguageContext";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const AboutSection = () => {
  const { translate, language } = useLanguage();

  const aboutItems = [
    {
      id: "origem",
      titlePt: "Nossa Origem",
      titleEn: "Our Origin",
      content: translate('quemSomosTexto1'),
    },
    {
      id: "expansao",
      titlePt: "Nossa Expansão", 
      titleEn: "Our Expansion",
      content: translate('quemSomosTexto2'),
    },
    {
      id: "atuacao",
      titlePt: "Nossa Atuação",
      titleEn: "Our Work",
      content: translate('quemSomosTexto3'),
    },
    {
      id: "reconhecimento",
      titlePt: "Nosso Reconhecimento",
      titleEn: "Our Recognition",
      content: translate('quemSomosTexto4'),
    },
  ];

  return (
    <section id="quem-somos" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              {translate('quemSomos')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Conheça a história e a missão do Instituto Plumas & Paetês Cultural'
                : 'Learn about the history and mission of Instituto Plumas & Paetês Cultural'}
            </p>
          </div>
          
          <Accordion type="single" collapsible defaultValue="origem" className="space-y-4">
            {aboutItems.map((item) => (
              <AccordionItem 
                key={item.id} 
                value={item.id}
                className="bg-card rounded-xl border border-border/50 px-6 overflow-hidden"
              >
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:text-primary transition-colors py-5">
                  {language === 'pt' ? item.titlePt : item.titleEn}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
