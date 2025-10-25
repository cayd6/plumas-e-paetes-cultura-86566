import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar, User, Tag, ArrowRight, Search, Instagram, Facebook, Mail, Phone } from "lucide-react";

const Blog = () => {
  const { translate, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: language === 'pt' ? "Todas" : "All" },
    { id: "carnaval", label: "Carnaval" },
    { id: "cultura", label: language === 'pt' ? "Cultura" : "Culture" },
    { id: "economia", label: language === 'pt' ? "Economia Criativa" : "Creative Economy" },
    { id: "eventos", label: language === 'pt' ? "Eventos" : "Events" },
  ];

  const posts = [
    {
      id: 1,
      title: language === 'pt' 
        ? "Vila Isabel conquista o bicampeonato do Carnaval 2025" 
        : "Vila Isabel wins back-to-back Carnival 2025 championship",
      excerpt: language === 'pt'
        ? "A escola de Niterói fez história ao conquistar seu segundo título consecutivo com o enredo sobre Maria Augusta, superando a concorrência com uma apresentação impecável."
        : "The Niterói school made history by winning its second consecutive title with the plot about Maria Augusta, surpassing the competition with an impeccable presentation.",
      date: "25 de Fevereiro, 2025",
      author: "José Antonio Rodrigues",
      category: "carnaval",
      image: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
      featured: true,
    },
    {
      id: 2,
      title: language === 'pt'
        ? "Bastidores: A confecção das fantasias vencedoras"
        : "Behind the Scenes: The making of winning costumes",
      excerpt: language === 'pt'
        ? "Conheça os artesãos responsáveis pelas fantasias mais impressionantes do Carnaval 2025 e os segredos por trás de cada detalhe."
        : "Meet the artisans responsible for the most impressive costumes of Carnival 2025 and the secrets behind each detail.",
      date: "20 de Fevereiro, 2025",
      author: "Maria Silva",
      category: "cultura",
      image: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
    },
    {
      id: 3,
      title: language === 'pt'
        ? "Economia do Carnaval: R$ 5 bilhões movimentados no Rio"
        : "Carnival Economy: R$ 5 billion moved in Rio",
      excerpt: language === 'pt'
        ? "Análise completa do impacto econômico do Carnaval 2025 no Rio de Janeiro, mostrando números recordes de turismo e geração de empregos."
        : "Complete analysis of the economic impact of Carnival 2025 in Rio de Janeiro, showing record numbers in tourism and job creation.",
      date: "18 de Fevereiro, 2025",
      author: "Carlos Mendes",
      category: "economia",
      image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
    },
    {
      id: 4,
      title: language === 'pt'
        ? "Beija-Flor emociona com homenagem à cultura nordestina"
        : "Beija-Flor moves with tribute to northeastern culture",
      excerpt: language === 'pt'
        ? "A tradicional escola de Nilópolis apresentou um desfile memorável celebrando as raízes e tradições do Nordeste brasileiro."
        : "The traditional Nilópolis school presented a memorable parade celebrating the roots and traditions of Northeast Brazil.",
      date: "16 de Fevereiro, 2025",
      author: "Ana Paula Costa",
      category: "carnaval",
      image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
    },
    {
      id: 5,
      title: language === 'pt'
        ? "Prêmio Plumas & Paetês 2025: Conheça os indicados"
        : "Plumas & Paetês Award 2025: Meet the nominees",
      excerpt: language === 'pt'
        ? "Revelamos os finalistas das principais categorias da 20ª edição do prêmio que celebra os artífices do carnaval carioca."
        : "We reveal the finalists in the main categories of the 20th edition of the award that celebrates Rio's carnival artisans.",
      date: "10 de Fevereiro, 2025",
      author: "José Antonio Rodrigues",
      category: "eventos",
      image: "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png",
    },
    {
      id: 6,
      title: language === 'pt'
        ? "Mangueira apresenta samba-enredo revolucionário"
        : "Mangueira presents revolutionary samba plot",
      excerpt: language === 'pt'
        ? "A Verde e Rosa da Mangueira surpreende com composição que une tradição e modernidade, conquistando crítica e público."
        : "The Green and Pink of Mangueira surprises with a composition that unites tradition and modernity, winning critics and audiences.",
      date: "5 de Fevereiro, 2025",
      author: "Pedro Oliveira",
      category: "carnaval",
      image: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png",
    },
  ];

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPost = posts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              {translate("blog")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              {language === 'pt'
                ? "Notícias, análises e histórias do mundo do carnaval e da cultura popular"
                : "News, analysis and stories from the world of carnival and popular culture"}
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder={language === 'pt' ? "Buscar artigos..." : "Search articles..."}
                className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-carnival-purple focus:border-transparent"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-carnival-purple text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredPost && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-auto">
                  <img 
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 text-carnival-magenta text-sm font-semibold mb-4">
                    <Tag size={16} />
                    {categories.find(c => c.id === featuredPost.category)?.label}
                  </div>
                  <h2 className="text-4xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={16} />
                      {featuredPost.author}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 px-8 py-4 bg-carnival-purple text-white rounded-full hover:opacity-90 transition-all font-semibold self-start">
                    {translate("lerMais")}
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <article 
                key={post.id}
                className="group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="inline-flex items-center gap-2 text-carnival-magenta text-xs font-semibold mb-3">
                    <Tag size={14} />
                    {categories.find(c => c.id === post.category)?.label}
                  </div>
                  <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <User size={14} />
                      {post.author}
                    </span>
                  </div>
                  <button className="inline-flex items-center gap-2 text-carnival-purple hover:text-carnival-magenta transition-colors font-semibold text-sm">
                    {translate("lerMais")}
                    <ArrowRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'pt' ? 'Fique por Dentro' : 'Stay Updated'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Assine nossa newsletter e receba as últimas notícias do carnaval direto no seu e-mail"
              : "Subscribe to our newsletter and receive the latest carnival news directly in your email"}
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

export default Blog;
