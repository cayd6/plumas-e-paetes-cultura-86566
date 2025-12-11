import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import PlumasEmNumeros from "@/components/PlumasEmNumeros";
import { ArrowRight, Award, Trophy, Star, Calendar, Users, Phone, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const EdicoesEnhanced = () => {
  const { translate, language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Categorias Premiadas (Main Categories)
  const mainCategories = [
    'Aderecista', 'Aramista', 'Artesão', 'Artista Plástico', 
    'Assistente de Carnavalesco', 'Assistente de Coreógrafo',
    'Batedor de Placas de Acetato', 'Bordadeira', 'Carnavalesco', 
    'Carpinteiro', 'Chapeleiro', 'Compositor',
    'Coreógrafo de Comissão de Frente', 'Coreógrafo de Alas', 'Coreógrafo de Alegorias',
    'Costureira', 'Desenhista', 'Designer Gráfico',
    'Destaque de Luxo Masculino', 'Destaque de Luxo Feminino', 'Destaque Performático',
    'Diretor de Carnaval', 'Diretor de Harmonia', 'Diretor de Bateria', 
    'Diretor de Barracão', 'Diretor Artístico', 'Diretor Musical', 'Diretor de Passistas',
    'Empastelador', 'Escultor de Isopor', 'Escultor de Espuma', 
    'Escultor de Formas e Movimento', 'Estilista', 'Ferreiro', 
    'Figurinista', 'Gestor de Ateliê', 'Iluminador', 'Intérprete',
    'Laminador', 'Maquiador Artístico', 'Mestre de Bateria', 'Mestre Sala',
    'Modelista', 'Passista', 'Pesquisador', 'Pintor de Arte',
    'Porta Bandeira', 'Projetista', 'Vidraceiro'
  ];

  // Prêmios Especiais (Special Awards)
  const specialAwards = [
    { name: 'Assessor de Imprensa', special: false },
    { name: 'Assessor de Marketing', special: false },
    { name: 'Fotógrafo', special: false },
    { name: 'Gestor de Mídias', special: false },
    { name: 'Jornalista', special: false },
    { name: 'Roteirista de Vídeos', special: false },
    { name: 'Sapateiro', special: false },
    { name: '"Eu Sou o Samba"', special: true },
    { name: '"Vem de Lá"', special: true },
    { name: 'Personalidade do Carnaval', special: true },
  ];

  const allWinners = [
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
    {
      year: '2023',
      school: 'Salgueiro',
      category: language === 'pt' ? 'Melhor Alegoria' : 'Best Float',
      winner: 'Ana Paula Costa',
      image: '/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png'
    },
    {
      year: '2023',
      school: 'Portela',
      category: language === 'pt' ? 'Melhor Passista' : 'Best Samba Dancer',
      winner: 'Pedro Oliveira',
      image: '/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png'
    },
    {
      year: '2022',
      school: 'Grande Rio',
      category: language === 'pt' ? 'Design de Iluminação' : 'Lighting Design',
      winner: 'Luiz Fernando',
      image: '/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png'
    },
  ];

  const years = ["all", "2024", "2023", "2022"];
  const filterCategories = [
    "all",
    language === 'pt' ? 'Melhor Passista' : 'Best Samba Dancer',
    language === 'pt' ? 'Melhor Comissão de Frente' : 'Best Opening Commission',
    language === 'pt' ? 'Melhor Fantasia' : 'Best Costume',
    language === 'pt' ? 'Melhor Alegoria' : 'Best Float',
    language === 'pt' ? 'Design de Iluminação' : 'Lighting Design',
  ];

  const filteredWinners = allWinners.filter(winner => {
    const yearMatch = selectedYear === "all" || winner.year === selectedYear;
    const categoryMatch = selectedCategory === "all" || winner.category === selectedCategory;
    return yearMatch && categoryMatch;
  });

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
      <SEO 
        title={translate("premioPlumas")}
        description={translate("premioDesc")}
        keywords="prêmio plumas paetês, carnaval, premiação, cultura"
      />
      <Navigation />
      <LanguageControls />
      <Breadcrumbs />
      
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

      {/* Plumas em Números Section */}
      <PlumasEmNumeros />

      {/* Categories Section */}
      <section id="categories" className="py-20">
        <div className="container mx-auto px-4">
          {/* Main Categories */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{translate("categoriasPremio")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-2">
              {language === 'pt' 
                ? 'Celebrando a excelência em todas as áreas do carnaval carioca'
                : 'Celebrating excellence in all areas of Rio\'s carnival'}
            </p>
            <p className="text-lg text-ppc-purple font-semibold">
              {language === 'pt' ? '49 Categorias Premiadas' : '49 Award Categories'}
            </p>
          </div>
          
          {/* Main Categories Grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {mainCategories.map((category, index) => (
              <div 
                key={index}
                className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 hover:border-ppc-purple/30 group cursor-default"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-ppc-purple transition-colors">
                  {category}
                </span>
              </div>
            ))}
          </div>

          {/* Special Awards Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ppc-yellow to-ppc-orange rounded-full mb-4">
              <Star className="w-5 h-5 text-white" />
              <span className="text-white font-semibold">
                {language === 'pt' ? 'Prêmios Especiais' : 'Special Awards'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {specialAwards.map((award, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl text-center transition-all duration-300 hover:-translate-y-1 ${
                  award.special 
                    ? 'bg-gradient-to-br from-ppc-yellow via-ppc-orange to-ppc-magenta text-white shadow-lg hover:shadow-xl' 
                    : 'bg-white border-2 border-gray-100 hover:border-ppc-purple/30 shadow-md hover:shadow-lg'
                }`}
              >
                {award.special && <Trophy className="w-6 h-6 mx-auto mb-2" />}
                <span className={`text-sm font-semibold ${award.special ? 'text-white' : 'text-gray-700'}`}>
                  {award.name}
                </span>
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
            <p className="text-xl text-gray-600 mb-8">
              {language === 'pt' 
                ? 'Celebrando os talentos que brilharam em edições passadas'
                : 'Celebrating the talents that shone in past editions'}
            </p>
            
            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-12">
              <div className="flex items-center gap-2">
                <Filter className="text-carnival-purple" size={20} />
                <span className="font-semibold text-gray-700">
                  {language === 'pt' ? 'Filtrar por:' : 'Filter by:'}
                </span>
              </div>
              
              {/* Year filter */}
              <div className="flex flex-wrap gap-2">
                {years.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all ${
                      selectedYear === year
                        ? 'bg-carnival-purple text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {year === "all" ? (language === 'pt' ? 'Todos os Anos' : 'All Years') : year}
                  </button>
                ))}
              </div>
              
              {/* Category filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 rounded-full border-2 border-gray-200 focus:border-carnival-purple focus:outline-none font-semibold text-gray-700 bg-white"
              >
                {filterCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? (language === 'pt' ? 'Todas as Categorias' : 'All Categories') : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Winners grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWinners.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-gray-500">
                  {language === 'pt' 
                    ? 'Nenhum vencedor encontrado com os filtros selecionados'
                    : 'No winners found with the selected filters'}
                </p>
              </div>
            ) : (
              filteredWinners.map((winner, index) => (
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
              ))
            )}
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
              ? 'Participe da 20ª edição do Prêmio Plumas & Paetês Cultural e celebre a cultura do carnaval'
              : 'Participate in the 20th edition of the Plumas & Paetês Cultural Award and celebrate carnival culture'}
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

      <Footer />
    </div>
  );
};

export default EdicoesEnhanced;