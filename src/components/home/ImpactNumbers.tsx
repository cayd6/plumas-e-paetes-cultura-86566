import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface StatItem {
  value: number;
  suffix?: string;
  labelPt: string;
  labelEn: string;
}

const stats: StatItem[] = [
  { value: 20, suffix: "+", labelPt: "Anos de atuação", labelEn: "Years active" },
  { value: 1400, suffix: "+", labelPt: "Profissionais reconhecidos", labelEn: "Professionals recognized" },
  { value: 19, labelPt: "Edições do Prêmio", labelEn: "Award editions" },
  { value: 15, suffix: "+", labelPt: "Revistas publicadas", labelEn: "Magazines published" },
  { value: 30, suffix: "+", labelPt: "Projetos e espetáculos", labelEn: "Projects and shows" },
  { value: 10, suffix: "+", labelPt: "Cidades alcançadas", labelEn: "Cities reached" },
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
          const duration = 1800;
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
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
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

  // Fallback elegante para métricas zeradas (estrutura CMS-ready):
  // se algum valor vier 0 do CMS no futuro, esconde a métrica em vez de mostrar "0".
  const visibleStats = stats.filter((s) => s.value > 0);

  return (
    <section className="py-20 md:py-24 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <div className="lg:col-span-5">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary mb-4 font-medium">
              {language === 'pt' ? '— Impacto em duas décadas' : '— Two decades of impact'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
              {language === 'pt'
                ? 'O carnaval como patrimônio, formação e economia.'
                : 'Carnival as heritage, training and economy.'}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-base md:text-lg text-primary-foreground/80 leading-relaxed">
              {language === 'pt'
                ? 'Construímos, há mais de vinte anos, uma rede de reconhecimento, memória e oportunidades para quem faz o carnaval acontecer nos bastidores — de aderecistas a carnavalescos, de mestres-sala a costureiras.'
                : 'For more than twenty years we have built a network of recognition, memory and opportunity for those who make carnival happen behind the scenes — from prop makers to designers, masters of ceremonies to seamstresses.'}
            </p>
          </div>
        </div>

        {/* Faixa editorial horizontal — sem cards isolados */}
        <div className="border-t border-primary-foreground/20">
          <dl className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-x divide-primary-foreground/15">
            {visibleStats.map((stat, i) => (
              <div key={i} className="py-8 px-4 first:pl-0">
                <dt className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-2">
                  {String(i + 1).padStart(2, '0')}
                </dt>
                <dd>
                  <div className="font-serif text-4xl md:text-5xl text-secondary mb-2 font-semibold">
                    <AnimatedNumber target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-sm text-primary-foreground/85 leading-snug">
                    {language === 'pt' ? stat.labelPt : stat.labelEn}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers;
