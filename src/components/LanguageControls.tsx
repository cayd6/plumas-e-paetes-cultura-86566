
import { useState } from 'react';
import { Globe, TextSize } from 'lucide-react';

const LanguageControls = () => {
  const [language, setLanguage] = useState('pt');
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
    document.documentElement.style.fontSize = `${fontSize + 2}px`;
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
    document.documentElement.style.fontSize = `${fontSize - 2}px`;
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  return (
    <div className="fixed top-4 right-4 z-[60] flex items-center space-x-4">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
      >
        <Globe size={20} />
        <span>{language.toUpperCase()}</span>
      </button>
      <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md text-white">
        <button onClick={decreaseFontSize} className="hover:text-gray-300 transition-colors">
          <TextSize size={16} />
        </button>
        <span className="mx-1">|</span>
        <button onClick={increaseFontSize} className="hover:text-gray-300 transition-colors">
          <TextSize size={20} />
        </button>
      </div>
    </div>
  );
};

export default LanguageControls;
