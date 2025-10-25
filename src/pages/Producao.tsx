import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Award, Users, Lightbulb, CheckCircle, ArrowRight, Instagram, Facebook, Mail, Phone } from "lucide-react";

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
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">{translate("producaoEventos")}</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
              {language === 'pt' ? 'Produção de Eventos' : 'Event Production'}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in">
              {language === 'pt'
                ? "Transformamos ideias em experiências culturais inesquecíveis"
                : "We transform ideas into unforgettable cultural experiences"}
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("nossosServicos")}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {language === 'pt'
                ? "Soluções completas para produção cultural e eventos de excelência"
                : "Complete solutions for cultural production and excellence events"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-carnival-purple to-carnival-magenta flex items-center justify-center mb-6">
                  <service.icon className="text-white" size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-carnival-green flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{translate("portfolio")}</h2>
            <p className="text-xl text-gray-600">
              {language === 'pt'
                ? "Conheça alguns dos projetos que realizamos com excelência"
                : "Discover some of the projects we've accomplished with excellence"}
            </p>
          </div>
          
          <div className="space-y-12">
            {portfolio.map((project, index) => (
              <div 
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center bg-gray-50 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow`}
              >
                <div className="lg:w-1/2 aspect-video lg:aspect-square">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="inline-block px-4 py-1 bg-carnival-gold/20 text-carnival-purple font-semibold rounded-full mb-4">
                    {project.year}
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 carnival-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === 'pt' ? 'Vamos Criar Juntos?' : 'Let\'s Create Together?'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {language === 'pt'
              ? "Entre em contato e descubra como podemos transformar seu projeto em realidade"
              : "Get in touch and discover how we can turn your project into reality"}
          </p>
          <a
            href="/contato"
            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-carnival-magenta rounded-full hover:bg-white/90 transition-colors font-bold text-lg shadow-2xl"
          >
            {translate("entrarContato")}
            <ArrowRight size={24} />
          </a>
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

export default Producao;
