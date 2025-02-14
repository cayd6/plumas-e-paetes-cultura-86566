import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";

const Eventos = () => {
  const eventos = [
    {
      id: 1,
      titulo: "Carnaval 2024",
      data: "10-13 Fevereiro, 2024",
      imagem: "https://source.unsplash.com/random/1200x800/?carnival,parade",
      descricao: "O maior carnaval cultural da região, com mais de 1000 participantes.",
      video: "https://www.youtube.com/embed/your-video-id"
    },
    {
      id: 2,
      titulo: "Festival Cultural",
      data: "15 Janeiro, 2024",
      imagem: "https://source.unsplash.com/random/1200x800/?carnival,festival",
      descricao: "Festival de música e dança que celebra nossa cultura.",
    },
    // Add more events as needed
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">Nossos Eventos</h1>
          <div className="space-y-12">
            {eventos.map((evento) => (
              <div key={evento.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="aspect-video">
                  <img 
                    src={evento.imagem} 
                    alt={evento.titulo}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="text-sm text-ppc-purple mb-2">{evento.data}</div>
                  <h2 className="text-2xl font-semibold mb-4">{evento.titulo}</h2>
                  <p className="text-gray-600 mb-6">{evento.descricao}</p>
                  {evento.video && (
                    <div className="aspect-video mt-6">
                      <iframe
                        src={evento.video}
                        className="w-full h-full rounded-lg"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eventos;
