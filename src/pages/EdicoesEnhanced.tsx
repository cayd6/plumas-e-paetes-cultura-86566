import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { ArrowRight, Award, Trophy, Star, Calendar, Users, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const EdicoesEnhanced = () => {
  const { translate, language } = useLanguage();

  const categories = [
    { 
      icon: Award, 
      title: language === 'pt' ? 'Melhor Passista' : 'Best Samba Dancer',
      description: language === 'pt' ? 'Reconhecimento aos melhores passistas do carnaval' : 'Recognition of the best carnival dancers'
    },
    { 
      icon: Trophy, 
      title: language === 'pt' ? 'Destaques de Performance' : 'Performance Highlights',
      description: language === 'pt' ? 'Premiação para performances memoráveis' : 'Awards for memorable performances'
    },
    { 
      icon: Star, 
      title: language === 'pt' ? 'Design de Iluminação' : 'Lighting Design',
      description: language === 'pt' ? 'Reconhecimento da excelência técnica' : 'Recognition of technical excellence'
    },
    { 
      icon: Users, 
      title: language === 'pt' ? 'Melhor Comissão de Frente' : 'Best Opening Commission',
      description: language === 'pt' ? 'Premiando a abertura mais impactante' : 'Awarding the most impactful opening'
    },
    { 
      icon: Award, 
      title: language === 'pt' ? 'Melhor Fantasia' : 'Best Costume',
      description: language === 'pt' ? 'Criatividade e técnica em fantasias' : 'Creativity and technique in costumes'
    },
    { 
      icon: Trophy, 
      title: language === 'pt' ? 'Melhor Alegoria' : 'Best Float',
      description: language === 'pt' ? 'Excelência em carros alegóricos' : 'Excellence in parade floats'
    },
  ];

  const winners = [
    {
      year: '2024',
      school: 'Vila Isabel',
      category: language === 'pt' ? 'Melhor Passista' : 'Best Samba Dancer',
      winner: 'Maria Silva',
      image: '/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png'
    },
    {
      year: '2024',
      school: 'Beija-Flor',
      category: language === 'pt' ? 'Melhor Comissão de Frente' : 'Best Opening Commission',
      winner: 'Grupo Beija-Flor',
      image: '/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png'
    },
    {
      year: '2024',
      school: 'Mangueira',
      category: language === 'pt' ? 'Melhor Fantasia' : 'Best Costume',
      winner: 'João Santos',
      image: '/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png'
    },
  ];

  const editions = [
    { edition: '20ª', year: '2025', status: language === 'pt' ? 'Próxima' : 'Upcoming' },
    { edition: '19ª', year: '2024', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '18ª', year: '2023', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '17ª', year: '2022', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '16ª', year: '2020', status: language === 'pt' ? 'Realizada' : 'Completed' },
    { edition: '15ª', year: '2019', status: language === 'pt' ? 'Realizada' : 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-ppc-purple via-ppc-magenta to-ppc-orange overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-slide-up">
              <Calendar className="w-5 h-5" />
              <span className="font-semibold">20ª {translate("edicao")} - 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              {translate("premioPlumas")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 animate-fade-in">
              {translate("premioDesc")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#categories"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ppc-purple rounded-full hover:bg-white/90 transition-colors font-semibold text-lg"
              >
                {translate("categoriasPremio")}
                <ArrowRight size={20} />
              </a>
              <a
                href="#inscricoes"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-colors font-semibold text-lg"
              >
                {translate("inscricoes")}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("categoriasPremio")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt' 
                ? 'Celebrando a excelência em todas as áreas do carnaval carioca'
                : 'Celebrating excellence in all areas of Rio\'s carnival'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ppc-purple to-ppc-magenta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <category.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previous Winners Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("vencedoresAnteriores")}</h2>
            <p className="text-xl text-gray-600">
              {language === 'pt' 
                ? 'Celebrando os talentos que brilharam em edições passadas'
                : 'Celebrating the talents that shone in past editions'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {winners.map((winner, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={winner.image}
                    alt={winner.winner}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Trophy className="w-5 h-5" />
                      <span className="text-sm font-semibold">{winner.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{winner.winner}</h3>
                    <p className="text-sm text-white/80 mb-1">{winner.school}</p>
                    <p className="text-sm text-white/60">{winner.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("timelineEdicoes")}</h2>
            <p className="text-xl text-gray-600">
              {language === 'pt' 
                ? 'Duas décadas celebrando a cultura do carnaval'
                : 'Two decades celebrating carnival culture'}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {editions.map((edition, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex items-center justify-between group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ppc-purple to-ppc-magenta flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {edition.edition}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{edition.year}</h3>
                      <p className="text-gray-600">{edition.status}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-ppc-purple group-hover:translate-x-2 transition-transform duration-300" size={24} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section id="inscricoes" className="py-20 bg-gradient-to-br from-ppc-magenta to-ppc-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'pt' ? 'Inscrições Abertas!' : 'Registration Open!'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Participe da 20ª edição do Prêmio Plumas & Paetês e celebre a cultura do carnaval'
              : 'Participate in the 20th edition of the Plumas & Paetês Award and celebrate carnival culture'}
          </p>
          <a
            href="https://wa.me/5521989392920"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-ppc-magenta rounded-full hover:bg-white/90 transition-colors font-bold text-lg shadow-2xl"
          >
            <Phone size={24} />
            {language === 'pt' ? 'Entre em Contato' : 'Get in Touch'}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/galeria" className="text-gray-400 hover:text-white transition-colors">{translate("galeria")}</a></li>
                <li><a href="/contato" className="text-gray-400 hover:text-white transition-colors">{translate("contato")}</a></li>
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
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  contato@institutoplumasepaetescultural.com
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  +55 21 98939-2920
                </p>
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

export default EdicoesEnhanced;