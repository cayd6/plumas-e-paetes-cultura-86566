import { lazy, Suspense, useState } from 'react';
import { Images, Video, Layout, Settings, Home, LogOut, Trophy, Users, Briefcase, FileText, BookOpen, Menu, X, Archive } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { AdminGate } from '@/components/AdminGate';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminGaleria = lazy(() => import('@/features/gallery').then(m => ({ default: m.GaleriaAdminPage })));
const AdminVideos = lazy(() => import('@/features/gallery').then(m => ({ default: m.VideosAdminPage })));
const AdminBanners = lazy(() => import('@/features/banners').then(m => ({ default: m.BannersAdminPage })));
const AdminPremio = lazy(() => import('@/features/award').then(m => ({ default: m.AwardAdminPage })));
const SobreAdmin = lazy(() => import('@/features/about').then(m => ({ default: m.SobreAdminPage })));
const ProducaoAdmin = lazy(() => import('@/features/production').then(m => ({ default: m.ProducaoAdminPage })));
const BlogAdmin = lazy(() => import('@/features/blog').then(m => ({ default: m.BlogAdminPage })));
const RevistaAdmin = lazy(() => import('@/features/magazine').then(m => ({ default: m.MagazineAdminPage })));
const AdminSettings = lazy(() => import('./Settings'));
const MemoryAssetsAdmin = lazy(() => import('./MemoryAssetsAdmin'));

type SectionKey =
  | 'fotos' | 'videos' | 'banners' | 'premio' | 'sobre'
  | 'producao' | 'blog' | 'revista' | 'memoria' | 'configuracoes';

const sections: { key: SectionKey; label: string; icon: typeof Images; Component: React.LazyExoticComponent<React.ComponentType> }[] = [
  { key: 'fotos', label: 'Fotos', icon: Images, Component: AdminGaleria },
  { key: 'videos', label: 'Vídeos', icon: Video, Component: AdminVideos },
  { key: 'banners', label: 'Banners', icon: Layout, Component: AdminBanners },
  { key: 'premio', label: 'Prêmio Plumas', icon: Trophy, Component: AdminPremio },
  { key: 'sobre', label: 'Quem Somos', icon: Users, Component: SobreAdmin },
  { key: 'producao', label: 'Produção', icon: Briefcase, Component: ProducaoAdmin },
  { key: 'blog', label: 'Blog', icon: FileText, Component: BlogAdmin },
  { key: 'revista', label: 'Revista', icon: BookOpen, Component: RevistaAdmin },
  { key: 'memoria', label: 'Memória & Imprensa', icon: Archive, Component: MemoryAssetsAdmin },
  { key: 'configuracoes', label: 'Configurações', icon: Settings, Component: AdminSettings },
];

function PanelLoader() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" role="status" aria-label="Carregando" />
    </div>
  );
}

function AdminPanelInner() {
  const [active, setActive] = useState<SectionKey>('fotos');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { signOut } = useAuth();
  const current = sections.find(s => s.key === active)!;
  const ActiveComponent = current.Component;

  return (
    <div className="min-h-screen bg-background flex">
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-card rounded-md shadow-lg"
        onClick={() => setSidebarOpen(o => !o)}
        aria-label="Alternar menu"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-40 w-64 min-h-screen bg-card border-r flex flex-col transform transition-transform duration-200',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Painel Admin</h2>
          <p className="text-sm text-muted-foreground">Instituto Plumas &amp; Paetês</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sections.map(item => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => { setActive(item.key); setSidebarOpen(false); }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors text-left',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2">
          <NavLink to="/" className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            Voltar ao Site
          </NavLink>
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground" onClick={signOut}>
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="border-b bg-card px-6 py-4 lg:px-8">
          <h1 className="text-2xl font-bold lg:ml-0 ml-10">{current.label}</h1>
        </header>
        <div className="p-6 lg:p-8">
          <Suspense fallback={<PanelLoader />}>
            <ActiveComponent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default function AdminPanel() {
  return (
    <AdminGate>
      <AdminPanelInner />
    </AdminGate>
  );
}
