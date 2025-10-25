import { Target, Eye, Heart } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  expandedContent: string;
  readMoreText: string;
  readLessText: string;
}

const Card = ({ icon, title, description, expandedContent, readMoreText, readLessText }: CardProps) => {
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
        {isExpanded ? readLessText : readMoreText}
      </button>
    </div>
  );
};

const MissionCards = () => {
  const { translate } = useLanguage();
  
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold mb-4">{translate('nossosPilares')}</h2>
          <p className="text-xl text-gray-600">
            {translate('nossosPilaresDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card
            icon={<Target className="h-12 w-12" />}
            title={translate('missaoTitle')}
            description={translate('missaoCardDesc')}
            expandedContent={translate('missaoCardExpanded')}
            readMoreText={translate('lerMais')}
            readLessText={translate('verMenos')}
          />
          <Card
            icon={<Eye className="h-12 w-12" />}
            title={translate('visaoCardTitle')}
            description={translate('visaoCardDesc')}
            expandedContent={translate('visaoCardExpanded')}
            readMoreText={translate('lerMais')}
            readLessText={translate('verMenos')}
          />
          <Card
            icon={<Heart className="h-12 w-12" />}
            title={translate('valoresCardTitle')}
            description={translate('valoresCardDesc')}
            expandedContent={translate('valoresCardExpanded')}
            readMoreText={translate('lerMais')}
            readLessText={translate('verMenos')}
          />
        </div>
      </div>
    </section>
  );
};

export default MissionCards;
