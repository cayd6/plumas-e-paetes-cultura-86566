import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiFalling = () => {
  useEffect(() => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: [
          '#FFD700', // Gold
          '#FF1493', // Deep Pink/Magenta
          '#00FF00', // Bright Green
          '#9370DB', // Purple
          '#FF4500', // Orange Red
          '#00CED1', // Turquoise
          '#FF69B4', // Hot Pink
          '#32CD32', // Lime Green
          '#8A2BE2', // Blue Violet
          '#FF6347', // Tomato Red
          '#00BFFF', // Deep Sky Blue
          '#FFD700', // Yellow Gold
        ],
        shapes: ['circle', 'square'],
        gravity: randomInRange(0.3, 0.5),
        scalar: randomInRange(0.5, 1.2),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return null;
};

export default ConfettiFalling;
