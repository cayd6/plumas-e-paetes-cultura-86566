import { Quote, Star } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Testimonial {
  name: string;
  role: string;
  school?: string;
  content: string;
  image: string;
  rating: number;
}

const Testimonials = () => {
  const { language } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      name: "Maria Silva",
      role: language === 'pt' ? "Passista Premiada" : "Award-winning Samba Dancer",
      school: "Vila Isabel",
      content: language === 'pt'
        ? "O Instituto Plumas & Paetês é fundamental para o reconhecimento dos artistas do carnaval. Ser premiada aqui foi um dos momentos mais importantes da minha carreira."
        : "The Plumas & Paetês Institute is fundamental for recognizing carnival artists. Being awarded here was one of the most important moments of my career.",
      image: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png",
      rating: 5
    },
    {
      name: "João Santos",
      role: language === 'pt' ? "Artesão e Designer de Fantasias" : "Craftsman and Costume Designer",
      school: "Mangueira",
      content: language === 'pt'
        ? "As oficinas de capacitação oferecidas pelo instituto transformaram minha forma de trabalhar. Hoje consigo criar peças ainda mais elaboradas e técnicas."
        : "The training workshops offered by the institute transformed the way I work. Today I can create even more elaborate and technical pieces.",
      image: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png",
      rating: 5
    },
    {
      name: "Carlos Mendes",
      role: language === 'pt' ? "Presidente de Escola de Samba" : "Samba School President",
      school: "Beija-Flor",
      content: language === 'pt'
        ? "A parceria com o Instituto Plumas & Paetês tem sido essencial para a valorização dos profissionais da nossa escola. Um trabalho sério e comprometido com a cultura."
        : "The partnership with the Plumas & Paetês Institute has been essential for valuing the professionals of our school. Serious work committed to culture.",
      image: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png",
      rating: 5
    },
    {
      name: "Ana Paula Costa",
      role: language === 'pt' ? "Coreógrafa" : "Choreographer",
      school: "Salgueiro",
      content: language === 'pt'
        ? "O reconhecimento e a valorização dos artistas do carnaval promovidos pelo instituto são fundamentais para manter viva nossa tradição cultural."
        : "The recognition and appreciation of carnival artists promoted by the institute are fundamental to keeping our cultural tradition alive.",
      image: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png",
      rating: 5
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {testimonials.map((testimonial, index) => (
        <div 
          key={index}
          className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <img 
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-carnival-gold"
              />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 mb-1">{testimonial.name}</h4>
              <p className="text-carnival-purple font-semibold mb-1">{testimonial.role}</p>
              {testimonial.school && (
                <p className="text-sm text-gray-600">{testimonial.school}</p>
              )}
              <div className="flex gap-1 mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-carnival-gold text-carnival-gold" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 w-8 h-8 text-carnival-purple/20" />
            <p className="text-gray-700 leading-relaxed pl-6 italic">
              "{testimonial.content}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials;
