
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
    aumentarFonte: "Aumentar tamanho da fonte"
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
    aumentarFonte: "Increase font size"
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
