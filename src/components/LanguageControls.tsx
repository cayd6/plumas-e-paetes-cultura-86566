
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
      <div className="fixed top-24 right-4 z-[40] flex items-center gap-3 pt-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-carnival-purple transition-all duration-200 shadow-md font-semibold"
            >
              <Globe size={20} />
              <span className="text-base">{language.toUpperCase()}</span>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('trocarIdioma')}</p>
          </TooltipContent>
        </Tooltip>

        <div className="flex items-center gap-1 px-3 py-2.5 rounded-lg bg-white border-2 border-gray-200 shadow-md">
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={decreaseFontSize} 
                className="hover:bg-gray-100 rounded px-2 py-1 transition-colors w-8 h-8 flex items-center justify-center text-gray-900"
              >
                <span className="text-xl font-bold">-</span>
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{translate('diminuirFonte')}</p>
            </TooltipContent>
          </Tooltip>

          <span className="mx-1 text-gray-400">|</span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                onClick={increaseFontSize} 
                className="hover:bg-gray-100 rounded px-2 py-1 transition-colors w-8 h-8 flex items-center justify-center text-gray-900"
              >
                <span className="text-xl font-bold">+</span>
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
