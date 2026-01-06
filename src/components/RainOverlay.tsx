import { useEffect, useRef } from 'react';

export function RainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Rain drop configuration
    const drops: Array<{ x: number; y: number; length: number; speed: number; opacity: number }> = [];
    const dropCount = 150; // Balanced density and performance

    // Initialize drops
    for (let i = 0; i < dropCount; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Clear canvas completely for transparency
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        // Draw rain drop
        ctx.strokeStyle = `rgba(147, 197, 253, ${drop.opacity * 0.6})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x, drop.y + drop.length);
        ctx.stroke();

        // Update position
        drop.y += drop.speed;

        // Reset drop when it goes off screen
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 animate-fade-in-bg"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
