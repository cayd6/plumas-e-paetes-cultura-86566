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
            title="Nossa Missão"
            description="Promover a cultura do carnaval brasileiro, valorizando os artífices e mestres que preservam as tradições e inovam na arte carnavalesca."
            expandedContent="Através de eventos, premiações e publicações, criamos oportunidades para que talentos sejam reconhecidos e a economia criativa floresça em nossa comunidade."
          />
          <Card
            icon={<Eye className="h-12 w-12" />}
            title="Nossa Visão"
            description="Ser referência nacional na produção cultural de carnaval, reconhecidos pela excelência e compromisso com a preservação das tradições populares."
            expandedContent="Buscamos expandir nossa atuação, fortalecendo parcerias estratégicas e criando novos espaços para a expressão cultural brasileira."
          />
          <Card
            icon={<Heart className="h-12 w-12" />}
            title="Nossos Valores"
            description="Autenticidade cultural, respeito às tradições, inclusão social, excelência artística e transparência em todas as nossas ações."
            expandedContent="Acreditamos no poder transformador da cultura e na importância de valorizar cada pessoa que dedica sua vida à arte do carnaval."
          />
        </div>
      </div>
    </section>
  );
};

export default MissionCards;
