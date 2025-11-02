import { Link } from "react-router-dom";
import { Instagram, Facebook, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { translate } = useLanguage();

  return (
    <footer className="bg-gray-950 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png"
                alt="Instituto Plumas e Paetês Cultural"
                className="h-12 w-auto"
              />
            </div>
            <h3 className="text-xl font-bold mb-4 text-carnival-gold">
              Instituto Plumas & Paetês Cultural
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              {translate('footerAbout')}
            </p>
            <p className="text-gray-500 text-sm">
              {translate('cnpj')}: 11.985.110/0001-76
            </p>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{translate('linksRapidos')}</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('inicio')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/sobre" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('quemSomos')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/edicoes" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('premioPlumas')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/revista" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('revista')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/producao" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('producaoEventos')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/galeria" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('galeria')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('blog')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contato" 
                  className="text-gray-400 hover:text-carnival-gold transition-colors flex items-center gap-2"
                >
                  {translate('contato')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{translate('faleConosco')}</h3>
            <div className="space-y-4 text-gray-400">
              <div className="flex items-start gap-3">
                <Mail size={20} className="mt-1 flex-shrink-0 text-carnival-gold" />
                <a 
                  href="mailto:contato@institutoplumasepaetescultural.com" 
                  className="hover:text-carnival-gold transition-colors break-all"
                >
                  contato@institutoplumasepaetescultural.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="flex-shrink-0 text-carnival-gold" />
                <a 
                  href="https://wa.me/5521989392920" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-carnival-gold transition-colors"
                >
                  +55 21 98939-2920
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 flex-shrink-0 text-carnival-gold" />
                <span>
                  Rio de Janeiro, RJ<br />
                  Brasil
                </span>
              </div>
            </div>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">{translate('redesSociais')}</h3>
            <p className="text-gray-400 mb-6">
              {translate('followEventsCaption')}
            </p>
            <div className="flex gap-4 mb-6">
              <a 
                href="https://www.instagram.com/plumasepaetescultural/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-carnival-magenta transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="https://www.facebook.com/plumasepaetescultural/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/10 rounded-full hover:bg-carnival-purple transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-center text-sm text-gray-400">
                <strong className="text-carnival-gold">19.6k</strong> {translate('seguidores')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Instituto Plumas e Paetês Cultural. {translate('direitosReservados')}
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Desenvolvido por Machado Dev
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link 
                to="/politica-privacidade" 
                className="text-gray-400 hover:text-carnival-gold transition-colors"
              >
                {translate('privacyPolicy')}
              </Link>
              <Link 
                to="/termos-uso" 
                className="text-gray-400 hover:text-carnival-gold transition-colors"
              >
                {translate('termsOfUse')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
