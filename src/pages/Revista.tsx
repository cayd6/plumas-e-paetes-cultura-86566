import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { BookOpen, Download, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        ? "Edição especial destacando os grandes momentos do Carnaval 2024."
        : "Special edition highlighting the great moments of Carnival 2024.",
      pages: 120,
    },
    {
      year: "2023",
      edition: "18ª Edição",
      cover: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
      title: language === 'pt' ? "Os Artífices do Carnaval" : "The Carnival Artisans",
      description: language === 'pt'
        ? "Homenagem aos mestres da cultura popular."
        : "Tribute to the masters of popular culture.",
      pages: 98,
    },
    {
      year: "2023",
      edition: "17ª Edição",
      cover: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
      title: language === 'pt' ? "Economia Criativa no Carnaval" : "Creative Economy in Carnival",
      description: language === 'pt'
        ? "Análise do impacto econômico do carnaval."
        : "Analysis of the economic impact of carnival.",
      pages: 86,
    },
  ];

  const filteredMagazines = selectedYear === "all" 
    ? magazines 
    : magazines.filter(m => m.year === selectedYear);

  const years = ["all", ...Array.from(new Set(magazines.map(m => m.year)))];

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO 
        title="Revista Plumas e Paetês | Instituto Plumas e Paetês Cultural"
        description="Revista sobre cultura, carnaval e economia criativa. Conteúdo exclusivo sobre os artífices do carnaval carioca e a cultura popular brasileira."
        keywords="revista cultural, carnaval, economia criativa, cultura brasileira, plumas paetês"
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
          <div className="text-center text-primary-foreground">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full mb-6">
              <BookOpen className="w-5 h-5" />
              <span className="font-semibold">{translate("revista")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Revista Plumas & Paetês
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {language === 'pt' 
                ? "Sua fonte de informação sobre cultura, carnaval e economia criativa"
                : "Your source of information about culture, carnival and creative economy"}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-5xl mx-auto overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-square lg:aspect-auto">
                <img 
                  src={magazines[0].cover} 
                  alt={magazines[0].title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-8 lg:p-10 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 text-accent font-semibold mb-4">
                  <Calendar className="w-5 h-5" />
                  {magazines[0].edition} • {magazines[0].year}
                </div>
                <CardTitle className="text-3xl mb-4">{magazines[0].title}</CardTitle>
                <CardDescription className="text-base mb-6">
                  {magazines[0].description}
                </CardDescription>
                <div className="flex items-center gap-4 mb-6 text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {magazines[0].pages} {translate("paginas")}
                  </span>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="rounded-full">
                    <Link to="/revistas">
                      <Eye className="w-4 h-4 mr-2" />
                      {translate("lerOnline")}
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    <Download className="w-4 h-4 mr-2" />
                    {translate("baixarPDF")}
                  </Button>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* Magazine Archive */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {translate("arquivoRevistas")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'pt' 
                ? "Explore todas as edições da Revista Plumas & Paetês"
                : "Explore all editions of Plumas & Paetês Magazine"}
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {years.map(year => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                className="rounded-full"
              >
                {year === "all" ? translate("todas") : year}
              </Button>
            ))}
          </div>

          {/* Magazine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredMagazines.map((magazine, index) => (
              <Card key={index} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={magazine.cover}
                    alt={magazine.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardHeader className="pb-3">
                  <div className="text-sm text-accent font-semibold mb-1">
                    {magazine.edition} • {magazine.year}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{magazine.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {magazine.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex gap-2">
                    <Button asChild size="sm" className="flex-1 rounded-full">
                      <Link to="/revistas">
                        <Eye className="w-4 h-4 mr-1" />
                        {translate("ler")}
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 md:py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {language === 'pt' ? 'Receba as Novidades' : 'Get the News'}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Inscreva-se e receba em primeira mão as novas edições"
              : "Subscribe and be the first to receive new editions"}
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder={language === 'pt' ? "Seu e-mail" : "Your email"}
              className="flex-1 px-6 py-3 rounded-full text-foreground bg-background"
            />
            <Button className="rounded-full px-6">
              {translate("assinar")}
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Revista;
