
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Revistas = () => {
  const { translate } = useLanguage();
  const revistas = [
    {
      id: 1,
      titulo: "Edição 2024",
      capa: "https://source.unsplash.com/random/800x1000/?carnival,magazine",
      descricao: "Especial de Carnaval 2024"
    },
    {
      id: 2,
      titulo: "Edição 2023",
      capa: "https://source.unsplash.com/random/800x1000/?carnival,culture",
      descricao: "Retrospectiva Cultural"
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {translate("revistas")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {revistas.map((revista) => (
              <div key={revista.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <img 
                  src={revista.capa} 
                  alt={revista.titulo}
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{revista.titulo}</h3>
                  <p className="text-gray-600 mb-4">{revista.descricao}</p>
                  <button className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80">
                    {translate("lerMais")} <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revistas;
