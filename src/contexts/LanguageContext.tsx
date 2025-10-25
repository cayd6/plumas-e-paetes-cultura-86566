
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the available languages
type Language = "pt" | "en";

// Define the translations interface
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  pt: {
    inicio: "Início",
    projetos: "Projetos",
    projetosDesc: "Transformando vidas através da arte e cultura",
    sobre: "Sobre",
    noticias: "Notícias",
    edicoes: "Edições",
    eventos: "Eventos",
    revistas: "Revistas",
    contato: "Contato",
    galeria: "Galeria",
    envieMensagem: "Envie uma mensagem",
    enviarMensagem: "Enviar Mensagem",
    nossaMissao: "Nossa Missão",
    missaoDesc:
      "Promover a arte e a cultura como ferramentas de transformação social, incentivando a diversidade, a inclusão e o desenvolvimento das comunidades através de projetos inovadores e acessíveis.",
    ultimasNoticias: "Últimas Notícias",
    emBreve: "Em breve",
    faleConosco: "Fale Conosco",
    linksRapidos: "Links Rápidos",
    transformandoVidas: "Transformando vidas através da arte e cultura",
    cnpj: "CNPJ",
    direitosReservados: "Todos os direitos reservados.",
    lerMais: "Ler mais",
    saibaMais: "Saiba mais",
    saibaMais20Anos: "Saiba mais sobre os 20 anos",
    trocarIdioma: "Trocar idioma",
    diminuirFonte: "Diminuir tamanho da fonte",
    aumentarFonte: "Aumentar tamanho da fonte",
    conhecaNossosProjetos: "Conheça Nossos Projetos",
    sobreNos: "Sobre Nós",
    quemSomos: "Quem Somos",
    missaoVisaoValores: "Missão, Visão e Valores",
    ondeAtuamos: "Onde Atuamos",
    reconhecimentos: "Reconhecimentos",
    nossaHistoria: "Nossa História",
    conecteConosco: "Conecte-se Conosco",
    seguirInstagram: "Seguir no Instagram",
    seguirFacebook: "Seguir no Facebook",
    premioPlumas: "Prêmio Plumas & Paetês",
    premioDesc: "Reconhecendo os artífices do carnaval carioca",
    categoriasPremio: "Categorias do Prêmio",
    vencedoresAnteriores: "Vencedores Anteriores",
    inscricoes: "Inscrições",
    timelineEdicoes: "Timeline das Edições",
    proximosEventos: "Próximos Eventos",
    eventosPassados: "Eventos Passados",
    calendario: "Calendário",
    fotosEventos: "Fotos dos Eventos",
    oficinas: "Oficinas e Capacitações",
    revistaDigital: "Revista Digital",
    ultimaEdicao: "Última Edição",
    todasEdicoes: "Todas as Edições",
    assinar: "Assinar",
    galeriaFotos: "Galeria de Fotos",
    filtrarPor: "Filtrar por",
    ano: "Ano",
    tipoEvento: "Tipo de Evento",
    nome: "Nome",
    email: "Email",
    telefone: "Telefone",
    mensagem: "Mensagem",
    endereco: "Endereço",
    redesSociais: "Redes Sociais",
    sigaNosInstagram: "Siga-nos no Instagram",
    equipe: "Nossa Equipe",
    fundador: "Fundador e Diretor",
    produtor: "Produtor Cultural",
    estilista: "Estilista",
    criadorPremio: "Criador do Prêmio Plumas & Paetês",
    seguidores: "seguidores",
    publicacoes: "publicações",
    parceirosEstrategicos: "Parceiros Estratégicos",
    edicao: "edição",
    revista: "Revista",
    lerOnline: "Ler Online",
    baixarPDF: "Baixar PDF",
    arquivoRevistas: "Arquivo de Revistas",
    todas: "Todas",
    paginas: "páginas",
    ler: "Ler",
    producaoEventos: "Produção de Eventos",
    nossosServicos: "Nossos Serviços",
    portfolio: "Portfólio",
    entrarContato: "Entrar em Contato",
    blog: "Blog & Notícias",
    carnaval2025: "Carnaval 2025",
    descricaoCarnaval: "Grande desfile e celebração da cultura popular",
    festivalCultural: "Festival Cultural",
    descricaoFestival: "Semana de arte, cultura e economia criativa",
    heroSubtitulo: "Transformando a sociedade brasileira por meio da economia criativa",
    quemSomosTexto1: "Criado em 2005 com o intuito de reconhecer e valorizar os artistas anônimos do carnaval carioca, amplificando as suas vozes e intermediando a ascensão de suas carreiras profissionais, o Instituto Plumas & Paetês Cultural logo se tornou muito maior do que a premiação carnavalesca que lhe deu origem.",
    quemSomosTexto2: "Mantendo a sua premissa inicial, de iluminar os bastidores da economia criativa, estimulando a renda de seus fazedores e democratizando o acesso à arte por eles produzida, o Plumas & Paetês percebeu que podia mais e decidiu ampliar o seu alcance, produzindo uma série de eventos e projetos culturais em diversas regiões do país.",
    projetosProdutosEventos: "Projetos, Produtos e Eventos",
    projetosProdutosEventosDesc: "Conheça as principais iniciativas desenvolvidas pelo Instituto ao longo de duas décadas de atuação",
  },
  en: {
    inicio: "Home",
    projetos: "Projects",
    projetosDesc: "Transforming lives through art and culture",
    sobre: "About",
    noticias: "News",
    edicoes: "Editions",
    eventos: "Events",
    revistas: "Magazines",
    contato: "Contact",
    galeria: "Gallery",
    envieMensagem: "Send a message",
    enviarMensagem: "Send Message",
    nossaMissao: "Our Mission",
    missaoDesc:
      "Promote art and culture as tools for social transformation, encouraging diversity, inclusion, and community development through innovative and accessible projects.",
    ultimasNoticias: "Latest News",
    emBreve: "Coming soon",
    faleConosco: "Contact Us",
    linksRapidos: "Quick Links",
    transformandoVidas: "Transforming lives through art and culture",
    cnpj: "CNPJ",
    direitosReservados: "All rights reserved.",
    lerMais: "Read more",
    saibaMais: "Learn more",
    saibaMais20Anos: "Learn more about the 20 years",
    trocarIdioma: "Switch language",
    diminuirFonte: "Decrease font size",
    aumentarFonte: "Increase font size",
    conhecaNossosProjetos: "Discover Our Projects",
    sobreNos: "About Us",
    quemSomos: "Who We Are",
    missaoVisaoValores: "Mission, Vision and Values",
    ondeAtuamos: "Where We Operate",
    reconhecimentos: "Recognitions",
    nossaHistoria: "Our History",
    conecteConosco: "Connect With Us",
    seguirInstagram: "Follow on Instagram",
    seguirFacebook: "Follow on Facebook",
    premioPlumas: "Plumas & Paetês Award",
    premioDesc: "Recognizing the artisans of Rio's carnival",
    categoriasPremio: "Award Categories",
    vencedoresAnteriores: "Previous Winners",
    inscricoes: "Registration",
    timelineEdicoes: "Edition Timeline",
    proximosEventos: "Upcoming Events",
    eventosPassados: "Past Events",
    calendario: "Calendar",
    fotosEventos: "Event Photos",
    oficinas: "Workshops & Training",
    revistaDigital: "Digital Magazine",
    ultimaEdicao: "Latest Edition",
    todasEdicoes: "All Editions",
    assinar: "Subscribe",
    galeriaFotos: "Photo Gallery",
    filtrarPor: "Filter by",
    ano: "Year",
    tipoEvento: "Event Type",
    nome: "Name",
    email: "Email",
    telefone: "Phone",
    mensagem: "Message",
    endereco: "Address",
    redesSociais: "Social Media",
    sigaNosInstagram: "Follow us on Instagram",
    equipe: "Our Team",
    fundador: "Founder and Director",
    produtor: "Cultural Producer",
    estilista: "Stylist",
    criadorPremio: "Creator of Prêmio Plumas & Paetês",
    seguidores: "followers",
    publicacoes: "posts",
    parceirosEstrategicos: "Strategic Partners",
    edicao: "edition",
    revista: "Magazine",
    lerOnline: "Read Online",
    baixarPDF: "Download PDF",
    arquivoRevistas: "Magazine Archive",
    todas: "All",
    paginas: "pages",
    ler: "Read",
    producaoEventos: "Event Production",
    nossosServicos: "Our Services",
    portfolio: "Portfolio",
    entrarContato: "Get in Touch",
    blog: "Blog & News",
    carnaval2025: "Carnival 2025",
    descricaoCarnaval: "Grand parade and celebration of popular culture",
    festivalCultural: "Cultural Festival",
    descricaoFestival: "Week of art, culture and creative economy",
    heroSubtitulo: "Transforming Brazilian society through the creative economy",
    quemSomosTexto1: "Created in 2005 with the aim of recognizing and valuing the anonymous artists of Rio's carnival, amplifying their voices and facilitating their professional advancement, the Instituto Plumas & Paetês Cultural soon became much more than the carnival award that gave it origin.",
    quemSomosTexto2: "Maintaining its initial premise of illuminating the backstage of the creative economy, stimulating the income of its creators and democratizing access to the art they produce, Plumas & Paetês realized it could do more and decided to expand its reach, producing a series of cultural events and projects in various regions of the country.",
    projetosProdutosEventos: "Projects, Products and Events", 
    projetosProdutosEventosDesc: "Discover the main initiatives developed by the Institute over two decades of activity",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>("pt");

  const translate = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};
