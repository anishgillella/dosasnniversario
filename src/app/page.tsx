'use client';

import SmoothScroll from '@/components/SmoothScroll';
import HeroSection from '@/components/HeroSection';
import HowWeMet from '@/components/HowWeMet';
import FavoriteMemories from '@/components/FavoriteMemories';
import ThingsILove from '@/components/ThingsILove';
import CutestMoments from '@/components/CutestMoments';
import OurKiss from '@/components/OurKiss';
import LoveLetter from '@/components/LoveLetter';
import ToTheFuture from '@/components/ToTheFuture';
import SecretBoxes from '@/components/OurAdventures';
import CustomCursor from '@/components/CustomCursor';
import FloatingParticles from '@/components/FloatingParticles';
import SanaChatButton from '@/components/SanaChatButton';
import FallingPanda from '@/components/FallingPanda';
import BackgroundAudio from '@/components/BackgroundAudio';


export default function Home() {
  return (
    <>
      <CustomCursor />
      <FloatingParticles />
      <FallingPanda />
      <SanaChatButton />
      <BackgroundAudio />
      <SmoothScroll>
        <main className="scroll-container">
          <HeroSection />
          <HowWeMet />
          <FavoriteMemories />
          <ThingsILove />
          <CutestMoments />
          <OurKiss />
          <LoveLetter />
          <ToTheFuture />
          <SecretBoxes />
        </main>
      </SmoothScroll>
    </>
  );
}
