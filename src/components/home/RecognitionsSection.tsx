import { Award, Building, Calendar, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RecognitionsSection = () => {
  const { language } = useLanguage();

  const recognitions = [
    {
      icon: <Award className="h-6 w-6" />,
      title: language === 'pt' ? 'Diploma Heloneida Studart' : 'Heloneida Studart Diploma',
      description: language === 'pt' ? 'Homenagem da ALERJ' : 'ALERJ Tribute',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === 'pt' ? 'Parceria com OEI' : 'OEI Partnership',
      description: language === 'pt' ? 'Organização dos Estados Ibero-americanos' : 'Organization of Ibero-American States',
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: language === 'pt' ? '20 Anos de Atuação' : '20 Years of Activity',
      description: language === 'pt' ? 'Desde 2005' : 'Since 2005',
    },
    {
      icon: <Building className="h-6 w-6" />,
      title: language === 'pt' ? 'Múltiplas Cidades' : 'Multiple Cities',
      description: language === 'pt' ? 'Rio, Niterói, Maricá, Brasília e mais' : 'Rio, Niterói, Maricá, Brasília and more',
    },
  ];

  return (
    <section className="py-10 bg-muted/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {recognitions.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-4 py-2"
            >
              <div className="text-primary">
                {item.icon}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm md:text-base">
                  {item.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionsSection;
