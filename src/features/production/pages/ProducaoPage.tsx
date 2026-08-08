import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Award, Users, Lightbulb, CheckCircle, ArrowRight, Star, Briefcase, Camera, Palette, Film, PenTool, Music } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useServices, usePortfolioProjects } from "../hooks/useProducaoData";

const iconMap: Record<string, any> = {
  Sparkles,
  Award,
  Users,
  Lightbulb,
  Briefcase,
  Camera,
  Palette,
  Film,
  PenTool,
  Music,
  Star,
};

const Producao = () => {
  const { translate, language } = useLanguage();
  const { data: dbServices = [], isLoading: loadingServices } = useServices();
  const { data: dbProjects = [], isLoading: loadingProjects } = usePortfolioProjects();

  const services = dbServices.map((service) => ({
    icon: iconMap[service.icon] || Star,
    title: language === 'pt' ? service.title_pt : (service.title_en || service.title_pt),
    description: language === 'pt' ? service.description_pt : (service.description_en || service.description_pt),
    features: language === 'pt' ? (service.features_pt || []) : (service.features_en || service.features_pt || []),
  }));

  const portfolio = dbProjects.map((project) => ({
    title: language === 'pt' ? project.title_pt : (project.title_en || project.title_pt),
    year: project.year,
    description: language === 'pt' ? project.description_pt : (project.description_en || project.description_pt),
    image: project.image_url || '/placeholder.svg',
  }));

  return (
    <div className="min-h-screen bg-muted/30">
      <SEO 
        title="Produção de Eventos | Instituto Plumas e Paetês Cultural"
        description="Produção de eventos culturais, consultoria em economia criativa e assessoria técnica para escolas de samba e agremiações carnavalescas no Rio de Janeiro."
        keywords="produção de eventos, eventos culturais, consultoria carnaval, economia criativa, escolas de samba, Rio de Janeiro"
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-foreground/20 backdrop-blur-sm rounded-full mb-6 animate-slide-up">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">{translate("producaoEventos")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-up">
              {language === 'pt' ? 'Produção de Eventos' : 'Event Production'}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-3xl mx-auto animate-fade-in">
              {language === 'pt'
                ? "Transformamos ideias em experiências culturais inesquecíveis"
                : "We transform ideas into unforgettable cultural experiences"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {translate("nossosServicos")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {language === 'pt'
                ? "Soluções completas para produção cultural e eventos de excelência"
                : "Complete solutions for cultural production and excellence events"}
            </p>
          </div>
          
          {loadingServices ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" role="status" aria-label="Carregando" />
            </div>
          ) : services.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {language === 'pt' ? 'Nenhum serviço cadastrado ainda.' : 'No services registered yet.'}
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="text-primary-foreground" size={28} />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-[hsl(142,76%,36%)] flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {translate("portfolio")}
            </h2>
            <p className="text-lg text-muted-foreground">
              {language === 'pt'
                ? "Conheça alguns dos projetos que realizamos com excelência"
                : "Discover some of the projects we've accomplished with excellence"}
            </p>
          </div>
          
          {loadingProjects ? (
            <div className="flex justify-center py-16">
              <div className="h-10 w-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" role="status" aria-label="Carregando" />
            </div>
          ) : portfolio.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">
              {language === 'pt' ? 'Nenhum projeto cadastrado ainda.' : 'No projects registered yet.'}
            </p>
          ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolio.map((project, index) => (
              <Card key={index} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <CardHeader>
                  <div className="inline-block px-3 py-1 bg-secondary/20 text-primary text-sm font-semibold rounded-full mb-2 w-fit">
                    {project.year}
                  </div>
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
            {language === 'pt' ? 'Vamos Criar Juntos?' : 'Let\'s Create Together?'}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Entre em contato e descubra como podemos transformar seu projeto em realidade"
              : "Get in touch and discover how we can turn your project into reality"}
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-8 py-4 bg-background text-primary rounded-full hover:bg-background/90 transition-colors font-bold text-lg shadow-2xl"
          >
            {translate("entrarContato")}
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Producao;
