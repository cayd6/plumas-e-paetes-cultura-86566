
import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

const AnniversaryBanner = () => {
  const [hasLaunched, setHasLaunched] = useState(false);

  const launchConfetti = () => {
    if (hasLaunched) return;
    setHasLaunched(true);

    const colors = ['#FFD700', '#E91E63', '#00C853', '#7B1FA2'];
    
    // Continuous confetti bursts
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    
    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      // Left side
      confetti({
        particleCount,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });

      // Right side
      confetti({
        particleCount,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
    }, 250);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      launchConfetti();
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="inline-block animate-scale-in">
      <div className="relative">
        <div className="absolute inset-0 bg-carnival-gold/20 blur-3xl rounded-full animate-pulse" />
        <div className="relative bg-gradient-to-br from-carnival-gold via-carnival-magenta to-carnival-purple p-1 rounded-full">
          <div className="bg-white rounded-full px-8 py-4 text-center">
            <div className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-carnival-gold via-carnival-magenta to-carnival-purple bg-clip-text text-transparent">
              20
            </div>
            <div className="text-lg md:text-xl font-bold text-gray-800 tracking-widest">
              ANOS
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnniversaryBanner;
