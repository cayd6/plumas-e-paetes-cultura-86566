
import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Shield } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { translate } = useLanguage();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Padrão institucional: links sempre com cor do tema (escuro sobre fundo claro)
  // Check if link is active
  const isActive = (path: string) => location.pathname === path;
  
  const linkClass = (path: string) => {
    const base = 'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    return isActive(path)
      ? `${base} bg-carnival-purple text-white`
      : `${base} text-foreground hover:bg-gray-100`;
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-200 transition-all duration-500" role="navigation" aria-label="Navegação principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo e Nome */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png"
              alt="Instituto Plumas e Paetês Cultural"
              className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="font-bold text-sm sm:text-base lg:text-lg text-foreground transition-colors duration-300 group-hover:text-carnival-purple">
              Instituto Plumas & Paetês Cultural
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link 
              to="/sobre" 
              className={linkClass('/sobre')}
              aria-current={isActive('/sobre') ? 'page' : undefined}
            >
              {translate('quemSomos')}
            </Link>
            <Link 
              to="/edicoes" 
              className={`${linkClass('/edicoes')} relative group`}
              aria-current={isActive('/edicoes') ? 'page' : undefined}
            >
              {translate('premioPlumas')}
              <span className="absolute top-1 right-1 w-2 h-2 bg-carnival-gold rounded-full animate-pulse" aria-label="Novidade"></span>
            </Link>
            <Link 
              to="/revista" 
              className={linkClass('/revista')}
              aria-current={isActive('/revista') ? 'page' : undefined}
            >
              {translate('revista')}
            </Link>
            <Link 
              to="/producao" 
              className={linkClass('/producao')}
              aria-current={isActive('/producao') ? 'page' : undefined}
            >
              {translate('producaoEventos')}
            </Link>
            <Link 
              to="/galeria" 
              className={linkClass('/galeria')}
              aria-current={isActive('/galeria') ? 'page' : undefined}
            >
              {translate('galeria')}
            </Link>
            <Link 
              to="/blog" 
              className={linkClass('/blog')}
              aria-current={isActive('/blog') ? 'page' : undefined}
            >
              {translate('blog')}
            </Link>
            <Link 
              to="/contato" 
              className={linkClass('/contato')}
              aria-current={isActive('/contato') ? 'page' : undefined}
            >
              {translate('contato')}
            </Link>
            
            {user && isAdmin && (
              <>
                <Link 
                  to="/admin/galeria" 
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-carnival-gold text-white hover:bg-carnival-gold/90 transition-all duration-200 flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={signOut}
                  className="text-sm"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sair
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`text-foreground hover:text-carnival-purple transition-colors`}
              aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-14 left-0 right-0 bg-white shadow-2xl z-50 transition-all duration-300 border-t border-gray-200 ${
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
