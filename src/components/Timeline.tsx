import { CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const Timeline = () => {
  const { language } = useLanguage();

  const events: TimelineEvent[] = [
    {
      year: "2025",
      title: language === 'pt' ? "20ª Edição do Prêmio" : "20th Award Edition",
      description: language === 'pt' 
        ? "Celebramos duas décadas de dedicação à cultura carnavalesca com a maior edição já realizada."
        : "We celebrate two decades of dedication to carnival culture with the largest edition ever held.",
      image: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png"
    },
    {
      year: "2020",
      title: language === 'pt' ? "Expansão Nacional" : "National Expansion",
      description: language === 'pt'
        ? "Ampliação das atividades para diversas cidades brasileiras, promovendo a cultura do carnaval em todo o país."
        : "Expansion of activities to several Brazilian cities, promoting carnival culture throughout the country.",
      image: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png"
    },
    {
      year: "2015",
      title: language === 'pt' ? "Diploma Heloneida Studart" : "Heloneida Studart Diploma",
      description: language === 'pt'
        ? "Reconhecimento pela Comissão de Cultura da ALERJ pelo destaque na promoção da cultura no estado."
        : "Recognition by the ALERJ Culture Commission for prominence in promoting culture in the state.",
      image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png"
    },
    {
      year: "2012",
      title: language === 'pt' ? "Parceria OEI" : "OEI Partnership",
      description: language === 'pt'
        ? "Chancelamento pela Organização dos Estados Ibero-americanos, consolidando nossa atuação internacional."
        : "Endorsement by the Organization of Ibero-American States, consolidating our international presence.",
      image: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png"
    },
    {
      year: "2005",
      title: language === 'pt' ? "Fundação do Instituto" : "Institute Foundation",
      description: language === 'pt'
        ? "Início das atividades com o objetivo de valorizar e preservar a cultura carnavalesca brasileira."
        : "Beginning of activities with the goal of valuing and preserving Brazilian carnival culture.",
      image: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png"
    }
  ];

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-carnival-purple via-carnival-magenta to-carnival-gold" />
      
      <div className="space-y-12">
        {events.map((event, index) => (
          <div key={index} className="relative flex gap-8 group">
            {/* Timeline dot */}
            <div className="relative z-10 flex-shrink-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-carnival-purple to-carnival-magenta flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <CheckCircle2 className="text-white" size={32} />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-carnival-gold text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                {event.year}
              </div>
            </div>
            
            {/* Content card */}
            <div className="flex-1 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {event.image && (
                  <div className="md:col-span-1">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover min-h-[200px]"
                    />
                  </div>
                )}
                <div className={`p-6 ${event.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{event.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
