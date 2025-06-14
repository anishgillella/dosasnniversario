import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const ToTheFuture = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });
  const [isPlaying, setIsPlaying] = useState(false);

  // Listen for audio state changes from the main audio player
  useEffect(() => {
    const checkAudioState = () => {
      const audioElements = document.querySelectorAll('audio');
      if (audioElements.length > 0) {
        const audio = audioElements[0] as HTMLAudioElement;
        setIsPlaying(!audio.paused);
      }
    };

    // Check initial state
    checkAudioState();

    // Listen for play/pause events on any audio element
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    document.addEventListener('play', handlePlay, true);
    document.addEventListener('pause', handlePause, true);

    return () => {
      document.removeEventListener('play', handlePlay, true);
      document.removeEventListener('pause', handlePause, true);
    };
  }, []);

  const handlePlaySong = () => {
    // Find and control the main audio element
    const audioElements = document.querySelectorAll('audio');
    if (audioElements.length > 0) {
      const audio = audioElements[0] as HTMLAudioElement;
      
      if (audio.paused) {
        audio.play().catch(error => {
          console.log("Audio playback failed:", error);
        });
      } else {
        audio.pause();
      }
    }
  };

  return (
    <section ref={sectionRef} className="section min-h-screen py-20 bg-gradient-to-b from-blush/30 to-wine/20">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-playfair font-bold mb-12 text-wine"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            To the Future
          </motion.h2>

          <motion.p
            className="text-2xl md:text-3xl font-playfair italic text-wine/90 mb-16 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Here&apos;s to every day we&apos;ve yet to live together.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <button 
              onClick={handlePlaySong}
              className={`px-8 py-4 rounded-full ${isPlaying ? 'bg-gold' : 'bg-wine'} text-ivory hover:bg-opacity-90 transition-all duration-300 font-inter flex items-center gap-3 mx-auto`}
            >
              {isPlaying ? (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Pause Our Song</span>
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Play Our Song</span>
                </>
              )}
            </button>
          </motion.div>

          <motion.div
            className="mt-16 text-wine/70"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="font-inter">
              April 10, 2023 - Present
            </p>
            <p className="mt-2 font-playfair italic">
              From our first meeting in January to forever...
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToTheFuture;
