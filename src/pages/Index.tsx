import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import AnniversaryBanner from "@/components/AnniversaryBanner";
import ConfettiFalling from "@/components/ConfettiFalling";
import MissionCards from "@/components/MissionCards";
import StatsCounter from "@/components/StatsCounter";
import PartnersCarousel from "@/components/PartnersCarousel";
import BackToTop from "@/components/BackToTop";
import { ArrowRight, ChevronDown, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import danceWorkshop from "@/assets/dance-workshop.jpg";
import costumeWorkshop from "@/assets/costume-workshop.jpg";
import percussionClass from "@/assets/percussion-class.jpg";
import awardCeremony from "@/assets/award-ceremony-news.jpg";
import communityParade from "@/assets/community-parade.jpg";
import elderlyWorkshop from "@/assets/elderly-workshop.jpg";

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
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <LanguageControls />
      <BackToTop />
      
      {/* Hero Section */}
      <section id="inicio" className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 z-10" />
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Continuous Falling Confetti */}
        <ConfettiFalling />
        
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-5xl mx-auto text-center">
            <div className="mb-6 animate-fade-in">
              <AnniversaryBanner />
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white animate-slide-up leading-tight">
              Celebrando a <span className="text-carnival-gold">Cultura do Carnaval</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/95 mb-8 animate-slide-up font-medium max-w-3xl mx-auto">
              Transformando vidas através da arte e economia criativa
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
              <a
                href="/sobre"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-carnival-purple rounded-full hover:bg-carnival-purple/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Conheça Nosso Trabalho
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/revista"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-carnival-purple bg-white rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Apoie Projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/80" />
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values Section */}
      <MissionCards />

      {/* Projects Section */}
      <section id="projetos" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{translate("projetos")}</h2>
            <p className="text-lg text-gray-600">{translate("projetosDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={danceWorkshop} 
                  alt="Oficina de Dança - Crianças e adultos aprendendo passos de samba"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Oficinas de Dança Afro-Brasileira</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Transformamos vidas através da dança! Nossas oficinas de samba, frevo e danças afro-brasileiras 
                  atendem crianças, jovens e adultos, promovendo inclusão social e resgate cultural.
                </p>
                <a
                  href="/projetos"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={costumeWorkshop} 
                  alt="Confecção de Fantasias - Artesãos criando fantasias coloridas"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Ateliê de Fantasias Criativas</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Da imaginação à realidade! Ensinamos técnicas tradicionais de confecção de fantasias de carnaval,
                  gerando renda e preservando a arte da costura criativa em nossa comunidade.
                </p>
                <a
                  href="/projetos"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={percussionClass} 
                  alt="Aulas de Percussão - Crianças tocando instrumentos brasileiros"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Escola de Percussão Popular</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  O ritmo que une corações! Nossa escola oferece aulas gratuitas de percussão, formando 
                  novos talentos e mantendo viva a tradição musical brasileira.
                </p>
                <a
                  href="/projetos"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section - Transformando Vidas */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-6xl mx-auto">
            <div className="order-2 lg:order-1 animate-fade-in">
              <div className="inline-block px-4 py-2 bg-carnival-purple/10 text-carnival-purple rounded-full text-sm font-semibold mb-3">
                NOSSO IMPACTO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Transformando Vidas, <span className="text-carnival-magenta">Construindo Futuros</span>
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-4">
                Há mais de 15 anos, o Instituto Plumas e Paetês Cultural atua na valorização da cultura popular brasileira, 
                com foco especial no carnaval e na economia criativa.
              </p>
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                Nossa atuação vai além da premiação: promovemos workshops, oficinas, publicações especializadas e eventos 
                que fortalecem a cadeia produtiva do carnaval, gerando oportunidades de trabalho e renda.
              </p>
              <a
                href="/sobre"
                className="inline-flex items-center px-8 py-4 text-lg font-bold text-white bg-carnival-purple rounded-full hover:bg-carnival-purple/90 transition-all duration-300 hover:scale-105"
              >
                Conheça Nossa História
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
            <div className="order-1 lg:order-2 animate-fade-in">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={awardCeremony}
                  alt="Cerimônia de premiação Plumas e Paetês - Celebrando os artífices do carnaval"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Counter Section */}
      <StatsCounter />

      {/* Strategic Partnerships */}
      <PartnersCarousel />

      {/* News Section */}
      <section id="noticias" className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{translate("ultimasNoticias")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={awardCeremony} 
                  alt="Cerimônia de Premiação - Instituto recebendo reconhecimento cultural"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-ppc-purple font-medium mb-2">15 de Janeiro, 2025</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Instituto recebe Prêmio de Cultura Popular</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Nosso trabalho foi reconhecido pela Secretaria de Cultura com o prêmio "Guardiões da Tradição" 
                  por nossa dedicação em preservar e difundir a cultura afro-brasileira.
                </p>
                <a
                  href="/noticias"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={communityParade} 
                  alt="Desfile Comunitário - Participantes em fantasias coloridas"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-ppc-purple font-medium mb-2">08 de Janeiro, 2025</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Grande Desfile Comunitário reúne 500 pessoas</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  O tradicional Desfile de Reis mobilizou toda a comunidade com apresentações de dança, 
                  música e as mais belas fantasias criadas em nossos ateliês culturais.
                </p>
                <a
                  href="/noticias"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>

            <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={elderlyWorkshop} 
                  alt="Oficina para Idosos - Compartilhamento de saberes tradicionais"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="text-sm text-ppc-purple font-medium mb-2">20 de Dezembro, 2024</div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">Projeto "Mestres da Tradição" forma nova turma</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Idosos da comunidade compartilham seus conhecimentos tradicionais em oficinas intergeracionais, 
                  fortalecendo laços e preservando nossa memória cultural.
                </p>
                <a
                  href="/noticias"
                  className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors font-medium"
                >
                  {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 carnival-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Faça Parte da Transformação Cultural
            </h2>
            <p className="text-lg md:text-xl mb-6 text-white/95">
              Junte-se a nós na missão de valorizar a cultura popular brasileira
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-carnival-purple bg-white rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Entre em Contato
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href="/sobre"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-105 border-2 border-white"
              >
                Trabalhe Conosco
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-12 md:py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{translate("sigaNosInstagram")}</h2>
            <p className="text-xl text-white/90 mb-6">
              Acompanhe nossos eventos, projetos e bastidores
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <p className="text-3xl font-bold">19.6k</p>
                <p className="text-white/80">{translate("seguidores")}</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-3xl font-bold">878</p>
                <p className="text-white/80">{translate("publicacoes")}</p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/plumasepaetescultural/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ppc-magenta rounded-full hover:bg-white/90 transition-colors font-semibold text-lg"
            >
              <Instagram size={24} />
              {translate("seguirInstagram")}
            </a>
          </div>
          
          {/* Instagram Grid Preview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {[
              "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
              "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
              "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
              "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
              "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png",
              "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png",
            ].map((img, index) => (
              <a
                key={index}
                href="https://www.instagram.com/plumasepaetescultural/"
                target="_blank"
                rel="noopener noreferrer"
                className="aspect-square overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Instagram post ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Column 1: About */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-carnival-gold">Plumas e Paetês</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Instituto cultural dedicado à valorização do carnaval brasileiro e dos artífices que mantêm viva nossa maior manifestação popular.
              </p>
              <p className="text-gray-400 text-sm">
                CNPJ: 11.985.110/0001-76
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-3">
                <li><a href="/sobre" className="text-gray-400 hover:text-carnival-gold transition-colors">Quem Somos</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-carnival-gold transition-colors">Prêmio Plumas & Paetês</a></li>
                <li><a href="/revista" className="text-gray-400 hover:text-carnival-gold transition-colors">Revista Digital</a></li>
                <li><a href="/galeria" className="text-gray-400 hover:text-carnival-gold transition-colors">Galeria</a></li>
                <li><a href="/blog" className="text-gray-400 hover:text-carnival-gold transition-colors">Blog</a></li>
                <li><a href="/contato" className="text-gray-400 hover:text-carnival-gold transition-colors">Contato</a></li>
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
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

            {/* Column 4: Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
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
              <p className="text-gray-400 text-sm mb-4">
                Acompanhe nossos eventos e bastidores nas redes sociais
              </p>
              <div className="text-sm text-gray-500">
                <p>19.6k+ seguidores</p>
                <p>878+ publicações</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                &copy; 2025 Instituto Plumas e Paetês Cultural. Todos os direitos reservados.
              </p>
              <div className="flex gap-6 text-sm text-gray-400">
                <a href="#" className="hover:text-carnival-gold transition-colors">Política de Privacidade</a>
                <a href="#" className="hover:text-carnival-gold transition-colors">Termos de Uso</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
