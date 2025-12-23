
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import EdicoesEnhanced from "./pages/EdicoesEnhanced";
import Revista from "./pages/Revista";
import Producao from "./pages/Producao";
import Blog from "./pages/Blog";
import Eventos from "./pages/Eventos";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import Galeria from "./pages/Galeria";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import AdminGaleria from "./pages/admin/Galeria";
import AdminVideos from "./pages/admin/Videos";
import AdminBanners from "./pages/admin/Banners";
import AdminSettings from "./pages/admin/Settings";
import AdminPremio from "./pages/admin/Premio";
import SobreAdmin from "./pages/admin/SobreAdmin";
import ProducaoAdmin from "./pages/admin/ProducaoAdmin";
import BlogAdmin from "./pages/admin/BlogAdmin";
import RevistaAdmin from "./pages/admin/RevistaAdmin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/projetos" element={<Index />} /> {/* Redirects to home projects section */}
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
            <WhatsAppButton />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
