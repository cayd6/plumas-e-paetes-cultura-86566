import { useLanguage } from "@/contexts/LanguageContext";

const partners = [
  { name: "Vila Isabel", logo: "/lovable-uploads/44299e4c-0b70-4e79-b05a-834616a0d285.png" },
  { name: "Beija-Flor", logo: "/lovable-uploads/d1598a64-ce27-4278-bf44-74265e961ce6.png" },
  { name: "Mangueira", logo: "/lovable-uploads/7e1ace30-f014-4a63-99fe-fe4c937e5695.png" },
  { name: "Salgueiro", logo: "/lovable-uploads/523c74c3-9c45-4d28-9528-2b3ef5e1618e.png" },
  { name: "Grande Rio", logo: "/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png" },
  { name: "Viradouro", logo: "/lovable-uploads/7ab7abcd-aa1f-4a9a-b39c-43fff9ff5ad7.png" },
];

const PartnersCarousel = () => {
  const { translate } = useLanguage();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{translate("parceirosEstrategicos")}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trabalhamos com as principais escolas de samba e organizações culturais do Brasil
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-slide-in">
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-48 h-32 mx-6 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="/sobre"
            className="inline-flex items-center px-8 py-4 bg-carnival-purple text-white rounded-full hover:bg-carnival-purple/90 transition-colors font-semibold text-lg"
          >
            Seja Nosso Parceiro
          </a>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
