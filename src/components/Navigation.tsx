
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

  // Padrão institucional: links sempre com cor do tema (escuro sobre fundo claro)
  const linkClass = 'text-foreground';

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png"
              alt="Instituto Plumas e Paetês Cultural"
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <div className="hidden lg:block">
              <div className={`font-bold text-lg leading-tight ${linkClass} transition-colors duration-300`}>
                Instituto Plumas & Paetês
              </div>
              <div className="text-xs font-medium text-muted-foreground transition-colors duration-300">
                Cultural
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('inicio')}
            </Link>
            <Link 
              to="/sobre" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('quemSomos')}
            </Link>
            <Link 
              to="/edicoes" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200 relative group`}
            >
              {translate('premioPlumas')}
              <span className="absolute top-1 right-1 w-2 h-2 bg-carnival-gold rounded-full animate-pulse"></span>
            </Link>
            <Link 
              to="/revista" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('revista')}
            </Link>
            <Link 
              to="/producao" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('producaoEventos')}
            </Link>
            <Link 
              to="/galeria" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('galeria')}
            </Link>
            <Link 
              to="/blog" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('blog')}
            </Link>
            <Link 
              to="/contato" 
              className={`px-4 py-2.5 rounded-lg text-base font-medium ${linkClass} hover:bg-gray-100 transition-all duration-200`}
            >
              {translate('contato')}
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-foreground hover:text-carnival-purple transition-colors`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-20 left-0 right-0 bg-white shadow-2xl z-50 transition-all duration-300 border-t border-gray-200 ${
        isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}>
        <div className="px-4 pt-4 pb-6 space-y-2 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('inicio')}</Link>
          <Link to="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('quemSomos')}</Link>
          <Link to="/edicoes" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('premioPlumas')}</Link>
          <Link to="/revista" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('revista')}</Link>
          <Link to="/producao" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('producaoEventos')}</Link>
          <Link to="/galeria" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('galeria')}</Link>
          <Link to="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('blog')}</Link>
          <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)} className="block px-5 py-3.5 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg transition-all duration-200 font-medium text-base">{translate('contato')}</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
