
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
            <Link to="/">
              <img 
                src="/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png" 
                alt="Plumas e Paetês Cultural"
                className="h-12 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/projetos" className="nav-link">Projetos</Link>
            <Link to="/sobre" className="nav-link">Sobre</Link>
            <Link to="/noticias" className="nav-link">Notícias</Link>
            <Link to="/revistas" className="nav-link">Revistas</Link>
            <Link to="/eventos" className="nav-link">Eventos</Link>
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
            <Link to="/" className="block px-3 py-2 nav-link">Início</Link>
            <Link to="/projetos" className="block px-3 py-2 nav-link">Projetos</Link>
            <Link to="/sobre" className="block px-3 py-2 nav-link">Sobre</Link>
            <Link to="/noticias" className="block px-3 py-2 nav-link">Notícias</Link>
            <Link to="/revistas" className="block px-3 py-2 nav-link">Revistas</Link>
            <Link to="/eventos" className="block px-3 py-2 nav-link">Eventos</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
