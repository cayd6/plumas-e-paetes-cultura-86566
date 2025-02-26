
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";

const Noticias = () => {
  const { translate } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {translate("noticias")}
          </h1>
          {/* Content will be added later */}
          <div className="text-center text-gray-600">
            Em breve
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
