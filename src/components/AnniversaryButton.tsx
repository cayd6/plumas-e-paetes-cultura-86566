import { useState } from 'react';
import confetti from 'canvas-confetti';
import anniversaryLogo from '@/assets/20-anos-logo.jpg';

const AnniversaryButton = () => {
  const [hasClicked, setHasClicked] = useState(false);

  const handleClick = () => {
    if (hasClicked) return;
    setHasClicked(true);

    const colors = [
      '#FF1493', '#00FF00', '#FFD700', '#9370DB',
      '#FF4500', '#00CED1', '#FF69B4', '#32CD32',
      '#8A2BE2', '#FF6347', '#00BFFF', '#FFFF00',
    ];

    // Left explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.2, y: 0.5 },
      colors,
      gravity: 1,
      ticks: 300,
      scalar: 1.2,
      drift: 0.5,
    });

    // Right explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0.8, y: 0.5 },
      colors,
      gravity: 1,
      ticks: 300,
      scalar: 1.2,
      drift: -0.5,
    });

    // Center explosion
    confetti({
      particleCount: 50,
      spread: 360,
      origin: { x: 0.5, y: 0.4 },
      colors,
      gravity: 1,
      ticks: 300,
      scalar: 1.2,
    });

    // Reset after animation
    setTimeout(() => setHasClicked(false), 5000);
  };

  return (
    <button
      onClick={handleClick}
      className="relative group cursor-pointer transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-400/50"
      aria-label="Celebrar 20 anos com confete"
    >
      <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
        <img
          src={anniversaryLogo}
          alt="20 anos - Prêmio Plumas & Paetês Cultural"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300 -z-10" />
    </button>
  );
};

export default AnniversaryButton;
