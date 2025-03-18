
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

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
            <p className="text-center text-gray-600 text-lg mb-8">
              {translate("missaoDesc")}
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img 
                src="/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png" 
                alt="Plumas e Paetês Cultural"
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-400">
                {translate("transformandoVidas")}
              </p>
              <p className="text-gray-400 mt-2">
                {translate("cnpj")}: 11.985.110/0001-76
              </p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/revistas" className="text-gray-400 hover:text-white transition-colors">{translate("revistas")}</a></li>
                <li><a href="/eventos" className="text-gray-400 hover:text-white transition-colors">{translate("eventos")}</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a 
                    href="mailto:contato@institutoplumasepaetescultural.com" 
                    className="hover:text-white transition-colors"
                  >
                    contato@institutoplumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <a 
                    href="https://wa.me/5521989392920" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +55 21 98939-2920
                  </a>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-400">
                  {translate("seguirRedes")}
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Plumas e Paetês Cultural. {translate("direitosReservados")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Sobre;
