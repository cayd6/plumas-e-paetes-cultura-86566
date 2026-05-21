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
const Revista = lazy(() => import("@/features/magazine").then(m => ({ default: m.MagazinePage })));
const Producao = lazy(() => import("@/features/production").then(m => ({ default: m.ProducaoPage })));
const Blog = lazy(() => import("@/features/blog").then(m => ({ default: m.BlogPage })));
const Eventos = lazy(() => import("@/features/events").then(m => ({ default: m.EventosPage })));
const Noticias = lazy(() => import("@/features/news").then(m => ({ default: m.NoticiasPage })));
const Sobre = lazy(() => import("@/features/about").then(m => ({ default: m.SobrePage })));
const Galeria = lazy(() => import("@/features/gallery").then(m => ({ default: m.GaleriaPage })));
const Contato = lazy(() => import("@/features/contact").then(m => ({ default: m.ContatoPage })));
const NotFound = lazy(() => import("./pages/NotFound"));

// Single admin route — internal tabs, no sub-URLs
const AdminPanel = lazy(() => import("./pages/admin/AdminPanel"));

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
                <Route path="/admin" element={<AdminPanel />} />

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
