import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AdminGate } from "@/components/AdminGate";
import WhatsAppButton from "@/components/WhatsAppButton";

// Public pages — code split per route
const Index = lazy(() => import("./pages/Index"));
const EdicoesEnhanced = lazy(() => import("@/features/award").then(m => ({ default: m.AwardPage })));
const Revista = lazy(() => import("@/features/magazine").then(m => ({ default: m.MagazinePage })));
const Producao = lazy(() => import("@/features/production").then(m => ({ default: m.ProducaoPage })));
const Blog = lazy(() => import("@/features/blog").then(m => ({ default: m.BlogPage })));
const Eventos = lazy(() => import("@/features/events").then(m => ({ default: m.EventosPage })));
const Noticias = lazy(() => import("@/features/news").then(m => ({ default: m.NoticiasPage })));
const Sobre = lazy(() => import("@/features/about").then(m => ({ default: m.SobrePage })));
const Galeria = lazy(() => import("@/features/gallery").then(m => ({ default: m.GaleriaPage })));
const Contato = lazy(() => import("@/features/contact").then(m => ({ default: m.ContatoPage })));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin pages — separate chunk, only loaded for staff
const AdminGaleria = lazy(() => import("@/features/gallery").then(m => ({ default: m.GaleriaAdminPage })));
const AdminVideos = lazy(() => import("@/features/gallery").then(m => ({ default: m.VideosAdminPage })));
const AdminBanners = lazy(() => import("@/features/banners").then(m => ({ default: m.BannersAdminPage })));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));
const AdminPremio = lazy(() => import("@/features/award").then(m => ({ default: m.AwardAdminPage })));
const SobreAdmin = lazy(() => import("@/features/about").then(m => ({ default: m.SobreAdminPage })));
const ProducaoAdmin = lazy(() => import("@/features/production").then(m => ({ default: m.ProducaoAdminPage })));
const BlogAdmin = lazy(() => import("@/features/blog").then(m => ({ default: m.BlogAdminPage })));
const RevistaAdmin = lazy(() => import("@/features/magazine").then(m => ({ default: m.MagazineAdminPage })));

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
                <Route path="/admin" element={<AdminGate><AdminGaleria /></AdminGate>} />
                <Route path="/admin/videos" element={<AdminGate><AdminVideos /></AdminGate>} />
                <Route path="/admin/banners" element={<AdminGate><AdminBanners /></AdminGate>} />
                <Route path="/admin/premio" element={<AdminGate><AdminPremio /></AdminGate>} />
                <Route path="/admin/sobre" element={<AdminGate><SobreAdmin /></AdminGate>} />
                <Route path="/admin/producao" element={<AdminGate><ProducaoAdmin /></AdminGate>} />
                <Route path="/admin/blog" element={<AdminGate><BlogAdmin /></AdminGate>} />
                <Route path="/admin/revista" element={<AdminGate><RevistaAdmin /></AdminGate>} />
                <Route path="/admin/configuracoes" element={<AdminGate><AdminSettings /></AdminGate>} />

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
