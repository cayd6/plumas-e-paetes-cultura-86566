import { useState } from "react";
import Navigation from "@/components/Navigation";
import LanguageControls from "@/components/LanguageControls";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Facebook, Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { translate } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create WhatsApp message
    const message = `*Nova Mensagem do Site*%0A%0A*Nome:* ${formData.nome}%0A*Email:* ${formData.email}%0A*Telefone:* ${formData.telefone}%0A%0A*Mensagem:*%0A${formData.mensagem}`;
    
    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/5521989392920?text=${message}`, '_blank');
    
    toast({
      title: "Mensagem enviada!",
      description: "Você será redirecionado para o WhatsApp.",
    });
    
    // Reset form
    setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <LanguageControls />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-ppc-purple to-ppc-magenta">
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
              {translate("faleConosco")}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Estamos prontos para ouvir você e construir projetos incríveis juntos
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold mb-6">{translate("envieMensagem")}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    {translate("nome")} *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent transition-colors"
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {translate("email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    {translate("telefone")}
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent transition-colors"
                    placeholder="(21) 98888-8888"
                  />
                </div>
                
                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                    {translate("mensagem")} *
                  </label>
                  <textarea
                    id="mensagem"
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-ppc-purple focus:border-transparent transition-colors resize-none"
                    placeholder="Como podemos ajudá-lo?"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-ppc-purple text-white rounded-full hover:bg-ppc-purple/90 transition-colors font-semibold text-lg"
                >
                  <Send size={20} />
                  {translate("enviarMensagem")}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-3xl font-bold mb-6">{translate("contato")}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ppc-purple/10 rounded-full flex items-center justify-center">
                      <Mail className="text-ppc-purple" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <a
                        href="mailto:contato@institutoplumasepaetescultural.com"
                        className="text-gray-600 hover:text-ppc-purple transition-colors"
                      >
                        contato@institutoplumasepaetescultural.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ppc-purple/10 rounded-full flex items-center justify-center">
                      <Phone className="text-ppc-purple" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
                      <a
                        href="https://wa.me/5521989392920"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-ppc-purple transition-colors"
                      >
                        +55 21 98939-2920
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ppc-purple/10 rounded-full flex items-center justify-center">
                      <MapPin className="text-ppc-purple" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{translate("endereco")}</h3>
                      <p className="text-gray-600">
                        Rio de Janeiro, RJ<br />
                        Brasil
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-ppc-magenta to-ppc-orange rounded-2xl shadow-xl p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">{translate("redesSociais")}</h2>
                <p className="mb-6 text-white/90">
                  Acompanhe nossas redes sociais e fique por dentro de todas as novidades!
                </p>
                
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/plumasepaetescultural/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Instagram size={24} />
                    <span className="font-semibold">Instagram</span>
                  </a>
                  <a
                    href="https://www.facebook.com/plumasepaetescultural/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-full transition-colors backdrop-blur-sm"
                  >
                    <Facebook size={24} />
                    <span className="font-semibold">Facebook</span>
                  </a>
                </div>
                
                <div className="mt-6 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <p className="text-center text-sm text-white/90">
                    <strong>19.6k</strong> {translate("seguidores")} • <strong>878</strong> {translate("publicacoes")}
                  </p>
                </div>
              </div>
            </div>
          </div>
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
                <li><a href="/sobre" className="text-gray-400 hover:text-white transition-colors">{translate("sobre")}</a></li>
                <li><a href="/edicoes" className="text-gray-400 hover:text-white transition-colors">{translate("edicoes")}</a></li>
                <li><a href="/galeria" className="text-gray-400 hover:text-white transition-colors">{translate("galeria")}</a></li>
              </ul>
            </div>
            <div>
              <p className="text-gray-400 text-center mb-4">
                {translate("transformandoVidas")}
              </p>
              <p className="text-gray-400 text-center mb-4">
                {translate("cnpj")}: 11.985.110/0001-76
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{translate("contato")}</h3>
              <div className="space-y-2 text-gray-400">
                <p>contato@institutoplumasepaetescultural.com</p>
                <p>+55 21 98939-2920</p>
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

export default Contato;