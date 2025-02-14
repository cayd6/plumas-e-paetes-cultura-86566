
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <img 
              src="/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png" 
              alt="Plumas e Paetês Cultural"
              className="h-12 w-auto"
            />
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#inicio" className="nav-link">Início</a>
            <a href="#projetos" className="nav-link">Projetos</a>
            <a href="#sobre" className="nav-link">Sobre</a>
            <a href="#noticias" className="nav-link">Notícias</a>
            <a href="#contato" className="nav-link">Contato</a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-ppc-purple transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 bg-white/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="#inicio" className="block px-3 py-2 nav-link">Início</a>
            <a href="#projetos" className="block px-3 py-2 nav-link">Projetos</a>
            <a href="#sobre" className="block px-3 py-2 nav-link">Sobre</a>
            <a href="#noticias" className="block px-3 py-2 nav-link">Notícias</a>
            <a href="#contato" className="block px-3 py-2 nav-link">Contato</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
