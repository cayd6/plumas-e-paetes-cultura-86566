
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WhatsAppButton = () => {
  const { translate } = useLanguage();
  const phoneNumber = "5521989392920"; // Updated with the correct WhatsApp number
  const whatsappUrl = `https://wa.me/${phoneNumber}`;

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300"
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{translate('faleConosco')}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};

export default WhatsAppButton;
