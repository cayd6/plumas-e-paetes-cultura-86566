import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { ArrowRight, Award, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Edicoes = () => {
  const { translate, language } = useLanguage();

  const editions = [
    {
      year: "2025",
      edition: "20ª",
      title: language === 'pt' ? "Edição Comemorativa - 20 Anos" : "Commemorative Edition - 20 Years",
      description: language === 'pt' 
        ? "Celebração de duas décadas de reconhecimento aos artífices do carnaval carioca."
        : "Celebration of two decades of recognition for Rio carnival artisans.",
      image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
      highlight: true,
    },
    {
      year: "2024",
      edition: "19ª",
      title: language === 'pt' ? "Prêmio Plumas & Paetês Cultural" : "Plumas & Paetês Cultural Award",
      description: language === 'pt' 
        ? "Reconhecimento aos profissionais que fazem o carnaval acontecer."
        : "Recognition of professionals who make carnival happen.",
      image: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
      highlight: false,
    },
    {
      year: "2023",
      edition: "18ª",
      title: language === 'pt' ? "O Retorno Triunfal" : "The Triumphant Return",
      description: language === 'pt' 
        ? "Celebração do retorno do carnaval após a pandemia."
        : "Celebration of carnival's return after the pandemic.",
      image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO 
        title="Edições do Prêmio | Instituto Plumas e Paetês Cultural"
        description="Conheça todas as edições do Prêmio Plumas & Paetês Cultural - 20 anos reconhecendo os artífices do carnaval carioca."
        keywords="prêmio carnaval, edições, plumas paetês, artífices carnaval, Rio de Janeiro"
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
              <Award className="w-5 h-5" />
              <span className="font-semibold">{translate("edicoes")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {language === 'pt' ? 'Edições do Prêmio' : 'Award Editions'}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              {language === 'pt' 
                ? "20 anos reconhecendo os artífices do carnaval carioca"
                : "20 years recognizing the artisans of Rio's carnival"}
            </p>
          </div>
        </div>
      </section>

      {/* 20 Years Highlight */}
      <section className="py-10 bg-secondary/10 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-primary">20</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{language === 'pt' ? 'Anos de História' : 'Years of History'}</p>
                <p className="text-sm text-muted-foreground">2005 - 2025</p>
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-primary">1400+</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{language === 'pt' ? 'Artistas Premiados' : 'Artists Awarded'}</p>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Em todas as edições' : 'In all editions'}</p>
              </div>
            </div>
            <div className="w-px h-10 bg-border hidden md:block" />
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-primary">51</div>
              <div className="text-left">
                <p className="font-semibold text-foreground">{language === 'pt' ? 'Categorias' : 'Categories'}</p>
                <p className="text-sm text-muted-foreground">{language === 'pt' ? 'Profissionais' : 'Professionals'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editions Timeline */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {language === 'pt' ? 'Linha do Tempo' : 'Timeline'}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'pt' 
                ? "Acompanhe a evolução do prêmio ao longo dos anos"
                : "Follow the evolution of the award over the years"}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {editions.map((edition, index) => (
              <Card key={index} className={`overflow-hidden transition-all duration-300 hover:shadow-xl ${edition.highlight ? 'ring-2 ring-secondary' : ''}`}>
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="aspect-video md:aspect-auto overflow-hidden">
                    <img
                      src={edition.image}
                      alt={edition.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <CardContent className="md:col-span-2 p-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge variant={edition.highlight ? "default" : "secondary"} className="rounded-full">
                        <Calendar className="w-3 h-3 mr-1" />
                        {edition.year}
                      </Badge>
                      <span className="text-2xl font-bold text-primary">{edition.edition}</span>
                      {edition.highlight && (
                        <Badge variant="outline" className="bg-secondary/20 text-secondary-foreground border-secondary">
                          {language === 'pt' ? 'Edição Especial' : 'Special Edition'}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl mb-2">{edition.title}</CardTitle>
                    <CardDescription className="mb-4">{edition.description}</CardDescription>
                    <Button asChild variant="outline" size="sm" className="w-fit rounded-full">
                      <Link to={`/edicoes/${edition.edition.replace('ª', '')}`}>
                        {translate("lerMaisEdicao")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {language === 'pt' ? 'Participe da 20ª Edição' : 'Join the 20th Edition'}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Entre em contato para saber como participar da edição comemorativa"
              : "Get in touch to learn how to participate in the commemorative edition"}
          </p>
          <Button asChild size="lg" className="rounded-full bg-background text-primary hover:bg-background/90">
            <Link to="/contato">
              {translate("entrarContato")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Edicoes;
