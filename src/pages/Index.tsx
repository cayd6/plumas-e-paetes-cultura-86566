import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import AnniversaryButton from "@/components/AnniversaryButton";
import ConfettiFalling from "@/components/ConfettiFalling";
import MissionCards from "@/components/MissionCards";
import BackToTop from "@/components/BackToTop";
import { ArrowRight, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
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
      title: "Prêmio Plumas & Paetês Cultural",
      description: "Criado em 2005, celebra os profissionais que atuam nos bastidores da produção, criação e cobertura dos desfiles das escolas de samba do Rio de Janeiro. Mais de 1000 troféus distribuídos a mais de 1400 premiados em 51 categorias profissionais.",
    },
    {
      title: "Oficinas de Capacitação e Gestão Artísticas",
      description: "Desde 2008 o Instituto ministra oficinas de formação e gestão artística, com atuação nas cidades do Rio de Janeiro e Brasília.",
    },
    {
      title: "Revista Plumas e Paetês Cultural",
      description: "Publicação anual lançada em 2010 que exalta os artistas e a história do carnaval carioca. De circulação gratuita, com tiragem anual de 5000 exemplares.",
    },
    {
      title: "Produção de Espetáculos Musicais",
      description: "A partir de 2012, produz espetáculos teatrais/musicais retratando a vida e obra de homenageados como Elza Soares, Chiquinha Gonzaga, Rainhas do Rádio e Donga.",
    },
    {
      title: "Coroa do Rei Momo",
      description: "Desde 2014 é responsável pela confecção da coroa do Rei Momo e curadoria dos acessórios temáticos da corte nas cidades do Rio de Janeiro, Niterói, Maricá e Cruz Alta (RS).",
    },
    {
      title: "Júri de Carnaval",
      description: "Desde 2015 coordena o corpo de jurados dos desfiles das escolas de samba dos grupos Especial e Acesso de Vitória (ES), e das séries A, B, C e D do Rio de Janeiro.",
    },
    {
      title: "Busto do Mestre Monarco",
      description: "Em 2016, instalou o busto do compositor Monarco na quadra da Portela, um trabalho do artista Vinicius Vaitsmann.",
    },
    {
      title: "Livro '90 Anos de Braços Abertos para os Grandes Eventos'",
      description: "Publicação de 2021 que celebrou os 90 anos da estátua do Cristo Redentor, tendo o Instituto como proponente do projeto.",
    },
    {
      title: "Projetos de Lei",
      description: "Atuou junto ao deputado estadual Noel de Carvalho e ao vereador Marcio Ribeiro para elaboração das leis 9.950/2023 (estadual) e 8167/2023 (municipal), estabelecendo o dia 28 de setembro como o dia do Profissional da Economia Criativa de Carnaval.",
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
      <section id="inicio" className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700">
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50" />
        
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
              Transformando a sociedade brasileira por meio da economia criativa
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
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Quem Somos</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
              <p>
                Criado em 2005 com o intuito de reconhecer e valorizar os artistas anônimos do carnaval carioca, amplificando as suas vozes e intermediando a ascensão de suas carreiras profissionais, o Instituto Plumas & Paetês Cultural logo se tornou muito maior do que a premiação carnavalesca que lhe deu origem.
              </p>
              <p>
                Mantendo a sua premissa inicial, de iluminar os bastidores da economia criativa, estimulando a renda de seus fazedores e democratizando o acesso à arte por eles produzida, o Plumas & Paetês percebeu que podia mais e decidiu ampliar o seu alcance, produzindo uma série de eventos e projetos culturais em diversas regiões do país.
              </p>
              <p>
                Incansável em sua missão de transformar a sociedade brasileira por meio da cultura, o Instituto desenvolveu, ao longo das duas últimas décadas, uma série de ações, dentre as quais se destacam a coordenação de eventos artísticos e de promoção da diversidade cultural (realizados no Museu do Amanhã, no Hotel Vila Galé, na Cidade do Samba, etc.), a elaboração de livro e revistas, o desenvolvimento de Oficinas de Capacitação e Gestão Artística, a Produção de espetáculos teatrais/musicais, a Coordenação de corpo de jurados dos desfiles das escolas de samba do Rio de Janeiro (RJ) e Vitória (ES), a confecção da coroa de Rei Momo e demais acessórios da Corte Momesca das cidades do Rio de Janeiro, Niterói, Maricá e Cruz Alta (RS) e a atuação na elaboração de projetos de lei voltados à economia criativa.
              </p>
              <p>
                Empreendido por um experiente e diverso grupo de produtores, o Plumas & Paetês Cultural se tornou uma das mais importantes referências do seu segmento, sendo chancelado, desde 2012, pela Organização dos Estados Ibero-americanos – (OEI) e outorgado, em 2015, pela Comissão de Cultura da ALERJ, com o Diploma Heloneida Studart, em virtude do seu destaque na promoção da cultura no estado.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects, Products and Events Section */}
      <section id="projetos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Projetos, Produtos e Eventos</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça as principais iniciativas desenvolvidas pelo Instituto ao longo de duas décadas de atuação
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
              Faça Parte da Transformação Cultural
            </h2>
            <p className="text-xl md:text-2xl mb-10 text-white/95">
              Junte-se a nós na missão de valorizar a cultura brasileira
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="/contato"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-carnival-purple bg-white rounded-full hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-2xl"
              >
                Entre em Contato
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
                Transformando a sociedade brasileira por meio da economia criativa desde 2005.
              </p>
              <p className="text-gray-400 text-sm">
                CNPJ: 11.985.110/0001-76
              </p>
            </div>

            {/* Column 2: Contact */}
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

            {/* Column 3: Social Media */}
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
              <p className="text-gray-400 text-sm">
                Acompanhe nossos eventos e bastidores
              </p>
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
