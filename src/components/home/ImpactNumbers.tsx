import { useEffect, useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface StatRow {
  id: string;
  key: string;
  value: number;
  label_pt: string;
  label_en: string;
  display_order: number;
}

const AnimatedNumber = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done) {
          setDone(true);
          const duration = 1600;
          const steps = 50;
          const inc = target / steps;
          let cur = 0;
          const t = setInterval(() => {
            cur += inc;
            if (cur >= target) { setCount(target); clearInterval(t); }
            else setCount(Math.floor(cur));
          }, duration / steps);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, done]);

  return <span ref={ref} className="tabular-nums">{count.toLocaleString('pt-BR')}</span>;
};

const ImpactNumbers = () => {
  const { language } = useLanguage();

  const { data: stats = [] } = useQuery<StatRow[]>({
    queryKey: ["award_stats", "home"],
    queryFn: async () => {
      const { data } = await supabase
        .from("award_stats")
        .select("*")
        .order("display_order");
      return (data as StatRow[]) ?? [];
    },
  });

  // Only show metrics that have real, non-zero values
  const visible = stats.filter((s) => s.value && s.value > 0).slice(0, 6);

  if (visible.length === 0) return null;

  return (
    <section className="py-20 md:py-24 bg-primary text-primary-foreground" aria-labelledby="impact-heading">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-12">
          <div className="lg:col-span-5">
            <p className="uppercase tracking-[0.25em] text-xs text-secondary mb-4 font-medium">
              {language === 'pt' ? '— Impacto em duas décadas' : '— Two decades of impact'}
            </p>
            <h2 id="impact-heading" className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
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

        <div className="border-t border-primary-foreground/20">
          <dl className={`grid grid-cols-2 md:grid-cols-3 ${visible.length >= 6 ? 'lg:grid-cols-6' : visible.length === 5 ? 'lg:grid-cols-5' : visible.length === 4 ? 'lg:grid-cols-4' : ''} divide-x divide-primary-foreground/15`}>
            {visible.map((stat) => (
              <div key={stat.id} className="py-8 px-4 first:pl-0">
                <dd>
                  <div className="font-serif text-4xl md:text-5xl text-secondary mb-3 font-semibold">
                    <AnimatedNumber target={stat.value} />
                  </div>
                  <dt className="text-sm text-primary-foreground/85 leading-snug">
                    {language === 'pt' ? stat.label_pt : stat.label_en}
                  </dt>
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
