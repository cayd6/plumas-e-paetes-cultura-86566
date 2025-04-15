
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { BookOpen, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Revistas = () => {
  const { translate } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  
  const revista = {
    id: 3,
    titulo: "Edição 2010",
    capa: "/pages/revistas/2010/Revista_Plumas_e_Paetes-2010_page-0001.jpg",
    descricao: "Prêmio Plumas e Paetês: Homenagem aos artífices e profissionais do carnaval carioca."
  };

  // Animation effect on component mount
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className={`text-5xl font-bold text-center mb-4 text-gradient ${animate ? 'animate-fade-in' : 'opacity-0'}`}>
            {translate("revistas")}
          </h1>
          <p className={`text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto ${animate ? 'animate-fade-in' : 'opacity-0'}`} style={{animationDelay: '0.2s'}}>
            {translate("explorarRevistas")}
          </p>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem className="md:basis-full lg:basis-full">
                  <div className="p-1">
                    <Card className={`overflow-hidden transition-all duration-500 ${isHovered ? 'shadow-2xl shadow-purple-300/50 scale-[1.01]' : 'shadow-xl'}`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative overflow-hidden rounded-l-xl">
                          <Link to="/revista/2010" className="block">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
                            <img
                              src={revista.capa}
                              alt={revista.titulo}
                              className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                            />
                            <div className="absolute bottom-6 right-6 bg-purple-700 text-white px-4 py-2 rounded-full font-semibold z-20 transform rotate-[-8deg] shadow-lg">
                              {revista.titulo}
                            </div>
                          </Link>
                        </div>
                        
                        <div className="p-8 flex flex-col justify-between">
                          <div>
                            <CardTitle className="text-3xl mb-4 text-ppc-purple">
                              {revista.titulo}
                            </CardTitle>
                            <CardDescription className="text-lg mb-6">
                              {revista.descricao}
                            </CardDescription>
                            
                            <div className="space-y-4 mb-8">
                              <h3 className="font-medium text-gray-800">Destaques da edição:</h3>
                              <ul className="space-y-2">
                                <li className="flex items-center gap-2">
                                  <ChevronRight className="h-5 w-5 text-ppc-purple" />
                                  <span>Perfis dos vencedores</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <ChevronRight className="h-5 w-5 text-ppc-purple" />
                                  <span>História do carnaval carioca</span>
                                </li>
                                <li className="flex items-center gap-2">
                                  <ChevronRight className="h-5 w-5 text-ppc-purple" />
                                  <span>Galeria de fotos exclusivas</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                          
                          <div className="mt-auto">
                            <Link 
                              to="/revista/2010" 
                              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-ppc-purple to-ppc-magenta text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-purple-300/50 hover:translate-y-[-2px]"
                            >
                              {translate("lerMais")} <BookOpen className="ml-2 h-5 w-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <CarouselPrevious className="left-2 md:left-4" />
              <CarouselNext className="right-2 md:right-4" />
            </Carousel>
            
            <div className="text-center mt-12">
              <p className="text-gray-600">
                {translate("proximasEdicoes")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revistas;
