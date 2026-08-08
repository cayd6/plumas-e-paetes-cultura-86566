import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBlogCategories, useBlogPosts } from "../hooks/useBlogData";
import { Calendar, User, Tag, ArrowRight, Search } from "lucide-react";

const Blog = () => {
  const { translate, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { data: dbCategories = [] } = useBlogCategories();
  const { data: dbPosts = [], isLoading } = useBlogPosts(true);

  const categories = [
    { id: "all", label: language === 'pt' ? "Todas" : "All" },
    ...dbCategories.map((cat) => ({
      id: cat.id,
      label: language === 'pt' ? cat.name_pt : (cat.name_en || cat.name_pt),
    })),
  ];

  const formatDate = (iso?: string | null) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const posts = dbPosts.map((post) => ({
    id: post.id,
    title: language === 'pt' ? post.title_pt : (post.title_en || post.title_pt),
    excerpt: language === 'pt' ? (post.excerpt_pt || '') : (post.excerpt_en || post.excerpt_pt || ''),
    date: formatDate(post.published_at || post.created_at),
    author: post.author_name || "",
    category: post.category_id || "",
    image: post.image_url || "/placeholder.svg",
  }));

  const filteredPosts = selectedCategory === "all" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPost = posts.find((p) => p.id === posts[0]?.id);
  const regularPosts = filteredPosts.filter(post => !featuredPost || post.id !== featuredPost.id);

  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@graph": posts.map((p) => ({
        "@type": "Article",
        headline: p.title,
        description: p.excerpt,
        image: `https://institutoplumasepaetescultural.org${p.image}`,
        datePublished: p.date,
        author: { "@type": "Person", name: p.author },
        publisher: {
          "@type": "Organization",
          name: "Instituto Plumas e Paetês Cultural",
          logo: { "@type": "ImageObject", url: "https://institutoplumasepaetescultural.org/lovable-uploads/71229f5b-e539-4525-8145-9fa3f9c26b00.png" },
        },
      })),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "blog-jsonld";
    script.text = JSON.stringify(ld);
    document.head.appendChild(script);
    return () => {
      document.getElementById("blog-jsonld")?.remove();
    };
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={translate("blog")}
        description={language === 'pt' 
          ? "Notícias, análises e histórias do mundo do carnaval e da cultura popular"
          : "News, analysis and stories from the world of carnival and popular culture"}
        keywords="blog, notícias, carnaval, cultura, eventos"
      />
      <Navigation />
      <LanguageControls />
      <Breadcrumbs />
      
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
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 rounded-full border-2 border-carnival-purple/30 border-t-carnival-purple animate-spin" role="status" aria-label="Carregando" />
            </div>
          ) : regularPosts.length === 0 ? (
            <p className="text-center text-gray-500 py-16">
              {language === 'pt' ? 'Nenhum artigo publicado ainda.' : 'No published articles yet.'}
            </p>
          ) : (
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
          )}
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

      <Footer />
    </div>
  );
};

export default Blog;
