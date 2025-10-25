import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Download, Eye, Calendar, Instagram, Facebook, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Revista = () => {
  const { translate, language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("all");

  const magazines = [
    {
      year: "2024",
      edition: "19ª Edição",
      cover: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
      title: language === 'pt' ? "Carnaval 2024 - O Retorno Triunfal" : "Carnival 2024 - The Triumphant Return",
      description: language === 'pt' 
        ? "Edição especial destacando os grandes momentos do Carnaval 2024, entrevistas exclusivas e bastidores das escolas campeãs."
        : "Special edition highlighting the great moments of Carnival 2024, exclusive interviews and behind the scenes of champion schools.",
      pages: 120,
      downloads: 2450,
    },
    {
      year: "2023",
      edition: "18ª Edição",
      cover: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
      title: language === 'pt' ? "Os Artífices do Carnaval" : "The Carnival Artisans",
      description: language === 'pt'
        ? "Homenagem aos mestres da cultura popular e aos artesãos que mantêm viva a tradição do carnaval carioca."
        : "Tribute to the masters of popular culture and artisans who keep alive the tradition of Rio's carnival.",
      pages: 98,
      downloads: 1980,
    },
    {
      year: "2023",
      edition: "17ª Edição",
      cover: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
      title: language === 'pt' ? "Economia Criativa no Carnaval" : "Creative Economy in Carnival",
      description: language === 'pt'
        ? "Análise do impacto econômico do carnaval e as oportunidades na economia criativa."
        : "Analysis of the economic impact of carnival and opportunities in the creative economy.",
      pages: 86,
      downloads: 1720,
    },
  ];

  const filteredMagazines = selectedYear === "all" 
    ? magazines 
    : magazines.filter(m => m.year === selectedYear);

  const years = ["all", ...Array.from(new Set(magazines.map(m => m.year)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 carnival-gradient overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-slide-up">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">{translate("revista")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              Revista Plumas & Paetês
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              {language === 'pt' 
                ? "Sua fonte de informação sobre cultura, carnaval e economia criativa"
                : "Your source of information about culture, carnival and creative economy"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-square lg:aspect-auto">
                <img 
                  src={magazines[0].cover} 
                  alt={magazines[0].title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-carnival-magenta font-semibold mb-4">
                  <Calendar className="w-5 h-5" />
                  {magazines[0].edition} • {magazines[0].year}
                </div>
                <h2 className="text-4xl font-bold mb-6">{magazines[0].title}</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {magazines[0].description}
                </p>
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-carnival-purple" />
                    <span className="text-gray-600">{magazines[0].pages} {translate("paginas")}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-carnival-purple" />
                    <span className="text-gray-600">{magazines[0].downloads} downloads</span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Link 
                    to="/revistas"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-carnival-purple text-white rounded-full hover:opacity-90 transition-all font-semibold"
                  >
                    <Eye className="w-5 h-5" />
                    {translate("lerOnline")}
                  </Link>
                  <button className="inline-flex items-center gap-2 px-8 py-4 border-2 border-carnival-purple text-carnival-purple rounded-full hover:bg-carnival-purple hover:text-white transition-all font-semibold">
                    <Download className="w-5 h-5" />
                    {translate("baixarPDF")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Magazine Archive */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{translate("arquivoRevistas")}</h2>
            <p className="text-xl text-gray-600">
              {language === 'pt' 
                ? "Explore todas as edições da Revista Plumas & Paetês"
                : "Explore all editions of Plumas & Paetês Magazine"}
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-4 mb-12">
            {years.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedYear === year
                    ? 'bg-carnival-purple text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {year === "all" ? translate("todas") : year}
              </button>
            ))}
          </div>

          {/* Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMagazines.map((magazine, index) => (
              <div 
                key={index}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={magazine.cover}
                    alt={magazine.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-carnival-magenta font-semibold mb-2">
                    {magazine.edition} • {magazine.year}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{magazine.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {magazine.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {magazine.pages}p
                    </span>
                    <span className="flex items-center gap-1">
                      <Download className="w-4 h-4" />
                      {magazine.downloads}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to="/revistas"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-carnival-purple text-white rounded-lg hover:opacity-90 transition-all text-sm font-semibold"
                    >
                      <Eye className="w-4 h-4" />
                      {translate("ler")}
                    </Link>
                    <button className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-carnival-purple text-carnival-purple rounded-lg hover:bg-carnival-purple hover:text-white transition-all text-sm font-semibold">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'pt' ? 'Receba as Novidades' : 'Get the News'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Inscreva-se e receba em primeira mão as novas edições e conteúdos exclusivos"
              : "Subscribe and be the first to receive new editions and exclusive content"}
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={language === 'pt' ? "Seu e-mail" : "Your email"}
              className="flex-1 px-6 py-4 rounded-full text-gray-900"
            />
            <button className="px-8 py-4 bg-white text-carnival-magenta rounded-full hover:bg-white/90 transition-colors font-bold">
              {translate("assinar")}
            </button>
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
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/sobre" className="text-gray-400 hover:text-white transition-colors">{translate("sobre")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
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

export default Revista;
