import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import AnniversaryBanner from "@/components/AnniversaryBanner";
import { ArrowRight, ChevronDown, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import danceWorkshop from "@/assets/dance-workshop.jpg";
import costumeWorkshop from "@/assets/costume-workshop.jpg";
import percussionClass from "@/assets/percussion-class.jpg";
import awardCeremony from "@/assets/award-ceremony-news.jpg";
import communityParade from "@/assets/community-parade.jpg";
import elderlyWorkshop from "@/assets/elderly-workshop.jpg";

const Index = () => {
  const { translate, language } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden pt-8">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 w-full h-full grid grid-cols-2">
          <div className="relative h-full animate-slide-up">
            <img
              src="/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png"
              alt="Plumas e Paetês Cultural Event"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative h-full animate-slide-up">
            <img
              src="/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png"
              alt="Plumas e Paetês Cultural Performance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="container mx-auto px-4 pt-20 relative z-20">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            {/* Anniversary banner positioned prominently */}
            <AnniversaryBanner />
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white mt-6">
              Instituto Plumas e Paetês Cultural
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              {translate("projetosDesc")}
            </p>
            <a
              href="#projetos"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-ppc-purple rounded-full hover:bg-ppc-purple/90 transition-colors"
            >
              {translate("projetos")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projetos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("projetos")}</h2>
            <p className="text-xl text-gray-600">{translate("projetosDesc")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* About Section */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{translate("nossaMissao")}</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {translate("missaoDesc")}
            </p>
            <a
              href="/sobre"
              className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-ppc-purple rounded-full hover:bg-ppc-purple/90 transition-colors"
            >
              {translate("saibaMais")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="noticias" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{translate("ultimasNoticias")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* Instagram Feed Section */}
      <section className="py-20 bg-gradient-to-br from-ppc-purple via-ppc-magenta to-ppc-orange">
        <div className="container mx-auto px-4">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">{translate("sigaNosInstagram")}</h2>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="#projetos" className="text-gray-400 hover:text-white transition-colors">{translate("projetos")}</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors">{translate("sobre")}</a></li>
                <li><a href="#noticias" className="text-gray-400 hover:text-white transition-colors">{translate("noticias")}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 text-center mb-4">
                {translate("transformandoVidas")}
              </p>
              <p className="text-gray-400 text-center mb-4">
                {translate("cnpj")}: 11.985.110/0001-76
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <p className="text-gray-400 text-center mt-2">
                Siga-nos nas redes sociais para ficar por dentro das novidades!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a 
                    href="mailto:contato@institutoplumasepaetescultural.com" 
                    className="hover:text-white transition-colors"
                  >
                    contato@institutoplumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <a 
                    href="https://wa.me/5521989392920" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +55 21 98939-2920
                  </a>
                </p>
              </div>
              <div className="mt-4">
                
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Instituto Plumas e Paetês Cultural. {translate("direitosReservados")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
