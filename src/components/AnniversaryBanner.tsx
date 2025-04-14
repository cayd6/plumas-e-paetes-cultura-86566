
import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const AnniversaryBanner = () => {
  const [showButton, setShowButton] = useState(false);
  const { translate } = useLanguage();

  const launchConfetti = () => {
    const colors = ['#FCD34D', '#EF4444', '#3B82F6', '#10B981', '#8B5CF6', '#F97316'];
    const shapes: confetti.Shape[] = ['square', 'circle'];
    
    // First burst
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: colors,
      shapes: shapes,
      gravity: 0.8,
      scalar: 1.2,
      drift: 0,
      ticks: 300
    });
    
    // Second burst - delayed
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.6 },
        colors: colors,
        shapes: shapes,
        gravity: 0.6,
        scalar: 1,
        drift: 1,
        ticks: 240
      });
    }, 250);
    
    // Third burst - delayed
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.6 },
        colors: colors,
        shapes: shapes,
        gravity: 0.6,
        scalar: 1,
        drift: -1,
        ticks: 240
      });
    }, 400);

    // Show the button after animation
    setTimeout(() => {
      setShowButton(true);
    }, 1000);
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div 
        className="cursor-pointer transform hover:scale-105 transition-transform duration-300 max-w-[192px]"
        onClick={launchConfetti}
      >
        <img
          src="/lovable-uploads/2f3ac4c5-4b19-4824-844f-58a4e3f24a02.png"
          alt="20 Anos do Prêmio Plumas e Paetês Cultural"
          className="w-full h-auto"
        />
      </div>
      
      {showButton && (
        <div className="mt-6 animate-fade-in absolute -bottom-16">
          <Button
            variant="outline"
            className="bg-white/80 border-ppc-purple text-ppc-purple hover:bg-ppc-purple hover:text-white transition-all"
          >
            {translate("saibaMais20Anos") || "Saiba mais sobre os 20 anos"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AnniversaryBanner;
