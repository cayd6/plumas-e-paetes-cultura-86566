import { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import Timeline from "@/components/Timeline";
import Testimonials from "@/components/Testimonials";
import carnivalHeroBg from "@/assets/carnival-hero-bg.jpg";
import carnivalArtisan from "@/assets/carnival-artisan.jpg";
import carnivalPattern from "@/assets/carnival-pattern.jpg";
import joseAntonio from "@/assets/jose-antonio.jpg";
import { 
  Users, 
  Star, 
  CalendarDays, 
  Globe, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone 
} from "lucide-react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem 
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const Sobre = () => {
  const { translate, language } = useLanguage();
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // Animation for sections when they enter viewport
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisibleSections(prev => {
            // Prevent duplicate entries
            if (prev.includes(entry.target.id)) return prev;
            return [...prev, entry.target.id];
          });
        }
      });
    }, { threshold: 0.3 });

    // Add a small delay to ensure DOM elements are rendered
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll('section[id]');
      if (sections.length > 0) {
        sections.forEach(section => {
          observer.observe(section);
        });
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect(); // Properly disconnect the observer
    };
  }, []);

  // Helper to check if section is visible
  const isVisible = (id: string) => visibleSections.includes(id);

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Sobre | Instituto Plumas e Paetês Cultural"
        description="Conheça a história de 20 anos do Instituto Plumas e Paetês Cultural transformando vidas através da cultura, arte e economia criativa."
        keywords="sobre, história, instituto cultural, missão, visão, valores, carnaval, 20 anos"
      />
      <Navigation />
      <div className="pt-20">
        <Breadcrumbs />
        <LanguageControls />
      </div>
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(123, 44, 191, 0.8), rgba(219, 39, 119, 0.8)), url(${carnivalHeroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 z-10" />
        <div className="container mx-auto px-4 z-20 text-center">
          <div className="mb-8 animate-fade-in">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 text-white/90 text-sm font-medium">
              <span className="w-2 h-2 bg-ppc-yellow rounded-full mr-2 animate-pulse"></span>
              {language === 'pt' ? '20 Anos de História' : '20 Years of History'}
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 animate-slide-up leading-tight">
            {language === 'pt' ? (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ppc-yellow to-ppc-orange">Transformando</span>
                <br />
                <span className="text-white">O Brasil pela</span>
                <br />
                <span className="text-ppc-yellow font-extrabold">Cultura</span>
              </>
            ) : (
              <>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-ppc-yellow to-ppc-orange">Transforming</span>
                <br />
                <span className="text-white">Brazil through</span>
                <br />
                <span className="text-ppc-yellow font-extrabold">Culture</span>
              </>
            )}
          </h1>
          
          {/* Quote Block */}
          <div className="relative max-w-4xl mx-auto animate-fade-in">
            <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border-l-4 border-gradient-to-b from-ppc-yellow to-ppc-magenta" style={{ borderLeftColor: '#F59E0B' }}>
              <div className="absolute -top-4 -left-2 text-6xl md:text-8xl text-ppc-yellow/30 font-serif leading-none">"</div>
              <p className="text-lg md:text-xl lg:text-2xl text-white/95 italic font-light leading-relaxed relative z-10">
                {language === 'pt' 
                  ? 'Acreditamos que a transformação da sociedade brasileira se dará pela cultura. Por sua diversidade e riqueza cultural, o carnaval é, sem dúvida, um reflexo da multiplicidade de expressões e pensamentos de uma sociedade, tornando-se um agente importante para a democratização do conhecimento na Economia Criativa.'
                  : 'We believe that the transformation of Brazilian society will come through culture. Due to its diversity and cultural richness, carnival is undoubtedly a reflection of the multiplicity of expressions and thoughts of a society, becoming an important agent for the democratization of knowledge in the Creative Economy.'}
              </p>
              <div className="absolute -bottom-4 -right-2 text-6xl md:text-8xl text-ppc-yellow/30 font-serif leading-none rotate-180">"</div>
            </div>
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <button className="px-8 py-4 bg-gradient-to-r from-ppc-purple to-ppc-magenta text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-ppc-purple/50 transition-all duration-300 transform hover:-translate-y-1">
              {language === 'pt' ? 'Nossos Projetos' : 'Our Projects'}
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full backdrop-blur-md hover:bg-white/10 transition-all duration-300">
              {language === 'pt' ? 'Entre em Contato' : 'Get in Touch'}
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none" 
            className="relative block w-full h-[60px] sm:h-[100px]"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V56.44Z" 
              className="fill-gray-50"
            ></path>
          </svg>
        </div>
      </section>
      
      {/* Missão, Visão e Valores Section */}
      <section 
        id="mission" 
        className={`py-24 px-4 relative transition-all duration-1000 ${
          isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(249, 250, 251, 0.9)), url(${carnivalPattern})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-gradient-to-r from-ppc-purple/10 to-ppc-magenta/10 rounded-full px-6 py-2 text-ppc-purple text-sm font-medium mb-4">
              {language === 'pt' ? 'Nossos Fundamentos' : 'Our Foundation'}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-center text-gradient mb-6">
              {language === 'pt' ? 'Missão, Visão e Valores' : 'Mission, Vision and Values'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Os pilares que guiam nossa jornada na transformação cultural do Brasil' 
                : 'The pillars that guide our journey in Brazil\'s cultural transformation'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Missão */}
            <Card className="group hover:shadow-2xl hover:shadow-ppc-purple/20 transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ppc-purple/5 to-ppc-magenta/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ppc-purple to-ppc-magenta flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Star size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-ppc-purple transition-colors">
                  {language === 'pt' ? 'Missão' : 'Mission'}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {language === 'pt' 
                    ? 'Transformar a sociedade brasileira por meio da economia criativa, valorizando artistas e promovendo a cultura popular.' 
                    : 'Transform Brazilian society through the creative economy, valuing artists and promoting popular culture.'}
                </p>
              </CardContent>
            </Card>
            
            {/* Visão */}
            <Card className="group hover:shadow-2xl hover:shadow-ppc-orange/20 transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ppc-orange/5 to-ppc-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ppc-orange to-ppc-yellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Globe size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-ppc-orange transition-colors">
                  {language === 'pt' ? 'Visão' : 'Vision'}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {language === 'pt' 
                    ? 'Ser um agente amplificador da riqueza cultural do país, iluminando a arte de seus fazedores e promovendo a democratização do seu acesso.' 
                    : 'To be an amplifying agent of the country\'s cultural wealth, illuminating the art of its creators and promoting the democratization of its access.'}
                </p>
              </CardContent>
            </Card>
            
            {/* Valores */}
            <Card className="group hover:shadow-2xl hover:shadow-ppc-green/20 transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-md border-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-ppc-green/5 to-ppc-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="pb-4 relative z-10">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ppc-green to-ppc-yellow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users size={32} className="text-white" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-ppc-green transition-colors">
                  {language === 'pt' ? 'Valores' : 'Values'}
                </CardTitle>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="space-y-3 text-gray-700">
                  {[
                    { pt: 'Criatividade', en: 'Creativity' },
                    { pt: 'Diversidade', en: 'Diversity' },
                    { pt: 'Acessibilidade', en: 'Accessibility' },
                    { pt: 'Sustentabilidade', en: 'Sustainability' }
                  ].map((value, index) => (
                    <div key={index} className="flex items-center text-lg">
                      <div className="w-2 h-2 bg-gradient-to-r from-ppc-green to-ppc-yellow rounded-full mr-3"></div>
                      {language === 'pt' ? value.pt : value.en}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quem Somos Section */}
      <section 
        id="about" 
        className={`py-20 px-4 bg-gray-100 transition-all duration-1000 ${
          isVisible('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <div className="flex items-center mb-6">
                <Users size={28} className="text-ppc-purple mr-3" />
                <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                  {language === 'pt' ? 'Quem Somos' : 'Who We Are'}
                </h2>
              </div>
              
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  {language === 'pt' 
                    ? 'Criado em 2005 com o intuito de reconhecer e valorizar os artistas anônimos do carnaval carioca, amplificando as suas vozes e intermediando a ascensão de suas carreiras profissionais, o Instituto Plumas & Paetês Cultural logo se tornou muito maior do que a premiação carnavalesca que lhe deu origem.' 
                    : 'Created in 2005 with the aim of recognizing and valuing the anonymous artists of Rio\'s carnival, amplifying their voices and mediating the rise of their professional careers, Instituto Plumas & Paetês Cultural soon became much bigger than the carnival award that gave rise to it.'}
                </p>
                
                <Collapsible 
                  open={isOpen} 
                  onOpenChange={setIsOpen}
                  className="space-y-4"
                >
                  <div className="text-gray-700">
                    <p className="mb-4">
                      {language === 'pt' 
                        ? 'Em pouco tempo, o Plumas & Paetês se transformou em um grande agregador cultural, tornando-se referência em ações afirmativas de caráter social, com atenção pioneira à atuação pública nas áreas ligadas à arte, ao entretenimento e ao espetáculo, especialmente no segmento carnaval.' 
                        : 'In a short time, Plumas & Paetês became a great cultural aggregator, becoming a reference in affirmative actions of a social nature, with pioneering attention to public action in the areas linked to art, entertainment and spectacle, especially in the carnival segment.'}
                    </p>
                  </div>
                  
                  <CollapsibleContent className="space-y-4">
                    <p>
                      {language === 'pt' 
                        ? 'Ao longo de sua trajetória, o Instituto tem atuado como um grande mediador cultural entre os artistas anônimos, a sociedade que consome seus diversos produtos e os governos que formulam políticas públicas de cultura.' 
                        : 'Throughout its trajectory, the Institute has acted as a great cultural mediator between anonymous artists, the society that consumes its various products and the governments that formulate public culture policies.'}
                    </p>
                    <p>
                      {language === 'pt' 
                        ? 'Sempre preocupado em dar visibilidade institucional à pluralidade de expressões artísticas genuinamente brasileiras, o Instituto promoveu diversas ações culturais em diversas cidades como Rio de Janeiro, Niterói, Maricá, Brasília, Cruz Alta e Vitória.'
                        : 'Always concerned with giving institutional visibility to the plurality of genuinely Brazilian artistic expressions, the Institute has promoted various cultural actions in several cities such as Rio de Janeiro, Niterói, Maricá, Brasília, Cruz Alta and Vitória.'}
                    </p>
                  </CollapsibleContent>
                  
                  <CollapsibleTrigger asChild>
                    <button className="text-ppc-purple hover:text-ppc-magenta font-medium flex items-center gap-1">
                      {isOpen 
                        ? (language === 'pt' ? 'Ler menos' : 'Read less') 
                        : (language === 'pt' ? 'Ler mais' : 'Read more')}
                    </button>
                  </CollapsibleTrigger>
                </Collapsible>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="shadow-xl rounded-2xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <img
                    src="/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png"
                    alt="Instituto Plumas e Paetês Cultural"
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
                <div className="shadow-xl rounded-2xl overflow-hidden transform -rotate-2 hover:rotate-0 transition-transform duration-500 mt-8">
                  <img
                    src={carnivalArtisan}
                    alt="Artesão trabalhando com plumas e paetês"
                    className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 hidden lg:block">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-ppc-purple to-ppc-magenta/80 backdrop-blur-sm flex flex-col items-center justify-center animate-float shadow-lg">
                  <span className="text-white font-bold text-2xl">20</span>
                  <span className="text-white/90 text-sm">Anos</span>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 hidden lg:block">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ppc-orange to-ppc-yellow/80 backdrop-blur-sm flex items-center justify-center shadow-lg">
                  <Star size={24} className="text-white animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section 
        id="team" 
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible('team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {translate("equipe")}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Conheça quem faz o Instituto Plumas & Paetês acontecer'
                : 'Meet the people who make Instituto Plumas & Paetês happen'}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 border-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-64 md:h-auto">
                  <img
                    src={joseAntonio}
                    alt="José Antonio Rodrigues Filho"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <CardContent className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-gray-50">
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    José Antonio Rodrigues Filho
                  </h3>
                  <div className="space-y-2 mb-6">
                    <p className="text-lg text-ppc-purple font-semibold">
                      {translate("fundador")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-ppc-purple/10 text-ppc-purple rounded-full text-sm font-medium">
                        {translate("produtor")}
                      </span>
                      <span className="px-3 py-1 bg-ppc-magenta/10 text-ppc-magenta rounded-full text-sm font-medium">
                        {translate("estilista")}
                      </span>
                      <span className="px-3 py-1 bg-ppc-orange/10 text-ppc-orange rounded-full text-sm font-medium">
                        {translate("criadorPremio")}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {language === 'pt' 
                      ? 'Visionário e apaixonado pela cultura popular brasileira, José Antonio fundou o Instituto em 2005 com o objetivo de dar visibilidade aos artífices anônimos do carnaval carioca. Sua dedicação transformou o Prêmio Plumas & Paetês Cultural em uma das premiações mais respeitadas do segmento carnavalesco.'
                      : 'Visionary and passionate about Brazilian popular culture, José Antonio founded the Institute in 2005 with the goal of giving visibility to the anonymous artisans of Rio\'s carnival. His dedication transformed the Plumas & Paetês Cultural Award into one of the most respected awards in the carnival segment.'}
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/plumasepaetescultural/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-ppc-purple hover:bg-ppc-purple/80 text-white transition-colors"
                    >
                      <Instagram size={20} />
                    </a>
                    <a
                      href="https://www.facebook.com/plumasepaetescultural/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-ppc-magenta hover:bg-ppc-magenta/80 text-white transition-colors"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Linha do Tempo / Projetos Section */}
      <section 
        id="timeline" 
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <CalendarDays size={28} className="text-ppc-purple mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient">
              {language === 'pt' ? 'Nossos Projetos' : 'Our Projects'}
            </h2>
          </div>

          <Carousel 
            opts={{
              align: "center",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {[
                {
                  title: language === 'pt' ? 'Prêmio Plumas & Paetês Cultural' : 'Plumas & Paetês Cultural Award',
                  description: language === 'pt' 
                    ? 'Reconhecimento aos artistas anônimos do carnaval carioca' 
                    : 'Recognition of anonymous artists from Rio\'s carnival',
                  image: "/lovable-uploads/7d37df1b-46e4-421f-a18a-3e24655fdf28.png",
                },
                {
                  title: language === 'pt' ? 'Oficinas de Capacitação' : 'Training Workshops',
                  description: language === 'pt' 
                    ? 'Capacitação e gestão artística para profissionais' 
                    : 'Training and artistic management for professionals',
                  image: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
                },
                {
                  title: language === 'pt' ? 'Revista Plumas e Paetês Cultural' : 'Plumas e Paetês Cultural Magazine',
                  description: language === 'pt' 
                    ? 'Publicação sobre arte e cultura brasileira' 
                    : 'Publication about Brazilian art and culture',
                  image: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png",
                },
                {
                  title: language === 'pt' ? 'Produção de Espetáculos' : 'Show Production',
                  description: language === 'pt' 
                    ? 'Espetáculos musicais e culturais' 
                    : 'Musical and cultural shows',
                  image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
                },
                {
                  title: language === 'pt' ? 'Projetos de Lei' : 'Legislative Projects',
                  description: language === 'pt' 
                    ? 'Iniciativas legislativas em prol da cultura' 
                    : 'Legislative initiatives in favor of culture',
                  image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
                }
              ].map((project, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden h-full">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                        />
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{project.title}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* Timeline Section */}
      <section 
        id="timeline" 
        className={`py-20 px-4 bg-white transition-all duration-1000 ${
          isVisible('timeline') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {language === 'pt' ? 'Nossa História' : 'Our History'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Duas décadas de dedicação à cultura carnavalesca brasileira'
                : 'Two decades of dedication to Brazilian carnival culture'}
            </p>
          </div>
          <Timeline />
        </div>
      </section>

      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        className={`py-20 px-4 bg-gray-50 transition-all duration-1000 ${
          isVisible('testimonials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-4">
              {language === 'pt' ? 'Depoimentos' : 'Testimonials'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'O que dizem nossos parceiros e premiados'
                : 'What our partners and award winners say'}
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* Recognition and Partnerships Section */}
      <section 
        id="recognition" 
        className={`py-20 px-4 bg-gray-100 transition-all duration-1000 ${
          isVisible('recognition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gradient-to-r from-ppc-purple/10 to-ppc-magenta/10 rounded-full px-6 py-2 text-ppc-purple text-sm font-medium mb-4">
              {language === 'pt' ? 'Conquistas e Parcerias' : 'Achievements and Partnerships'}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gradient mb-6">
              {language === 'pt' ? 'Reconhecimentos e Parcerias' : 'Recognition and Partnerships'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {language === 'pt' 
                ? 'Nosso trabalho reconhecido por instituições nacionais e internacionais' 
                : 'Our work recognized by national and international institutions'}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
            <div className="lg:w-1/2">
              <img
                src="/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png"
                alt="Cerimônia de premiação"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-ppc-purple">
                <h3 className="text-2xl font-bold mb-3 text-ppc-purple">
                  {language === 'pt' ? 'Parceria com OEI' : 'Partnership with OEI'}
                </h3>
                <p className="text-gray-700 text-lg">
                  {language === 'pt' 
                    ? 'Desde 2012, parceria estratégica com a Organização dos Estados Ibero-americanos para promover a cultura e educação.' 
                    : 'Since 2012, strategic partnership with the Organization of Ibero-American States to promote culture and education.'}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-ppc-orange">
                <h3 className="text-2xl font-bold mb-3 text-ppc-orange">
                  {language === 'pt' ? 'Diploma Heloneida Studart (2015)' : 'Heloneida Studart Diploma (2015)'}
                </h3>
                <p className="text-gray-700 text-lg">
                  {language === 'pt' 
                    ? 'Reconhecimento oficial pela valorização da mulher na cultura brasileira e promoção da igualdade de gênero.' 
                    : 'Official recognition for valuing women in Brazilian culture and promoting gender equality.'}
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-l-4 border-ppc-green">
                <h3 className="text-2xl font-bold mb-3 text-ppc-green">
                  {language === 'pt' ? 'Prêmios Culturais' : 'Cultural Awards'}
                </h3>
                <p className="text-gray-700 text-lg">
                  {language === 'pt' 
                    ? 'Múltiplos reconhecimentos por projetos culturais inovadores e impacto social na comunidade artística.' 
                    : 'Multiple recognitions for innovative cultural projects and social impact in the artistic community.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section 
        id="map" 
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible('map') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-center mb-12">
            <Globe size={28} className="text-ppc-purple mr-3" />
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gradient">
              {language === 'pt' ? 'Onde Atuamos' : 'Where We Operate'}
            </h2>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14933494.268517808!2d-61.326662447838415!3d-15.869345192072825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9c59c7ebcc28cf%3A0x295a1506f2293e63!2sBrasil!5e0!3m2!1spt-BR!2sbr!4v1650338983051!5m2!1spt-BR!2sbr"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute' }}
                allowFullScreen
                loading="lazy"
                title="Mapa de atuação"
              ></iframe>
            </div>
            <div className="mt-6 flex flex-wrap gap-4 justify-center">
              {[
                { city: 'Rio de Janeiro', color: 'bg-ppc-purple' },
                { city: 'Niterói', color: 'bg-ppc-magenta' },
                { city: 'Maricá', color: 'bg-ppc-orange' },
                { city: 'Brasília', color: 'bg-ppc-yellow' },
                { city: 'Cruz Alta', color: 'bg-ppc-green' },
                { city: 'Vitória', color: 'bg-blue-500' }
              ].map((location, index) => (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <span className={`w-3 h-3 rounded-full ${location.color}`}></span>
                      <span>{location.city}</span>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{location.city}</h4>
                        <p className="text-sm">
                          {language === 'pt' 
                            ? 'Projetos culturais e atividades realizadas pelo Instituto Plumas e Paetês Cultural.' 
                            : 'Cultural projects and activities carried out by Instituto Plumas e Paetês Cultural.'}
                        </p>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Integration Section */}
      <section 
        id="social" 
        className={`py-20 px-4 bg-gray-100 transition-all duration-1000 ${
          isVisible('social') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            {language === 'pt' ? 'Conecte-se Conosco' : 'Connect With Us'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-ppc-purple flex items-center">
                <Instagram className="mr-2" size={24} />
                Instagram
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {Array(6).fill(0).map((_, i) => (
                  <div 
                    key={i} 
                    className="aspect-square bg-gray-200 rounded overflow-hidden"
                  >
                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-ppc-purple hover:text-ppc-magenta font-medium"
                >
                  @plumasepaetescultural
                </a>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4 text-ppc-purple flex items-center">
                <Facebook className="mr-2" size={24} />
                Facebook
              </h3>
              <p className="text-gray-700 mb-4">
                {language === 'pt' 
                  ? 'Siga nossa página para acompanhar notícias, eventos e novidades do Instituto Plumas e Paetês Cultural.' 
                  : 'Follow our page to keep up with news, events and updates from Instituto Plumas e Paetês Cultural.'}
              </p>
              <div className="text-center">
                <a 
                  href="https://www.facebook.com/plumasepaetescultural" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-ppc-purple hover:bg-ppc-magenta text-white font-medium py-2 px-4 rounded transition-colors"
                >
                  {language === 'pt' ? 'Visitar Facebook' : 'Visit Facebook'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sobre;
