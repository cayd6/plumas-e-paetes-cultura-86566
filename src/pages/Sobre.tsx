
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";

const Sobre = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {translate("sobre")}
          </h1>
          <div className="max-w-3xl mx-auto">
            <p className="text-center text-gray-600">
              {translate("nossaMissao")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sobre;
