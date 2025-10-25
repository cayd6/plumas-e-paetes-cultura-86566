import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  end: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const StatItem = ({ end, label, suffix = "+", prefix = "" }: StatItemProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-xl text-white/90">{label}</div>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-20 carnival-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <StatItem end={20} label="Edições do Prêmio" />
          <StatItem end={500} label="Artífices Premiados" />
          <StatItem end={15} label="Anos de Atuação" suffix="+" />
          <StatItem end={50} label="Parceiros Culturais" suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
