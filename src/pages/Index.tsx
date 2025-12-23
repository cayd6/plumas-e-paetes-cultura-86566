import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import ConfettiFalling from "@/components/ConfettiFalling";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import SEO from "@/components/SEO";

// Home page sections
import HeroSection from "@/components/home/HeroSection";
import PillarCards from "@/components/home/PillarCards";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import RecognitionsSection from "@/components/home/RecognitionsSection";
import VideoSection from "@/components/home/VideoSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import PartnersSection from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Instituto Plumas e Paetês Cultural | Transformando Vidas pela Cultura"
        description="Há 20 anos valorizando artistas e promovendo a cultura popular brasileira através do carnaval, oficinas culturais e projetos sociais no Rio de Janeiro."
        keywords="instituto cultural, carnaval carioca, plumas e paetês, cultura brasileira, economia criativa, arte popular, prêmio carnaval, Rio de Janeiro"
      />
      
      <Navigation />
      <LanguageControls />
      <BackToTop />
      <ConfettiFalling />
      
      <main>
        {/* Hero - H1 principal com benefício */}
        <HeroSection />
        
        {/* Faixa de Reconhecimentos */}
        <RecognitionsSection />
        
        {/* Pilares: Missão, Visão, Valores em cards */}
        <PillarCards />
        
        {/* Impacto em Números */}
        <ImpactNumbers />
        
        {/* Vídeo institucional com thumbnail */}
        <VideoSection />
        
        {/* Banner de destaques */}
        <HeroBanner />
        
        {/* Projetos - Cards padronizados */}
        <ProjectsSection />
        
        {/* Parceiros e Apoiadores */}
        <PartnersSection />
        
        {/* Depoimentos */}
        <TestimonialsSection />
        
        {/* CTA Final com públicos */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
