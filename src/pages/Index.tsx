import Navigation from "@/components/Navigation";
import BackToTop from "@/components/BackToTop";
import Footer from "@/components/Footer";
import ConfettiFalling from "@/components/ConfettiFalling";
import SEO from "@/components/SEO";

// Home — ordem editorial:
// 1 hero · 2 impacto · 3 pilares · 4 prêmio · 5 revista+documentário ·
// 6 projetos · 7 parceiros · 8 vozes · 9 parceria/contato · 10 footer
import HeroSection from "@/components/home/HeroSection";
import ImpactNumbers from "@/components/home/ImpactNumbers";
import PillarCards from "@/components/home/PillarCards";
import AwardFeatureSection from "@/components/home/AwardFeatureSection";
import MagazineDocSection from "@/components/home/MagazineDocSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import PartnersSection from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO
        title="Instituto Plumas & Paetês Cultural — Memória viva do carnaval"
        description="Há mais de 20 anos registrando, premiando e formando os profissionais que fazem o carnaval brasileiro acontecer."
        keywords="instituto plumas & paetês cultural, prêmio plumas & paetês, carnaval carioca, memória do carnaval, economia criativa, cultura brasileira"
      />

      <Navigation />
      <BackToTop />
      <ConfettiFalling />

      <main>
        <HeroSection />
        <ImpactNumbers />
        <PillarCards />
        <AwardFeatureSection />
        <MagazineDocSection />
        <ProjectsSection />
        <PartnersSection />
        <TestimonialsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
