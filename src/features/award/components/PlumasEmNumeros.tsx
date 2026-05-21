import { Trophy, Users, Award, Star, Medal, School, Sparkles, Building2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { useAwardData } from "@/hooks/useAwardData";

const AnimatedNumber = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
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

  return <span ref={ref}>{count.toLocaleString('pt-BR')}{suffix}</span>;
};

const iconMap: Record<string, any> = {
  School: School,
  Trophy: Trophy,
  Award: Award,
  Star: Star,
  Medal: Medal,
  Users: Users,
  Building2: Building2,
  Sparkles: Sparkles,
};

const PlumasEmNumeros = () => {
  const { language } = useLanguage();
  const { stats, professionals, schools, curiosities, isLoading } = useAwardData();

  // Get stat values
  const getStatValue = (key: string) => {
    const stat = stats.find(s => s.key === key);
    return stat?.value || 0;
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-yellow-900";
    if (rank === 2) return "bg-gradient-to-br from-gray-300 to-gray-500 text-gray-800";
    if (rank >= 3 && rank <= 5) return "bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100";
    return "bg-gradient-to-br from-ppc-purple to-ppc-magenta text-white";
  };

  // Group professionals by rank
  const groupedProfessionals = professionals.reduce((acc, prof) => {
    const existing = acc.find(g => g.rank === prof.rank);
    if (existing) {
      existing.names.push(prof.name);
    } else {
      acc.push({ rank: prof.rank, names: [prof.name], awards: prof.awards_count });
    }
    return acc;
  }, [] as { rank: number; names: string[]; awards: number }[]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-ppc-purple/90 to-gray-900 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20px 20px, white 2px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
            <Sparkles className="w-5 h-5 text-ppc-gold" />
            <span className="font-semibold text-white">
              {language === 'pt' ? 'Recordes e Conquistas' : 'Records and Achievements'}
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            PLUMAS EM NÚM3R05
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            {language === 'pt' 
              ? 'Conheça os recordes e o tamanho do sucesso do Plumas e seus premiados'
              : 'Discover the records and the magnitude of Plumas\' success and its award winners'}
          </p>
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Trophy className="w-12 h-12 text-ppc-gold mx-auto mb-3" />
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedNumber end={getStatValue('trophies')} />
            </div>
            <p className="text-white/80 font-medium">
              {language === 'pt' ? 'Troféus Distribuídos' : 'Trophies Awarded'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Users className="w-12 h-12 text-ppc-magenta mx-auto mb-3" />
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedNumber end={getStatValue('winners')} />
            </div>
            <p className="text-white/80 font-medium">
              {language === 'pt' ? 'Premiados' : 'Award Winners'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Award className="w-12 h-12 text-ppc-orange mx-auto mb-3" />
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedNumber end={getStatValue('editions')} />
            </div>
            <p className="text-white/80 font-medium">
              {language === 'pt' ? 'Edições' : 'Editions'}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
            <School className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
              77
            </div>
            <p className="text-white/80 font-medium">
              {language === 'pt' ? 'Escolas Premiadas' : 'Awarded Schools'}
            </p>
          </div>
        </div>

        {/* Gender Distribution */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">👔</span>
            <span className="text-white font-bold text-lg">{getStatValue('men').toLocaleString('pt-BR')}</span>
            <span className="text-white/80">{language === 'pt' ? 'Homens' : 'Men'}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">👗</span>
            <span className="text-white font-bold text-lg">{getStatValue('women').toLocaleString('pt-BR')}</span>
            <span className="text-white/80">{language === 'pt' ? 'Mulheres' : 'Women'}</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <span className="text-2xl">🏛️</span>
            <span className="text-white font-bold text-lg">{getStatValue('institutions')}</span>
            <span className="text-white/80">{language === 'pt' ? 'Instituições' : 'Institutions'}</span>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Top Profissionais */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Medal className="text-ppc-gold" />
              {language === 'pt' ? 'Top 10 Profissionais Mais Vitoriosos' : 'Top 10 Most Victorious Professionals'}
            </h3>
            <div className="space-y-4">
              {groupedProfessionals.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full ${getRankBadge(item.rank)} flex items-center justify-center font-bold text-sm flex-shrink-0`}>
                    {item.rank}º
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">
                      {item.names.join(', ')}
                    </div>
                    <div className="text-ppc-gold font-bold">
                      {item.awards} {language === 'pt' ? 'prêmios' : 'awards'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Escolas */}
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <School className="text-ppc-gold" />
              {language === 'pt' ? 'Top 10 Escolas Mais Premiadas' : 'Top 10 Most Awarded Schools'}
            </h3>
            <div className="space-y-3">
              {schools.map((escola, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full ${getRankBadge(escola.rank)} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                    {escola.rank}º
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-white font-medium">{escola.name}</span>
                    <span className="text-ppc-gold font-bold">
                      {escola.awards_count} {language === 'pt' ? 'prêmios' : 'awards'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curiosidades */}
        <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
            <Sparkles className="text-ppc-gold" />
            {language === 'pt' ? 'Curiosidades' : 'Fun Facts'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {curiosities.map((curiosidade, index) => {
              const IconComponent = iconMap[curiosidade.icon] || Star;
              return (
                <div 
                  key={index}
                  className="bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
                >
                  <IconComponent className="w-10 h-10 text-ppc-gold mb-4" />
                  <p className="text-white/90 leading-relaxed text-sm">
                    {language === 'pt' ? curiosidade.text_pt : curiosidade.text_en}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Images Gallery */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5">
            <img 
              src="/lovable-uploads/plumas-recordes-1.jpg" 
              alt="Plumas e Paetês Recordes"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5">
            <img 
              src="/lovable-uploads/plumas-recordes-2.jpg" 
              alt="Premiados Plumas e Paetês"
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlumasEmNumeros;
