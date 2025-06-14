'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

// --- SANA Star Path ---
// 2D coordinates for each star, spells "SANA" when viewed from the front
type Star = { x: number; y: number; z: number };

// These coordinates are hand-tuned for a nice "SANA" look in 3D (z is slight jitter for depth)
const sanaStarPath: Star[] = [
  // S
  { x: -4, y: 2, z: 0 }, { x: -3.7, y: 2, z: 0.3 }, { x: -3.4, y: 1.8, z: -0.2 }, { x: -3.2, y: 1.4, z: 0.2 },
  { x: -3.4, y: 1, z: 0 }, { x: -3.8, y: 0.8, z: -0.1 }, { x: -4, y: 0.5, z: 0.2 },
  // A
  { x: -2.8, y: 0.5, z: 0 }, { x: -2.5, y: 1.2, z: 0.2 }, { x: -2.2, y: 2, z: -0.2 },
  { x: -1.9, y: 1.2, z: 0.2 }, { x: -1.6, y: 0.5, z: 0 },
  { x: -2.45, y: 1.35, z: 0.15 }, // crossbar
  // N
  { x: -1.2, y: 0.5, z: 0 }, { x: -1.2, y: 2, z: 0.2 }, { x: -0.7, y: 1.2, z: -0.2 }, { x: -0.3, y: 2, z: 0.1 }, { x: -0.3, y: 0.5, z: 0 },
  // A
  { x: 0.3, y: 0.5, z: 0 }, { x: 0.6, y: 1.2, z: 0.2 }, { x: 0.9, y: 2, z: -0.1 },
  { x: 1.2, y: 1.2, z: 0.2 }, { x: 1.5, y: 0.5, z: 0 },
  { x: 0.65, y: 1.35, z: 0.1 }, // crossbar
];


// --- Animated SANA Constellation ---
function SanaConstellation({ replayKey }: { replayKey: number }) {
  const [visibleStars, setVisibleStars] = useState(0);
  const groupRef = useRef<any>(null);

  // Animate stars appearing in sequence
  useEffect(() => {
    setVisibleStars(0);
    let i = 0;
    const interval = setInterval(() => {
      setVisibleStars(v => {
        if (v < sanaStarPath.length) return v + 1;
        clearInterval(interval);
        return v;
      });
      i++;
    }, 180); // speed of trail
    return () => clearInterval(interval);
  }, [replayKey]);

  // Twinkle effect
  const [twinkle, setTwinkle] = useState(1);
  useEffect(() => {
    const tw = setInterval(() => setTwinkle(Math.random() * 0.5 + 0.75), 500);
    return () => clearInterval(tw);
  }, []);

  return (
    <group ref={groupRef}>
      {/* Connecting lines */}
      {visibleStars > 1 && (
        <line>
          <bufferGeometry attach="geometry">
  <bufferAttribute
    attach="attributes-position"
    count={sanaStarPath.slice(0, visibleStars).length}
    array={new Float32Array(sanaStarPath.slice(0, visibleStars).flatMap(s => [s.x, s.y, s.z]))}
    itemSize={3}
  />
</bufferGeometry>
          <lineBasicMaterial attach="material" color="#FFD1DC" linewidth={2} />
        </line>
      )}
      {/* Stars */}
      {sanaStarPath.slice(0, visibleStars).map((star, i) => (
        <mesh key={i} position={[star.x, star.y, star.z]}>
          <sphereGeometry args={[0.14 + (i % 3 === 0 ? 0.05 : 0), 24, 24]} />
          <meshStandardMaterial
            color="#FFD1DC"
            emissive="#FFD1DC"
            emissiveIntensity={1.5 * twinkle}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function ConstellationScene() {
  const [replayKey, setReplayKey] = useState(0);

  // Loop the animation every 5 seconds
  useEffect(() => {
    const loop = setInterval(() => setReplayKey(k => k + 1), 5000);
    return () => clearInterval(loop);
  }, []);

  return (
    <div style={{ width: '100vw', height: '60vh', background: 'black' }}>
      <Canvas camera={{ position: [0, 1, 10], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Stars radius={16} depth={50} count={600} factor={2.7} saturation={0.7} fade speed={0.8} />
        <SanaConstellation replayKey={replayKey} />
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
