'use client';

import { useEffect, useRef } from 'react';

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let particles: any[] = [];

    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        alpha: 1,
        radius: Math.random() * 2 + 1,
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p, i) => {
        p.alpha -= 0.01;
        if (p.alpha <= 0) particles.splice(i, 1);
        else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
          ctx.shadowColor = '#fff8dc';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
      requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', handleMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
}
