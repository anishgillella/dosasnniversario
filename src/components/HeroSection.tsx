import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!particlesRef.current) return;
    
    // Create floating particles
    const particlesContainer = particlesRef.current;
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size between 3px and 8px
      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation duration between 15s and 30s
      const duration = Math.random() * 15 + 15;
      particle.style.animation = `float ${duration}s ease-in-out infinite`;
      
      // Random delay
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random opacity
      particle.style.opacity = `${Math.random() * 0.7 + 0.3}`;
      
      particlesContainer.appendChild(particle);
    }
  }, []);

  return (
    <section className="section relative h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-ivory to-blush">
      <div ref={particlesRef} className="particles"></div>
      
      <motion.div 
        className="text-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-5xl md:text-7xl font-playfair font-bold mb-6 text-wine"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          Our Beautiful Journey
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-inter mb-8 text-wine/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          April 10, 2023 – Our story began...
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-12"
        >
          <button className="px-8 py-3 rounded-full bg-wine text-ivory hover:bg-wine/90 transition-all duration-300 font-inter flex items-center gap-2">
            <span>Scroll to Begin Our Story</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
