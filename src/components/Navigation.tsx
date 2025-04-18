
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
                alt="Plumas e Paetês Cultural"
                className="h-16 w-auto"
              />
              <div className={`hidden sm:block font-semibold text-xl ${linkClass} transition-colors duration-300`}>
                Instituto Plumas e Paetês
              </div>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('inicio')}</Link>
            <Link to="/edicoes" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('edicoes')}</Link>
            <Link to="/revistas" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('revistas')}</Link>
            <Link to="/eventos" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('eventos')}</Link>
            <Link to="/noticias" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('noticias')}</Link>
            <Link to="/sobre" className={`nav-link ${linkClass} transition-colors duration-300`}>{translate('sobre')}</Link>
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
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg z-50">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('inicio')}</Link>
            <Link to="/edicoes" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('edicoes')}</Link>
            <Link to="/revistas" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('revistas')}</Link>
            <Link to="/eventos" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('eventos')}</Link>
            <Link to="/noticias" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('noticias')}</Link>
            <Link to="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="block px-3 py-2 text-black hover:text-ppc-purple">{translate('sobre')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
