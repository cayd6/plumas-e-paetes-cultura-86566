import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface BannerSlide {
  image: string;
  titlePt: string;
  titleEn: string;
  descriptionPt: string;
  descriptionEn: string;
}

const slides: BannerSlide[] = [
  {
    image: "/lovable-uploads/edicao-2005-robert-clovis.jpg",
    titlePt: "1ª Edição 2005 - Homenagem a Clovis Bornay",
    titleEn: "1st Edition 2005 - Tribute to Clovis Bornay",
    descriptionPt: "O início de uma história de reconhecimento ao carnaval",
    descriptionEn: "The beginning of a story of carnival recognition"
  },
  {
    image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
    titlePt: "Cerimônia de Premiação 2024",
    titleEn: "2024 Award Ceremony",
    descriptionPt: "Uma noite inesquecível de reconhecimento artístico",
    descriptionEn: "An unforgettable night of artistic recognition"
  },
  {
    image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png",
    titlePt: "19º Prêmio Plumas & Paetês",
    titleEn: "19th Plumas & Paetês Award",
    descriptionPt: "Celebrando os talentos do carnaval brasileiro",
    descriptionEn: "Celebrating Brazilian carnival talents"
  },
  {
    image: "/lovable-uploads/edicao-2005-marcela-xango.jpg",
    titlePt: "Momentos Históricos",
    titleEn: "Historical Moments",
    descriptionPt: "Registros preciosos de nossa trajetória cultural",
    descriptionEn: "Precious records of our cultural journey"
  }
];

const GalleryHeroBanner = () => {
  const { language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
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
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
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
            <p className="text-lg md:text-xl text-white/90 animate-fade-in">
              {language === 'pt' ? currentSlideData.descriptionPt : currentSlideData.descriptionEn}
            </p>
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

export default GalleryHeroBanner;
