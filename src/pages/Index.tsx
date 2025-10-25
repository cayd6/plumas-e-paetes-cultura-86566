import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import AnniversaryButton from "@/components/AnniversaryButton";
import ConfettiFalling from "@/components/ConfettiFalling";
import MissionCards from "@/components/MissionCards";
import BackToTop from "@/components/BackToTop";
import { ArrowRight, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
const Index = () => {
  const { translate } = useLanguage();
  const [headerBg, setHeaderBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHeaderBg(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const projects = [
    {
      title: translate('project1Title'),
      description: translate('project1Desc'),
    },
    {
      title: translate('project2Title'),
      description: translate('project2Desc'),
    },
    {
      title: translate('project3Title'),
      description: translate('project3Desc'),
    },
    {
      title: translate('project4Title'),
      description: translate('project4Desc'),
    },
    {
      title: translate('project5Title'),
      description: translate('project5Desc'),
    },
    {
      title: translate('project6Title'),
      description: translate('project6Desc'),
    },
    {
      title: translate('project7Title'),
      description: translate('project7Desc'),
    },
    {
      title: translate('project8Title'),
      description: translate('project8Desc'),
    },
    {
      title: translate('project9Title'),
      description: translate('project9Desc'),
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <LanguageControls />
      <BackToTop />
      
      {/* Initial confetti on page load */}
      <ConfettiFalling />
      
      {/* Hero Section - Clean and Modern */}
      <section id="inicio" className="relative min-h-screen lg:min-h-[110vh] xl:min-h-[120vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('/lovable-uploads/hero-background.jpg?v=${Date.now()}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Anniversary Button */}
            <div className="mb-8 flex justify-center animate-fade-in">
              <AnniversaryButton />
            </div>
            
            {/* Hero Text - Clean and Minimal */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white animate-fade-in leading-tight">
              Instituto Plumas & Paetês Cultural
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-10 animate-fade-in font-light max-w-3xl mx-auto">
              {translate('heroSubtitulo')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values Section */}
      <MissionCards />

      {/* Quem Somos Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">{translate('quemSomos')}</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                {translate('quemSomosTexto1')}
              </p>
              <p>
                {translate('quemSomosTexto2')}
              </p>
              <p>
                {translate('quemSomosTexto3')}
              </p>
              <p>
                {translate('quemSomosTexto4')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects, Products and Events Section */}
      <section id="projetos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{translate('projetosProdutosEventos')}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {translate('projetosProdutosEventosDesc')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold mb-4 text-carnival-purple">{project.title}</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 carnival-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {translate('ctaTitle')}
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/95">
              {translate('ctaSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-carnival-purple bg-white rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                {translate('entrarContato')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Clean and Minimal */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Column 1: About */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-carnival-gold">Instituto Plumas & Paetês Cultural</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                {translate('footerAbout')}
              </p>
              <p className="text-gray-400 text-sm">
                {translate('cnpj')}: 11.985.110/0001-76
              </p>
            </div>

            {/* Column 2: Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate('faleConosco')}</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start">
                  <Mail size={18} className="mr-2 mt-1 flex-shrink-0" />
                  <a 
                    href="mailto:contato@institutoplumasepaetescultural.com" 
                    className="hover:text-carnival-gold transition-colors break-all"
                  >
                    contato@institutoplumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2 flex-shrink-0" />
                  <a 
                    href="https://wa.me/5521989392920" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-carnival-gold transition-colors"
                  >
                    +55 21 98939-2920
                  </a>
                </p>
              </div>
            </div>

            {/* Column 3: Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate('redesSociais')}</h3>
              <div className="flex gap-4 mb-6">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-carnival-magenta transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-full hover:bg-carnival-purple transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                {translate('followEventsCaption')}
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Instituto Plumas e Paetês Cultural. {translate('direitosReservados')}
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-carnival-gold transition-colors">{translate('privacyPolicy')}</a>
                <a href="#" className="hover:text-carnival-gold transition-colors">{translate('termsOfUse')}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
