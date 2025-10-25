import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";

const Galeria = () => {
  const { translate } = useLanguage();
  const [selectedYear, setSelectedYear] = useState("todos");
  const [selectedType, setSelectedType] = useState("todos");

  const photos = [
    { id: 1, src: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png", year: "2024", type: "desfile", title: "Desfile Carnaval 2024" },
    { id: 2, src: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png", year: "2024", type: "premiacao", title: "Cerimônia de Premiação" },
    { id: 3, src: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png", year: "2024", type: "premiacao", title: "19º Prêmio Plumas & Paetês" },
    { id: 4, src: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png", year: "2024", type: "oficina", title: "Oficina de Fantasias" },
    { id: 5, src: "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png", year: "2023", type: "desfile", title: "Carnaval de Rua 2023" },
    { id: 6, src: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png", year: "2023", type: "oficina", title: "Oficina de Percussão" },
  ];

  const filteredPhotos = photos.filter(photo => {
    if (selectedYear !== "todos" && photo.year !== selectedYear) return false;
    if (selectedType !== "todos" && photo.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-ppc-purple to-ppc-magenta">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              {translate("galeriaFotos")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Momentos especiais capturados em nossos eventos culturais
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white shadow-sm sticky top-20 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">{translate("filtrarPor")}:</label>
            </div>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
            >
              <option value="todos">{translate("ano")} - Todos</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent"
            >
              <option value="todos">{translate("tipoEvento")} - Todos</option>
              <option value="desfile">Desfiles</option>
              <option value="premiacao">Premiações</option>
              <option value="oficina">Oficinas</option>
            </select>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">{photo.title}</h3>
                    <p className="text-white/80 text-sm">{photo.year}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram CTA */}
      <section className="py-20 bg-gradient-to-br from-ppc-magenta to-ppc-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {translate("sigaNosInstagram")}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Acompanhe nossos eventos ao vivo e fique por dentro das novidades
          </p>
          <a
            href="https://www.instagram.com/plumasepaetescultural/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-ppc-magenta rounded-full hover:bg-white/90 transition-colors font-semibold text-lg"
          >
            <Instagram size={24} />
            @plumasepaetescultural
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("linksRapidos")}</h3>
              <ul className="space-y-2">
                <li><a href="/" className="text-gray-400 hover:text-white transition-colors">{translate("inicio")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/galeria" className="text-gray-400 hover:text-white transition-colors">{translate("galeria")}</a></li>
                <li><a href="/contato" className="text-gray-400 hover:text-white transition-colors">{translate("contato")}</a></li>
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
                  <Instagram size={24} />
                </a>
                <a 
                  href="https://www.facebook.com/plumasepaetescultural/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Mail size={18} className="mr-2" />
                  <a 
                    href="mailto:contato@institutoplumasepaetescultural.com" 
                    className="hover:text-white transition-colors"
                  >
                    contato@institutoplumasepaetescultural.com
                  </a>
                </p>
                <p className="flex items-center">
                  <Phone size={18} className="mr-2" />
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
            <p>&copy; 2025 Instituto Plumas e Paetês Cultural. {translate("direitosReservados")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Galeria;