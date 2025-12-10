import { NavLink, useLocation } from 'react-router-dom';
import { Images, Video, Layout, Settings, Home, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { to: '/admin', icon: Images, label: 'Fotos', exact: true },
  { to: '/admin/videos', icon: Video, label: 'Vídeos' },
  { to: '/admin/banners', icon: Layout, label: 'Banners' },
  { to: '/admin/configuracoes', icon: Settings, label: 'Configurações' },
];

export function AdminSidebar() {
  const location = useLocation();
  const { signOut } = useAuth();

  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 min-h-screen bg-card border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Painel Admin</h2>
        <p className="text-sm text-muted-foreground">Instituto Plumas e Paetês</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.exact}
            className={({ isActive: linkActive }) => cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              (item.exact ? isActive(item.to, true) : linkActive)
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
          Voltar ao Site
        </NavLink>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={signOut}
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Button>
      </div>
    </aside>
  );
}
