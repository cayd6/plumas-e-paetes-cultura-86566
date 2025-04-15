
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Edicoes from "./pages/Edicoes";
import EdicaoDetalhe from "./pages/EdicaoDetalhe";
import Revistas from "./pages/Revistas";
import RevistaDetalhe from "./pages/RevistaDetalhe";
import Eventos from "./pages/Eventos";
import Noticias from "./pages/Noticias";
import Sobre from "./pages/Sobre";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/edicoes" element={<Edicoes />} />
            <Route path="/edicoes/:id" element={<EdicaoDetalhe />} />
            <Route path="/revistas" element={<Revistas />} />
            <Route path="/revista/:id" element={<RevistaDetalhe />} />
            <Route path="/eventos" element={<Eventos />} />
            <Route path="/noticias" element={<Noticias />} />
            <Route path="/sobre" element={<Sobre />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <WhatsAppButton />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
