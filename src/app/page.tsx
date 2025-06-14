'use client';

import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import HowWeMet from '@/components/HowWeMet';
import FavoriteMemories from '@/components/FavoriteMemories';
import ThingsILove from '@/components/ThingsILove';
import LoveLetter from '@/components/LoveLetter';
import ToTheFuture from '@/components/ToTheFuture';
import SecretBoxes from '@/components/OurAdventures';
import CustomCursor from '@/components/CustomCursor';
import FloatingParticles from '@/components/FloatingParticles';
import SanaChatButton from '@/components/SanaChatButton';
import FallingPanda from '@/components/FallingPanda';

export default function Home() {
  return (
    <>
      <CustomCursor />
      <FloatingParticles />
      <FallingPanda />
      <SanaChatButton />
      <SmoothScroll>
        <main className="scroll-container">
          <HeroSection />
          <HowWeMet />
          <FavoriteMemories />
          <ThingsILove />
          <LoveLetter />
          <ToTheFuture />
          <SecretBoxes />
        </main>
      </SmoothScroll>
    </>
  );
}
