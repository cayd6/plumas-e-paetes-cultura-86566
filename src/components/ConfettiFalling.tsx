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
          '#FF1493', '#00FF00', '#FFD700', '#9370DB',
          '#FF4500', '#00CED1', '#FF69B4', '#32CD32',
          '#8A2BE2', '#FF6347', '#00BFFF', '#FFD700',
          '#FF1493', '#7FFF00', '#FF00FF', '#00FA9A'
        ],
        shapes: ['circle', 'square'],
        gravity: randomInRange(0.28, 0.36),
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
