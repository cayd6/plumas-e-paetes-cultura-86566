
import { useState } from 'react';
import { Globe } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from '@/contexts/LanguageContext';

const LanguageControls = () => {
  const { language, setLanguage, translate } = useLanguage();
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
    setLanguage(language === 'pt' ? 'en' : 'pt');
  };

  return (
    <TooltipProvider>
      <div className="fixed top-0 right-4 z-[60] flex items-center space-x-4 pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors"
            >
              <Globe size={20} />
              <span>{language.toUpperCase()}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('trocarIdioma')}</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center space-x-2 px-3 py-2 rounded-full bg-white/10 backdrop-blur-md text-white">
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={decreaseFontSize} 
                className="hover:text-gray-300 transition-colors w-6 h-6 flex items-center justify-center"
              >
                <span className="text-lg font-bold">-</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{translate('diminuirFonte')}</p>
            </TooltipContent>
          </Tooltip>

          <span className="mx-1">|</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={increaseFontSize} 
                className="hover:text-gray-300 transition-colors w-6 h-6 flex items-center justify-center"
              >
                <span className="text-lg font-bold">+</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{translate('aumentarFonte')}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default LanguageControls;
