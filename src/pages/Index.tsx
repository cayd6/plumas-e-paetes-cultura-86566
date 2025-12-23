import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import ConfettiFalling from "@/components/ConfettiFalling";
import MissionCards from "@/components/MissionCards";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import SEO from "@/components/SEO";

// Home page sections
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import VideoSection from "@/components/home/VideoSection";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Instituto Plumas e Paetês Cultural | Transformando Vidas pela Cultura"
        description="Há 20 anos valorizando artistas e promovendo a cultura popular brasileira através do carnaval, oficinas culturais e projetos sociais."
        keywords="instituto cultural, carnaval carioca, plumas e paetês, cultura brasileira, economia criativa, arte popular, prêmio carnaval, Rio de Janeiro"
      />
      
      <Navigation />
      <LanguageControls />
      <BackToTop />
      <ConfettiFalling />
      
      <main>
        {/* Hero - H1 principal */}
        <HeroSection />
        
        {/* Missão, Visão, Valores */}
        <MissionCards />
        
        {/* Impacto em Números */}
        <ImpactNumbers />
        
        {/* Banner de destaques */}
        <HeroBanner />
        
        {/* Vídeo institucional */}
        <VideoSection />
        
        {/* Quem Somos - Accordion */}
        <AboutSection />
        
        {/* Projetos - Tabs organizados */}
        <ProjectsSection />
        
        {/* Depoimentos */}
        <TestimonialsSection />
        
        {/* CTA Final */}
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
