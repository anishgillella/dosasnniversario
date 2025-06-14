"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Poetic memory phrases (no images)
const memoryWords = [
  { word: "Serendipity", sub: "How we met" },
  { word: "Austin Skies", sub: "She cried at the view" },
  { word: "First Laugh", sub: "Our first inside joke" },
  { word: "Graduation", sub: "She was my biggest cheerleader" },
  { word: "Unspoken", sub: "The comfort of silence" },
  { word: "Naatak", sub: "Life would be boring without it" },
  { word: "Always", sub: "Two years and forever to go" },
  { word: "Home", sub: "Wherever you are" },
  { word: "Two Years", sub: "June 6" },
  { word: "Dreams", sub: "To the future" },
];

// Utility for random float in range
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Starfield, aurora, and shooting stars
function useStarfield(canvasRef: React.RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight * 0.6;
    canvas.width = width;
    canvas.height = height;

    // Aurora gradient
    function drawAurora() {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "#ffe4ec"); // blush pink
      grad.addColorStop(0.3, "#fff8dc"); // ivory
      grad.addColorStop(0.6, "#d4af37"); // gold
      grad.addColorStop(1, "#722f37"); // wine red
      ctx.globalAlpha = 0.23;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;
    }

    // Parallax star layers
    const starLayers = [
      Array.from({ length: 70 }, () => ({ x: rand(0, width), y: rand(0, height), r: rand(0.6, 1.2), s: 0.13 })),
      Array.from({ length: 40 }, () => ({ x: rand(0, width), y: rand(0, height), r: rand(1.2, 2.2), s: 0.07 })),
      Array.from({ length: 10 }, () => ({ x: rand(0, width), y: rand(0, height), r: rand(2.2, 3.2), s: 0.03 })),
    ];

    // Shooting stars
    let shootingStar = null as null | { x: number; y: number; vx: number; vy: number; alpha: number };
    let shootTimer = 0;

    function drawStars() {
      starLayers.forEach((layer, i) => {
        ctx.save();
        ctx.globalAlpha = 0.5 + i * 0.15;
        ctx.fillStyle = i === 2 ? "#ffd1dc" : "#fff";
        layer.forEach(star => {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.shadowColor = i === 2 ? "#ffd1dc" : "#fff";
          ctx.shadowBlur = 8 - i * 2;
          ctx.fill();
        });
        ctx.restore();
      });
    }

    function drawShootingStar() {
      if (!shootingStar && shootTimer <= 0 && Math.random() < 0.01) {
        shootingStar = {
          x: rand(width * 0.4, width * 0.9),
          y: rand(10, height * 0.4),
          vx: -rand(7, 10),
          vy: rand(2, 4),
          alpha: 1
        };
        shootTimer = rand(100, 300);
      }
      if (shootingStar) {
        ctx.save();
        ctx.globalAlpha = shootingStar.alpha;
        ctx.strokeStyle = "#fff8dc";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.vx * 5, shootingStar.y + shootingStar.vy * 5);
        ctx.stroke();
        ctx.restore();
        shootingStar.x += shootingStar.vx;
        shootingStar.y += shootingStar.vy;
        shootingStar.alpha -= 0.015;
        if (shootingStar.alpha <= 0) shootingStar = null;
      }
      shootTimer--;
    }

    // Animation loop
    let running = true;
    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      drawAurora();
      drawStars();
      drawShootingStar();
      requestAnimationFrame(animate);
    }
    animate();

    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight * 0.6;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);
}

// Floating memory orbs
const orbColors = ["#ffd1dc", "#fff8dc", "#d4af37", "#722f37"];

function FloatingMemories() {
  // Words float in random paths across the sky
  const [hovered, setHovered] = useState(-1);
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {memoryWords.map((mem, i) => {
        // Randomize initial position and drift
        const x = 10 + (i * 15) % 80 + rand(-5, 5);
        const y = 10 + (i * 30) % 40 + rand(-5, 5);
        const duration = rand(18, 28);
        const color = orbColors[i % orbColors.length];
        return (
          <motion.div
            key={i}
            className="absolute flex flex-col items-center"
            style={{ left: `${x}%`, top: `${y}%`, zIndex: 2, pointerEvents: "auto" }}
            animate={{
              x: [0, rand(-30, 30), 0],
              y: [0, rand(-20, 20), 0],
              rotate: [0, rand(-8, 8), 0],
            }}
            transition={{ repeat: Infinity, duration, ease: "easeInOut" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(-1)}
          >
            <motion.div
              className="rounded-full shadow-2xl border-2 border-white/40 bg-white/10 flex items-center justify-center"
              style={{ width: 80, height: 80, boxShadow: `0 0 32px 8px ${color}77` }}
              animate={{ scale: hovered === i ? 1.15 : 1, boxShadow: hovered === i ? `0 0 64px 18px ${color}` : undefined }}
              transition={{ type: "spring", stiffness: 220, damping: 15 }}
            >
              <motion.span
                className="font-playfair text-lg md:text-xl text-white drop-shadow-lg select-none"
                style={{ letterSpacing: "0.04em", textShadow: `0 2px 10px ${color}` }}
                animate={{ opacity: [0.85, 1, 0.85], scale: [1, 1.08, 1], filter: hovered === i ? `blur(0px)` : `blur(0.5px)` }}
                transition={{ repeat: Infinity, duration: 3.4 + i * 0.2, ease: "easeInOut" }}
              >
                {mem.word}
              </motion.span>
            </motion.div>
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  className="mt-3 px-4 py-2 rounded-xl bg-wine/90 text-ivory shadow-xl text-center font-playfair text-base max-w-xs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  style={{ zIndex: 10 }}
                >
                  {mem.sub}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function DreamyStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useStarfield(canvasRef);
  return (
    <div className="relative w-full h-[60vh] bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <FloatingMemories />
    </div>
  );
}
