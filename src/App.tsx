import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import WhatsAppButton from "@/components/WhatsAppButton";

// Public pages — code split per route
const Index = lazy(() => import("./pages/Index"));
const EdicoesEnhanced = lazy(() => import("@/features/award").then(m => ({ default: m.AwardPage })));
const Revista = lazy(() => import("./pages/Revista"));
const Producao = lazy(() => import("./pages/Producao"));
const Blog = lazy(() => import("./pages/Blog"));
const Eventos = lazy(() => import("./pages/Eventos"));
const Noticias = lazy(() => import("./pages/Noticias"));
const Sobre = lazy(() => import("./pages/Sobre"));
const Galeria = lazy(() => import("./pages/Galeria"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages — separate chunk, only loaded for staff
const AdminGaleria = lazy(() => import("./pages/admin/Galeria"));
const AdminVideos = lazy(() => import("./pages/admin/Videos"));
const AdminBanners = lazy(() => import("./pages/admin/Banners"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminPremio = lazy(() => import("./pages/admin/Premio"));
const SobreAdmin = lazy(() => import("./pages/admin/SobreAdmin"));
const ProducaoAdmin = lazy(() => import("./pages/admin/ProducaoAdmin"));
const BlogAdmin = lazy(() => import("./pages/admin/BlogAdmin"));
const RevistaAdmin = lazy(() => import("./pages/admin/RevistaAdmin"));

const queryClient = new QueryClient();

const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div
      className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin"
      role="status"
      aria-label="Carregando"
    />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/projetos" element={<Index />} />
                <Route path="/premio" element={<EdicoesEnhanced />} />
                <Route path="/edicoes" element={<EdicoesEnhanced />} />
                <Route path="/revista" element={<Revista />} />
                <Route path="/producao" element={<Producao />} />
                <Route path="/galeria" element={<Galeria />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/eventos" element={<Eventos />} />
                <Route path="/noticias" element={<Noticias />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/admin" element={<AdminGaleria />} />
                <Route path="/admin/videos" element={<AdminVideos />} />
                <Route path="/admin/banners" element={<AdminBanners />} />
                <Route path="/admin/premio" element={<AdminPremio />} />
                <Route path="/admin/sobre" element={<SobreAdmin />} />
                <Route path="/admin/producao" element={<ProducaoAdmin />} />
                <Route path="/admin/blog" element={<BlogAdmin />} />
                <Route path="/admin/revista" element={<RevistaAdmin />} />
                <Route path="/admin/configuracoes" element={<AdminSettings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <WhatsAppButton />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
