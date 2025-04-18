import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";

const Eventos = () => {
  const { translate } = useLanguage();
  const eventos = [
    {
      id: 1,
      titulo: translate("carnaval2024"),
      data: "10-13 Fevereiro, 2024",
      imagem: "https://source.unsplash.com/random/1200x800/?carnival,parade",
      descricao: translate("descricaoCarnaval"),
      video: "https://www.youtube.com/embed/your-video-id"
    },
    {
      id: 2,
      titulo: translate("festivalCultural"),
      data: "15 Janeiro, 2024",
      imagem: "https://source.unsplash.com/random/1200x800/?carnival,festival",
      descricao: translate("descricaoFestival"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">{translate("eventos")}</h1>
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
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/revistas" className="text-gray-400 hover:text-white transition-colors">{translate("revistas")}</a></li>
                <li><a href="/eventos" className="text-gray-400 hover:text-white transition-colors">{translate("eventos")}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 text-center mb-4">
                {translate("transformandoVidas")}
              </p>
              <p className="text-gray-400 text-center mb-4">
                {translate("cnpj")}: 11.985.110/0001-76
              </p>
              <div className="flex justify-center space-x-4">
                <a 
                  href="https://www.instagram.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              </div>
              <p className="text-gray-400 text-center mt-2">
                Siga-nos nas redes sociais para ficar por dentro das novidades!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mr-2"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                  <a 
                    href="mailto:contato@plumasepaetescultural.com" 
                    className="hover:text-white transition-colors"
                  >
                    contato@plumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mr-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L9.81 9.91a16 16 0 0 0 6.26 6.26l1.58-1.58a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <a 
                    href="https://wa.me/5521989392920" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    +55 21 98939-2920
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Instituto Plumas e Paetês Cultural. {translate("direitosReservados")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Eventos;
