
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Special color for Edicoes page, dark color for other pages
  const linkClass = location.pathname === '/edicoes' 
    ? 'text-ppc-purple'  // Purple text for Edicoes page
    : (isScrolled ? 'text-black' : 'text-white'); // Dark color or white based on scroll

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png"
                alt="Instituto Plumas e Paetês Cultural"
                className="h-16 w-auto"
              />
              <div className={`hidden sm:block font-semibold text-xl ${linkClass} transition-colors duration-300`}>
                Instituto Plumas e Paetês Cultural
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('inicio')}</Link>
            <Link to="/sobre" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('quemSomos')}</Link>
            <Link to="/edicoes" className={`nav-link ${linkClass} transition-colors duration-300 relative group`}>
              {translate('premioPlumas')}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-carnival-gold rounded-full opacity-75 group-hover:opacity-100 transition-opacity"></span>
            </Link>
            <Link to="/revista" className={`nav-link ${linkClass} transition-colors duration-300`}>
              {translate('revista')}
            </Link>
            <Link to="/producao" className={`nav-link ${linkClass} transition-colors duration-300`}>
              {translate('producaoEventos')}
            </Link>
            <Link to="/galeria" className={`nav-link ${linkClass} transition-colors duration-300`}>
              {translate('galeria')}
            </Link>
            <Link to="/blog" className={`nav-link ${linkClass} transition-colors duration-300`}>
              {translate('blog')}
            </Link>
            <Link to="/contato" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('contato')}</Link>
            <Link 
              to="/contato" 
              className="px-6 py-2.5 bg-carnival-purple text-white rounded-full hover:bg-carnival-purple/90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
            >
              {translate('entrarContato')}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${linkClass} hover:text-ppc-purple transition-colors`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-20 left-0 right-0 bg-white/98 backdrop-blur-lg shadow-2xl z-50 transition-all duration-300 ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-3 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('inicio')}</Link>
          <Link to="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('quemSomos')}</Link>
          <Link to="/edicoes" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('premioPlumas')}</Link>
          <Link to="/revista" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('revista')}</Link>
          <Link to="/producao" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('producaoEventos')}</Link>
          <Link to="/galeria" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('galeria')}</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('blog')}</Link>
          <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)} className="block px-4 py-3 text-gray-800 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium">{translate('contato')}</Link>
          <Link 
            to="/contato" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="block px-4 py-3 bg-carnival-purple text-white rounded-lg hover:bg-carnival-purple/90 transition-all duration-200 font-semibold text-center mt-4"
          >
            {translate('entrarContato')}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
