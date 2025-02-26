
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const Edicoes = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {translate("edicoes")}
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative">
                <img 
                  src="/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png"
                  alt="19º Prêmio Plumas & Paetês Cultural"
                  className="w-full h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-ppc-purple text-white px-4 py-2 rounded-full">
                  {translate("dataEvento")}
                </div>
              </div>
              <div className="p-8">
                <h2 className="text-2xl font-semibold mb-4">
                  {translate("premioPlumas19")}
                </h2>
                <p className="text-gray-600 mb-6">
                  {translate("sobreEvento")}
                </p>
                <Link 
                  to="/edicoes/19"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80"
                >
                  {translate("lerMaisEdicao")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edicoes;
