import { useLanguage } from "@/contexts/LanguageContext";

interface Partner {
  name: string;
  logo?: string;
}

const PartnersSection = () => {
  const { language } = useLanguage();

  // Parceiros reais baseados no conteúdo do site
  const partners: Partner[] = [
    { name: "OEI - Organização dos Estados Ibero-americanos" },
    { name: "ALERJ - Assembleia Legislativa do Rio de Janeiro" },
    { name: "Prefeitura do Rio de Janeiro" },
    { name: "Prefeitura de Niterói" },
    { name: "Prefeitura de Maricá" },
    { name: "Secretaria de Cultura do Distrito Federal" },
  ];

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            {language === 'pt' ? 'Parceiros e apoiadores' : 'Partners and supporters'}
          </h2>
          <p className="text-muted-foreground mb-2">
            {language === 'pt' 
              ? 'Nosso trabalho só é possível graças à confiança e ao apoio de instituições públicas, privadas e organizações da sociedade civil que acreditam na força do carnaval como cultura, educação e desenvolvimento.' 
              : 'Our work is only possible thanks to the trust and support of public, private and civil society institutions that believe in carnival as culture, education and development.'}
          </p>
          <p className="text-sm text-muted-foreground italic">
            {language === 'pt' 
              ? 'Juntos, ampliamos o alcance de nossos projetos e fortalecemos a cadeia produtiva do carnaval.' 
              : 'Together, we expand the reach of our projects and strengthen the carnival production chain.'}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-4xl mx-auto">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="flex items-center justify-center px-6 py-4 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-colors duration-300"
            >
              {partner.logo ? (
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-10 md:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm md:text-base font-medium text-muted-foreground text-center">
                  {partner.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
