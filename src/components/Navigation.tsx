import { useState, useEffect } from 'react';
import { Menu, X, LogOut, Shield, Globe, Minus, Plus, ChevronDown, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const { translate, language, setLanguage } = useLanguage();
  const location = useLocation();
  const { user, isAdmin, signOut } = useAuth();

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  const isActive = (path: string) => location.pathname === path;

  const linkClass = (path: string) => {
    const base = 'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200';
    return isActive(path)
      ? `${base} bg-carnival-purple text-white`
      : `${base} text-foreground hover:bg-gray-100`;
  };

  const toggleLanguage = () => setLanguage(language === 'pt' ? 'en' : 'pt');
  const decFont = () => setFontSize((s) => Math.max(12, s - 2));
  const incFont = () => setFontSize((s) => Math.min(24, s + 2));

  // Itens agrupados: dropdowns para reduzir o número de links na linha
  interface NavGroupItem {
    to: string;
    labelKey: string;
    badge?: boolean;
  }
  interface NavGroup {
    key: string;
    labelKey: string;
    href?: string;
    badge?: boolean;
    children?: NavGroupItem[];
  }

  const navGroups: NavGroup[] = [
    {
      key: 'institucional',
      labelKey: 'institucional',
      children: [
        { to: '/sobre', labelKey: 'quemSomos' },
        { to: '/premio', labelKey: 'premioPlumas', badge: true },
      ],
    },
    {
      key: 'midia',
      labelKey: 'midiaAcervo',
      children: [
        { to: '/revista', labelKey: 'revista' },
        { to: '/galeria', labelKey: 'galeria' },
        { to: '/blog', labelKey: 'blog' },
      ],
    },
    { key: 'producao', labelKey: 'producaoEventos', href: '/producao' },
    { key: 'contato', labelKey: 'contato', href: '/contato' },
  ];

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <nav
      className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200"
      role="navigation"
      aria-label={language === 'pt' ? 'Navegação principal' : 'Main navigation'}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <Link to="/" className="flex items-center space-x-3 group min-w-0 flex-shrink-0 max-w-[70vw]">
            <img
              src="/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png"
              alt="Instituto Plumas &amp; Paetês Cultural"
              className="h-9 sm:h-10 w-auto transition-transform duration-300 group-hover:scale-105"
            />
            <span className="inline font-serif font-semibold text-xs sm:text-sm lg:text-base text-foreground whitespace-nowrap truncate group-hover:text-carnival-purple transition-colors">
              Instituto Plumas &amp; Paetês Cultural
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center space-x-1">
            {navGroups.map((group) =>
              group.children ? (
                <div
                  key={group.key}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(group.key)}
                  onMouseLeave={() => setOpenGroup(null)}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-foreground hover:bg-gray-100"
                    aria-haspopup="true"
                    aria-expanded={openGroup === group.key}
                  >
                    {translate(group.labelKey)}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${openGroup === group.key ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`absolute left-0 top-full pt-1 w-64 transition-all duration-200 origin-top ${
                      openGroup === group.key
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-1 pointer-events-none'
                    }`}
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                      {group.children.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className={`flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive(item.to)
                              ? 'bg-carnival-purple text-white'
                              : 'text-foreground hover:bg-gray-50 hover:text-carnival-purple'
                          }`}
                          aria-current={isActive(item.to) ? 'page' : undefined}
                        >
                          {translate(item.labelKey)}
                          {item.badge && (
                            <span className="w-2 h-2 bg-carnival-gold rounded-full animate-pulse" aria-label={language === 'pt' ? 'Novidade' : 'New'} />
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={group.key}
                  to={group.href || '/'}
                  className={`${linkClass(group.href || '/')} ${group.badge ? 'relative' : ''}`}
                  aria-current={isActive(group.href || '/') ? 'page' : undefined}
                >
                  {translate(group.labelKey)}
                </Link>
              )
            )}

            {/* Controles utilitários: idioma + zoom */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={translate('trocarIdioma')}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold text-foreground hover:bg-gray-100 transition-colors"
              >
                <Globe size={14} />
                {language.toUpperCase()}
              </button>
              <button
                type="button"
                onClick={decFont}
                aria-label={translate('diminuirFonte')}
                className="w-7 h-7 flex items-center justify-center rounded-md text-foreground hover:bg-gray-100"
              >
                <Minus size={14} />
              </button>
              <button
                type="button"
                onClick={incFont}
                aria-label={translate('aumentarFonte')}
                className="w-7 h-7 flex items-center justify-center rounded-md text-foreground hover:bg-gray-100"
              >
                <Plus size={14} />
              </button>
            </div>

            {user && isAdmin && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200">
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-carnival-gold text-white hover:bg-carnival-gold/90 transition-all flex items-center gap-1"
                >
                  <Shield className="h-4 w-4" />
                  Admin
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut} className="text-sm">
                  <LogOut className="h-4 w-4 mr-1" />
                  {language === 'pt' ? 'Sair' : 'Sign out'}
                </Button>
              </div>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1 lg:hidden">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={translate('trocarIdioma')}
              className="flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-semibold text-foreground hover:bg-gray-100"
            >
              <Globe size={14} />
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? (language === 'pt' ? 'Fechar menu' : 'Close menu') : (language === 'pt' ? 'Abrir menu' : 'Open menu')}
              aria-expanded={isMobileMenuOpen}
              className="p-2 text-foreground hover:text-carnival-purple transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed top-14 left-0 right-0 bg-white shadow-2xl border-t border-gray-200 transition-all duration-300 ${
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="px-4 pt-4 pb-6 space-y-1.5 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center gap-2 px-5 py-3 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg font-medium"
          >
            <Home className="h-4 w-4" />
            {translate('inicio')}
          </Link>
          {navGroups.map((group) =>
            group.children ? (
              <div key={group.key} className="space-y-1">
                <p className="px-5 pt-2 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {translate(group.labelKey)}
                </p>
                {group.children.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-5 py-3 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg font-medium"
                  >
                    {translate(item.labelKey)}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={group.key}
                to={group.href || '/'}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-5 py-3 text-gray-900 bg-gray-50 hover:bg-carnival-purple hover:text-white rounded-lg font-medium"
              >
                {translate(group.labelKey)}
              </Link>
            )
          )}

          <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-gray-200">
            <span className="text-xs text-muted-foreground mr-auto">
              {language === 'pt' ? 'Tamanho do texto' : 'Text size'}
            </span>
            <button
              type="button"
              onClick={decFont}
              aria-label={translate('diminuirFonte')}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
            >
              <Minus size={16} />
            </button>
            <button
              type="button"
              onClick={incFont}
              aria-label={translate('aumentarFonte')}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-200 hover:bg-gray-100"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
