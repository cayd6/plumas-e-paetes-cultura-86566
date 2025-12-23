import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import SEO from "@/components/SEO";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Award, Users, Lightbulb, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Producao = () => {
  const { translate, language } = useLanguage();

  const services = [
    {
      icon: Sparkles,
      title: language === 'pt' ? 'Produção de Eventos Culturais' : 'Cultural Event Production',
      description: language === 'pt'
        ? 'Planejamento e execução de eventos culturais de grande porte, desde o conceito até a realização.'
        : 'Planning and execution of large-scale cultural events, from concept to completion.',
      features: [
        language === 'pt' ? 'Gestão completa do evento' : 'Complete event management',
        language === 'pt' ? 'Coordenação de equipes' : 'Team coordination',
        language === 'pt' ? 'Produção técnica e artística' : 'Technical and artistic production',
      ]
    },
    {
      icon: Award,
      title: language === 'pt' ? 'Consultoria em Economia Criativa' : 'Creative Economy Consulting',
      description: language === 'pt'
        ? 'Desenvolvimento de projetos culturais sustentáveis e estratégias para economia criativa.'
        : 'Development of sustainable cultural projects and strategies for creative economy.',
      features: [
        language === 'pt' ? 'Planejamento estratégico' : 'Strategic planning',
        language === 'pt' ? 'Captação de recursos' : 'Fundraising',
        language === 'pt' ? 'Gestão de projetos culturais' : 'Cultural project management',
      ]
    },
    {
      icon: Users,
      title: language === 'pt' ? 'Consultoria Técnica em Carnaval' : 'Carnival Technical Consulting',
      description: language === 'pt'
        ? 'Assessoria especializada para escolas de samba, blocos e agremiações carnavalescas.'
        : 'Specialized consulting for samba schools, carnival blocks and associations.',
      features: [
        language === 'pt' ? 'Análise técnica de desfiles' : 'Technical parade analysis',
        language === 'pt' ? 'Formação de equipes' : 'Team training',
        language === 'pt' ? 'Estratégias competitivas' : 'Competitive strategies',
      ]
    },
    {
      icon: Lightbulb,
      title: language === 'pt' ? 'Criação de Conteúdo Cultural' : 'Cultural Content Creation',
      description: language === 'pt'
        ? 'Produção de conteúdo editorial, fotográfico e audiovisual sobre cultura e carnaval.'
        : 'Editorial, photographic and audiovisual content production about culture and carnival.',
      features: [
        language === 'pt' ? 'Fotografia profissional' : 'Professional photography',
        language === 'pt' ? 'Produção de revista' : 'Magazine production',
        language === 'pt' ? 'Cobertura de eventos' : 'Event coverage',
      ]
    },
  ];

  const portfolio = [
    {
      title: language === 'pt' ? 'Prêmio aos Artífices do Carnaval - 19ª Edição' : 'Carnival Artisan Award - 19th Edition',
      year: '2024',
      description: language === 'pt'
        ? 'Produção completa da cerimônia de premiação com mais de 500 convidados.'
        : 'Complete production of award ceremony with over 500 guests.',
      image: '/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png',
    },
    {
      title: language === 'pt' ? 'Festival de Cultura Popular' : 'Popular Culture Festival',
      year: '2024',
      description: language === 'pt'
        ? 'Organização de festival com múltiplas atrações e oficinas culturais.'
        : 'Organization of festival with multiple attractions and cultural workshops.',
      image: '/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png',
    },
    {
      title: language === 'pt' ? 'Consultoria Escola de Samba Vila Isabel' : 'Vila Isabel Samba School Consulting',
      year: '2024',
      description: language === 'pt'
        ? 'Assessoria técnica e estratégica para o desfile campeão.'
        : 'Technical and strategic consulting for the championship parade.',
      image: '/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png',
    },
  ];

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
