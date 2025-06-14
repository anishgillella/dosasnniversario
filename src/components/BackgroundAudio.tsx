"use client";
import { useRef, useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Keep track of play/pause state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnded = () => setPlaying(false);
    
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    
    setUserInteracted(true);
    
    try {
      if (playing) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
    } catch (error) {
      console.log("Audio playback failed:", error);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2 bg-black/50 rounded-full shadow-lg px-4 py-2 backdrop-blur-md">
      <audio
        ref={audioRef}
        src="/music/MITRAZ - Akhiyaan (Official Music Video).mp3"
        loop
        preload="auto"
      />
      <button
        aria-label={playing ? "Pause background music" : "Play background music"}
        onClick={togglePlayPause}
        className="text-white hover:text-gold focus:outline-none text-xl transition-colors duration-200"
        style={{ outline: "none", border: "none", background: "none" }}
      >
        {playing ? <FaPause /> : <FaPlay />}
      </button>
      <span className="text-xs text-white/70 font-playfair select-none hidden sm:inline">
        {playing ? "Now Playing: Akhiyaan" : "Click to Play: Akhiyaan"}
      </span>
    </div>
  );
}
