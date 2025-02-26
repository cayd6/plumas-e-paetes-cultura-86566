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
  },
  faleConosco: {
    pt: "Fale Conosco",
    en: "Contact Us"
  },
  projetosDesc: {
    pt: "Conheça nossas iniciativas culturais",
    en: "Discover our cultural initiatives"
  },
  nossaMissao: {
    pt: "Nossa Missão",
    en: "Our Mission"
  },
  missaoDesc: {
    pt: "Democratizar o acesso à cultura e arte, promovendo a transformação social através de projetos inovadores e inclusivos que valorizam a diversidade e a criatividade em todas as suas formas.",
    en: "To democratize access to culture and art, promoting social transformation through innovative and inclusive projects that value diversity and creativity in all its forms."
  },
  ultimasNoticias: {
    pt: "Últimas Notícias",
    en: "Latest News"
  },
  lerMais: {
    pt: "Ler mais",
    en: "Read more"
  },
  enviarMensagem: {
    pt: "Enviar Mensagem",
    en: "Send Message"
  },
  edicao2024: {
    pt: "Edição 2024",
    en: "2024 Edition"
  },
  especialCarnaval: {
    pt: "Especial de Carnaval 2024",
    en: "2024 Carnival Special"
  },
  edicao2023: {
    pt: "Edição 2023",
    en: "2023 Edition"
  },
  retrospectivaCultural: {
    pt: "Retrospectiva Cultural",
    en: "Cultural Retrospective"
  },
  edicoes: {
    pt: "Edições",
    en: "Editions"
  },
  premioPlumas19: {
    pt: "19º Prêmio Plumas & Paetês Cultural",
    en: "19th Plumas & Paetês Cultural Award"
  },
  dataEvento: {
    pt: "20 de Novembro",
    en: "November 20th"
  },
  sobreEvento: {
    pt: "Primeira premiação de carnaval voltada aos profissionais dos bastidores do carnaval, o Plumas & Paetês Cultural chega à sua 19ª edição, que será realizada na Cidade do Samba.",
    en: "The first carnival award focused on carnival backstage professionals, Plumas & Paetês Cultural reaches its 19th edition, to be held at Cidade do Samba."
  },
  lerMaisEdicao: {
    pt: "Ler mais sobre esta edição",
    en: "Read more about this edition"
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
