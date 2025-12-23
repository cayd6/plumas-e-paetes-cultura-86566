import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItem {
  value: number;
  suffix?: string;
  labelPt: string;
  labelEn: string;
}

const stats: StatItem[] = [
  { value: 20, labelPt: "Anos de História", labelEn: "Years of History" },
  { value: 1400, suffix: "+", labelPt: "Artistas Premiados", labelEn: "Artists Awarded" },
  { value: 51, labelPt: "Categorias Profissionais", labelEn: "Professional Categories" },
  { value: 1000, suffix: "+", labelPt: "Troféus Distribuídos", labelEn: "Trophies Awarded" },
];

const AnimatedNumber = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
          
          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString('pt-BR')}{suffix}
    </span>
  );
};

const ImpactNumbers = () => {
  const { language } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            {language === 'pt' ? 'Impacto em Números' : 'Impact in Numbers'}
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            {language === 'pt' 
              ? 'Duas décadas de transformação cultural e reconhecimento artístico' 
              : 'Two decades of cultural transformation and artistic recognition'}
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm"
            >
              <div className="text-3xl md:text-5xl font-bold text-secondary mb-2">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-primary-foreground/90 text-sm md:text-base font-medium">
                {language === 'pt' ? stat.labelPt : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
