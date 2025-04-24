import { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
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
      <Navigation />
      <div className="pt-20">
        <LanguageControls />
      </div>
      
      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-ppc-purple via-ppc-magenta to-ppc-orange"
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="container mx-auto px-4 z-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-slide-up">
            {language === 'pt' ? 'Transformando a sociedade pela economia criativa' : 'Transforming society through creative economy'}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto animate-fade-in">
            {language === 'pt' 
              ? 'Desde 2005 valorizando os artistas e a cultura brasileira' 
              : 'Since 2005 valuing Brazilian artists and culture'}
          </p>
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
        className={`py-20 px-4 transition-all duration-1000 ${
          isVisible('mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gradient">
            {language === 'pt' ? 'Missão, Visão e Valores' : 'Mission, Vision and Values'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Missão */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 backdrop-blur-md bg-white/90">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ppc-purple to-ppc-magenta flex items-center justify-center mb-4">
                  <Star size={28} className="text-white" />
                </div>
                <CardTitle className="text-2xl">
                  {language === 'pt' ? 'Missão' : 'Mission'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {language === 'pt' 
                    ? 'Transformar a sociedade brasileira por meio da economia criativa.' 
                    : 'Transform Brazilian society through the creative economy.'}
                </p>
              </CardContent>
            </Card>
            
            {/* Visão */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 backdrop-blur-md bg-white/90">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ppc-orange to-ppc-yellow flex items-center justify-center mb-4">
                  <Star size={28} className="text-white" />
                </div>
                <CardTitle className="text-2xl">
                  {language === 'pt' ? 'Visão' : 'Vision'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  {language === 'pt' 
                    ? 'Ser um agente amplificador da riqueza cultural do país, iluminando a arte de seus fazedores e promovendo a democratização do seu acesso.' 
                    : 'To be an amplifying agent of the country\'s cultural wealth, illuminating the art of its creators and promoting the democratization of its access.'}
                </p>
              </CardContent>
            </Card>
            
            {/* Valores */}
            <Card className="hover:shadow-lg transition-all hover:-translate-y-1 backdrop-blur-md bg-white/90">
              <CardHeader className="pb-2">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ppc-green to-ppc-yellow flex items-center justify-center mb-4">
                  <Star size={28} className="text-white" />
                </div>
                <CardTitle className="text-2xl">
                  {language === 'pt' ? 'Valores' : 'Values'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>{language === 'pt' ? 'Criatividade' : 'Creativity'}</li>
                  <li>{language === 'pt' ? 'Diversidade' : 'Diversity'}</li>
                  <li>{language === 'pt' ? 'Acessibilidade' : 'Accessibility'}</li>
                  <li>{language === 'pt' ? 'Sustentabilidade' : 'Sustainability'}</li>
                </ul>
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
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2 order-2 md:order-1">
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
            
            <div className="md:w-1/2 order-1 md:order-2 relative">
              <div className="shadow-2xl rounded-lg overflow-hidden">
                <img
                  src="/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png"
                  alt="Instituto Plumas e Paetês Cultural"
                  className="w-full h-auto object-cover rounded-lg transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 hidden md:block">
                <div className="w-24 h-24 rounded-full bg-ppc-magenta/20 backdrop-blur-sm flex items-center justify-center animate-float">
                  <span className="text-ppc-magenta font-bold">20 Anos</span>
                </div>
              </div>
            </div>
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

      {/* Recognition and Partnerships Section */}
      <section 
        id="recognition" 
        className={`py-20 px-4 bg-gray-100 transition-all duration-1000 ${
          isVisible('recognition') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gradient">
            {language === 'pt' ? 'Reconhecimentos e Parcerias' : 'Recognition and Partnerships'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-ppc-purple">
                {language === 'pt' ? 'Parceria com OEI' : 'Partnership with OEI'}
              </h3>
              <p className="text-gray-700">
                {language === 'pt' 
                  ? 'Desde 2012, parceria com a Organização dos Estados Ibero-americanos.' 
                  : 'Since 2012, partnership with the Organization of Ibero-American States.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-ppc-orange">
                {language === 'pt' ? 'Diploma Heloneida Studart (2015)' : 'Heloneida Studart Diploma (2015)'}
              </h3>
              <p className="text-gray-700">
                {language === 'pt' 
                  ? 'Reconhecimento pela contribuição à cultura brasileira.' 
                  : 'Recognition for the contribution to Brazilian culture.'}
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-2 text-ppc-green">
                {language === 'pt' ? 'Outros Reconhecimentos' : 'Other Recognitions'}
              </h3>
              <p className="text-gray-700">
                {language === 'pt' 
                  ? 'Diversos prêmios e reconhecimentos pela atuação cultural.' 
                  : 'Various awards and recognitions for cultural activities.'}
              </p>
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/revistas" className="text-gray-400 hover:text-white transition-colors">{translate("revistas")}</a></li>
                <li><a href="/eventos" className="text-gray-400 hover:text-white transition-colors">{translate("eventos")}</a></li>
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
                  href="https://www.facebook.com/plumasepaetescultural" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
              <p className="text-gray-400 text-center mt-2">
                {language === 'pt' 
                  ? 'Siga-nos nas redes sociais para ficar por dentro das novidades!' 
                  : 'Follow us on social media to stay up to date!'}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a 
                    href="mailto:contato@plumasepaetescultural.com" 
                    className="hover:text-white transition-colors"
                  >
                    contato@plumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
                  <a 
                    href="https://wa.me/5521989392920" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +55 21 98939-2920
                  </a>
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

export default Sobre;
