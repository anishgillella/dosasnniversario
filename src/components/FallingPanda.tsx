"use client";

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion } from 'framer-motion';

function MinimalPanda() {
  const pandaRef = useRef<any>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    if (pandaRef.current) {
      // Subtle floating animation
      pandaRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      pandaRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      
      // Gentle descent based on scroll
      const maxScroll = 2000;
      const scrollProgress = Math.min(scrollY / maxScroll, 1);
      pandaRef.current.position.y -= scrollProgress * 3;
      
      // Fade out as it falls
      if (pandaRef.current.children) {
        pandaRef.current.children.forEach((child: any) => {
          if (child.material) {
            child.material.opacity = 1 - (scrollProgress * 0.7);
          }
        });
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={pandaRef}>
        {/* Minimalist panda made of simple shapes */}
        {/* Body */}
        <mesh position={[0, -0.5, 0]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial color="#fafafa" transparent />
        </mesh>
        
        {/* Head */}
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.45, 32, 32]} />
          <meshStandardMaterial color="#fafafa" transparent />
        </mesh>
        
        {/* Ears */}
        <mesh position={[-0.3, 0.6, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#333333" transparent />
        </mesh>
        <mesh position={[0.3, 0.6, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#333333" transparent />
        </mesh>
        
        {/* Eyes - just dots */}
        <mesh position={[-0.15, 0.35, 0.35]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#333333" transparent />
        </mesh>
        <mesh position={[0.15, 0.35, 0.35]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#333333" transparent />
        </mesh>
        
        {/* Tiny nose */}
        <mesh position={[0, 0.25, 0.4]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="#333333" transparent />
        </mesh>
      </group>
    </Float>
  );
}

export default function FallingPanda() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="fixed top-20 right-10 w-32 h-32 pointer-events-none z-20"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={0.3} />
          <MinimalPanda />
        </Canvas>
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-200/10 rounded-full blur-3xl" />
        </div>
      </motion.div>
      
      {/* Text outside of canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 0.6 : 0 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="fixed top-36 right-8 pointer-events-none z-20"
      >
        <p className="text-gray-400 text-xs font-light italic tracking-widest">
          falling for you...
        </p>
      </motion.div>
    </>
  );
} 