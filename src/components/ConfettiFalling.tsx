import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiFalling = () => {
  useEffect(() => {
    // Wait 500ms after page load, then trigger confetti explosion
    const timer = setTimeout(() => {
      const colors = [
        '#FF1493', // Deep Pink
        '#00FF00', // Bright Green
        '#FFD700', // Gold
        '#9370DB', // Purple
        '#FF4500', // Orange
        '#00CED1', // Turquoise
        '#FF69B4', // Hot Pink
        '#32CD32', // Lime
        '#8A2BE2', // Blue Violet
        '#FF6347', // Tomato
        '#00BFFF', // Sky Blue
        '#FFFF00', // Yellow
      ];

      // Confetti from left side
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

      // Confetti from right side
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
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null;
};

export default ConfettiFalling;
