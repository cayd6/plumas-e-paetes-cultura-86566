
import React, { createContext, useContext, useState } from 'react';

type Translations = {
  [key: string]: {
    pt: string;
    en: string;
  };
};

const translations: Translations = {
  inicio: {
    pt: "Início",
    en: "Home"
  },
  projetos: {
    pt: "Projetos",
    en: "Projects"
  },
  sobre: {
    pt: "Sobre",
    en: "About"
  },
  noticias: {
    pt: "Notícias",
    en: "News"
  },
  revistas: {
    pt: "Revistas",
    en: "Magazines"
  },
  eventos: {
    pt: "Eventos",
    en: "Events"
  },
  aumentarFonte: {
    pt: "Aumentar tamanho da fonte",
    en: "Increase font size"
  },
  diminuirFonte: {
    pt: "Diminuir tamanho da fonte",
    en: "Decrease font size"
  },
  trocarIdioma: {
    pt: "Trocar idioma",
    en: "Change language"
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translate: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('pt');

  const translate = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
