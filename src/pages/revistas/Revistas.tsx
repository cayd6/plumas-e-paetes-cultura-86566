
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Revistas = () => {
  const { translate } = useLanguage();
  
  const revista = {
    id: 3,
    titulo: "Edição 2010",
    capa: "/src/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0001.jpg",
    descricao: "Prêmio Plumas e Paetês: Homenagem aos artífices e profissionais do carnaval carioca."
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {translate("revistas")}
          </h1>
          <div className="flex justify-center">
            <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-md hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
              <div className="p-2 border-2 border-ppc-purple rounded-xl">
                <Link to="/revista/2010">
                  <img 
                    src={revista.capa} 
                    alt={revista.titulo}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                </Link>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{revista.titulo}</h3>
                <p className="text-gray-600 mb-4">{revista.descricao}</p>
                <Link to="/revista/2010" className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 font-medium">
                  {translate("lerMais")} <BookOpen className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revistas;
