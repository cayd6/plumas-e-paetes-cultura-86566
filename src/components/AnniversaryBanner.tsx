
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AnniversaryBanner = () => {
  const { translate } = useLanguage();
  const [showButton, setShowButton] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    if (!imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Colors based on the logo
    const colors = [
      '#FCD34D', // Yellow
      '#ea384c', // Red
      '#1EAEDB', // Blue
      '#22C55E', // Green
      '#8B5CF6', // Purple
      '#F97316'  // Orange
    ];

    // Initial burst from the center of the image
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors,
      shapes: ['circle', 'square'],
      scalar: 0.8,
      gravity: 0.8,
      drift: 1,
      ticks: 200
    });

    // Follow-up bursts from slightly different positions
    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: x - 0.05, y: y - 0.05 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 1,
        gravity: 0.6,
        drift: 2,
        ticks: 150
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { x: x + 0.05, y: y - 0.05 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 1.2,
        gravity: 0.6,
        drift: 2,
        ticks: 150
      });
      
      setShowButton(true);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-8 w-full max-w-md mx-auto">
      <div 
        ref={imageRef} 
        onClick={triggerConfetti}
        className="cursor-pointer transition-transform hover:scale-105 relative"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <img 
          src="/lovable-uploads/c9c3be29-4ab9-48e2-8063-e50adc53298e.png"
          alt={`Prêmio Plumas & Paetês Cultural - ${translate("aniversario20Anos")}`}
          className="w-full h-auto drop-shadow-lg"
        />
        <span className="sr-only">
          {translate("celebrando20Anos")}
        </span>
      </div>
      
      {showButton && (
        <div className="mt-4 animate-fade-in">
          <Link to="/sobre">
            <Button variant="outline" className="glass-card bg-ppc-purple bg-opacity-20 text-white border-white/30 hover:bg-ppc-purple/40">
              {translate("saibaMais")}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AnniversaryBanner;
