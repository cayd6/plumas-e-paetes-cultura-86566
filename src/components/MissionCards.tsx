import { Target, Eye, Heart } from "lucide-react";
import { useState } from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedContent: string;
}

const Card = ({ icon, title, description, expandedContent }: CardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="flex justify-center mb-6">
        <div className="p-4 rounded-full bg-carnival-purple/10 text-carnival-purple">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-bold text-center mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      {isExpanded && (
        <p className="text-gray-600 leading-relaxed mb-4 animate-fade-in">
          {expandedContent}
        </p>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-carnival-purple hover:text-carnival-purple/80 font-medium transition-colors"
      >
        {isExpanded ? "Ver Menos" : "Ler Mais"}
      </button>
    </div>
  );
};

const MissionCards = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">Nossos Pilares</h2>
          <p className="text-xl text-gray-600">
            Transformando vidas através da cultura e do carnaval
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={<Target className="h-12 w-12" />}
            title="Missão"
            description="Transformar a sociedade brasileira por meio da economia criativa."
            expandedContent="Iluminamos os bastidores da economia criativa, estimulando a renda de seus fazedores e democratizando o acesso à arte por eles produzida."
          />
          <Card
            icon={<Eye className="h-12 w-12" />}
            title="Visão"
            description="Ser um agente amplificador da riqueza cultural do país, iluminando a arte de seus fazedores e promovendo a democratização do seu acesso."
            expandedContent="Expandimos constantemente nossa atuação, desenvolvendo eventos e projetos culturais em diversas regiões do país."
          />
          <Card
            icon={<Heart className="h-12 w-12" />}
            title="Valores"
            description="Criatividade, diversidade, acessibilidade e sustentabilidade."
            expandedContent="Incansáveis em nossa missão de transformar a sociedade brasileira por meio da cultura e economia criativa."
          />
        </div>
      </div>
    </section>
  );
};

export default MissionCards;
