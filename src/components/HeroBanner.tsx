import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BannerSlide {
  image: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
  link?: string;
}

const slides: BannerSlide[] = [
  {
    image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
    titlePt: "19º Prêmio Plumas & Paetês",
    titleEn: "19th Plumas & Paetês Award",
    descriptionPt: "Celebrando os talentos do carnaval brasileiro",
    descriptionEn: "Celebrating Brazilian carnival talents",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
    titlePt: "Cerimônia de Premiação 2024",
    titleEn: "2024 Award Ceremony",
    descriptionPt: "Uma noite inesquecível de reconhecimento artístico",
    descriptionEn: "An unforgettable night of artistic recognition",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
    titlePt: "20 Anos Transformando Vidas",
    titleEn: "20 Years Transforming Lives",
    descriptionPt: "Duas décadas de cultura, arte e inclusão social",
    descriptionEn: "Two decades of culture, art and social inclusion",
    link: "/sobre"
  },
  {
    image: "/lovable-uploads/premio-20-poster-1.png",
    titlePt: "20º Prêmio Plumas & Paetês Cultural",
    titleEn: "20th Plumas & Paetês Cultural Award",
    descriptionPt: "Troféu em homenagem à Maria Augusta (in memoriam) - 10 de Novembro",
    descriptionEn: "Trophy in honor of Maria Augusta (in memoriam) - November 10th",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/premio-20-poster-2.png",
    titlePt: "Homenagem à Maria Augusta",
    titleEn: "Tribute to Maria Augusta",
    descriptionPt: "Teatro Carlos Gomes - Segunda às 18h",
    descriptionEn: "Carlos Gomes Theater - Monday at 6pm",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/premio-20-poster-3.png",
    titlePt: "20º Prêmio - 10 de Novembro",
    titleEn: "20th Award - November 10th",
    descriptionPt: "Praça Tiradentes - Centro, Rio de Janeiro",
    descriptionEn: "Tiradentes Square - Downtown, Rio de Janeiro",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/edicao-2005-robert-clovis.jpg",
    titlePt: "1ª Edição 2005 - Homenagem a Clovis Bornay",
    titleEn: "1st Edition 2005 - Tribute to Clovis Bornay",
    descriptionPt: "O início de uma história de reconhecimento ao carnaval",
    descriptionEn: "The beginning of a story of carnival recognition",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/edicao-2005-trofeu.jpg",
    titlePt: "Troféu Plumas de Destaque 2005",
    titleEn: "2005 Outstanding Feathers Trophy",
    descriptionPt: "Carnaval Carioca 2005 - GRES São Clemente",
    descriptionEn: "Rio Carnival 2005 - GRES São Clemente",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/edicao-2005-marcela-xango.jpg",
    titlePt: "Premiação 2005 - Fantasia de Destaque",
    titleEn: "2005 Award - Outstanding Costume",
    descriptionPt: "Reconhecendo a arte e criatividade do carnaval",
    descriptionEn: "Recognizing carnival art and creativity",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/edicao-2005-m-leroy.jpg",
    titlePt: "Momentos Especiais da 1ª Edição",
    titleEn: "Special Moments from 1st Edition",
    descriptionPt: "Celebrando os talentos do carnaval carioca",
    descriptionEn: "Celebrating Rio carnival talents",
    link: "/edicoes"
  },
  {
    image: "/lovable-uploads/edicao-2005-tania.jpg",
    titlePt: "Premiados 2005",
    titleEn: "2005 Award Winners",
    descriptionPt: "Uma noite inesquecível de reconhecimento",
    descriptionEn: "An unforgettable night of recognition",
    link: "/edicoes"
  }
];

const HeroBanner = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <section className="relative w-full h-[400px] md:h-[600px] overflow-hidden group">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-contain bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30" />
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
              {language === 'pt' ? currentSlideData.titlePt : currentSlideData.titleEn}
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 animate-fade-in">
              {language === 'pt' ? currentSlideData.descriptionPt : currentSlideData.descriptionEn}
            </p>
            {currentSlideData.link && (
              <a
                href={currentSlideData.link}
                className="inline-block px-6 py-3 bg-carnival-gold text-gray-900 font-semibold rounded-full hover:bg-carnival-gold/90 transition-all duration-300 hover:scale-105"
              >
                {language === 'pt' ? 'Saiba Mais' : 'Learn More'}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Slide anterior"
      >
        <ChevronLeft size={24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
        aria-label="Próximo slide"
      >
        <ChevronRight size={24} className="text-white" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-carnival-gold w-8'
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroBanner;
