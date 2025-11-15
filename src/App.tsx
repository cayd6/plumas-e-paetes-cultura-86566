
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
import EdicaoDetalhe from "./pages/EdicaoDetalhe";
import Revistas from "./pages/revistas/Revistas";
import RevistaDetalhe from "./pages/revistas/RevistaDetalhe";
import Revista from "./pages/Revista";
import Producao from "./pages/Producao";
import Blog from "./pages/Blog";
import Eventos from "./pages/Eventos";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import Galeria from "./pages/Galeria";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminGaleria from "./pages/admin/Galeria";

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
              <Route path="/edicoes" element={<EdicoesEnhanced />} />
              <Route path="/edicoes/:id" element={<EdicaoDetalhe />} />
              <Route path="/revista" element={<Revista />} />
              <Route path="/revistas" element={<Revistas />} />
              <Route path="/revista/:id" element={<RevistaDetalhe />} />
              <Route path="/producao" element={<Producao />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/noticias" element={<Noticias />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/galeria" element={
                <ProtectedRoute>
                  <AdminGaleria />
                </ProtectedRoute>
              } />
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
