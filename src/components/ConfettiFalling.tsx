import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  speed: number;
  color: string;
  size: number;
}

// Carnival color palette (includes duplicates to naturally weight pink/gold/green)
const COLORS = [
  '#FF1493', // Deep Pink / Magenta
  '#00FF00', // Bright Green / Lime
  '#FFD700', // Gold / Yellow
  '#9370DB', // Medium Purple
  '#FF4500', // Orange Red
  '#00CED1', // Dark Turquoise
  '#FF69B4', // Hot Pink
  '#32CD32', // Lime Green
  '#8A2BE2', // Blue Violet
  '#FF6347', // Tomato Red
  '#00BFFF', // Deep Sky Blue
  '#FFD700', // Yellow Gold (weighted)
  '#FF1493', // Magenta (weighted)
  '#7FFF00', // Chartreuse
  '#FF00FF', // Fuchsia
  '#00FA9A', // Medium Spring Green
];

function getRandomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

const ConfettiFalling = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 0.7; // confetti within hero height
    };
    setSize();

    // Create confetti pieces
    const confettiPieces: ConfettiPiece[] = [];
    const PIECES = 180; // 150-200 pieces

    for (let i = 0; i < PIECES; i++) {
      confettiPieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 3 - 1.5,
        speed: Math.random() * 2 + 1.2, // approximate gravity 0.3 feel
        color: getRandomColor(),
        size: Math.random() * 8 + 4,
      });
    }

    let raf = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confettiPieces.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // draw square piece
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();

        // update
        p.y += p.speed;
        p.rotation += p.rotationSpeed;

        // recycle with NEW random color
        if (p.y > canvas.height + 10) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.color = getRandomColor();
          p.size = Math.random() * 8 + 4;
          p.speed = Math.random() * 2 + 1.2;
          p.rotationSpeed = Math.random() * 3 - 1.5;
        }
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      setSize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};

export default ConfettiFalling;
