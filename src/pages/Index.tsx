import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ArrowRight, ChevronDown, Instagram, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { translate } = useLanguage();
  
  return (
    <div className="min-h-screen">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Plumas e Paetês Cultural
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
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="glass-card rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">Projeto Cultural {i}</h3>
                  <p className="text-gray-600">
                    Uma breve descrição do projeto e seus objetivos principais para a comunidade.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{translate("nossaMissao")}</h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              {translate("missaoDesc")}
            </p>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="noticias" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">{translate("ultimasNoticias")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <article
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">12 de Março, 2024</div>
                  <h3 className="text-xl font-semibold mb-2">Notícia Importante {i}</h3>
                  <p className="text-gray-600 mb-4">
                    Um breve resumo da notícia e seus impactos para nossa comunidade cultural.
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-ppc-purple hover:text-ppc-purple/80 transition-colors"
                  >
                    {translate("lerMais")} <ArrowRight className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{translate("faleConosco")}</h2>
            <p className="text-xl text-gray-600 mb-12">
              Estamos sempre abertos para novas parcerias e sugestões
            </p>
            <div className="glass-card rounded-2xl p-8">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
                  />
                </div>
                <textarea
                  placeholder="Mensagem"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-8 py-3 bg-ppc-purple text-white rounded-full hover:bg-ppc-purple/90 transition-colors"
                >
                  {translate("enviarMensagem")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img 
                src="/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png" 
                alt="Plumas e Paetês Cultural"
                className="h-16 w-auto mb-4"
              />
              <p className="text-gray-400">
                Transformando vidas através da arte e cultura
              </p>
              <div className="flex space-x-4 mt-4">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><a href="#inicio" className="text-gray-400 hover:text-white transition-colors">Início</a></li>
                <li><a href="#projetos" className="text-gray-400 hover:text-white transition-colors">Projetos</a></li>
                <li><a href="#sobre" className="text-gray-400 hover:text-white transition-colors">Sobre</a></li>
                <li><a href="#noticias" className="text-gray-400 hover:text-white transition-colors">Notícias</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <p className="text-gray-400">
                Email: contato@plumaspaetes.cultural.br<br />
                Tel: (11) 1234-5678
              </p>
              <div className="mt-4">
                <p className="text-gray-400">
                  Siga-nos nas redes sociais para ficar por dentro das novidades!
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Plumas e Paetês Cultural. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
