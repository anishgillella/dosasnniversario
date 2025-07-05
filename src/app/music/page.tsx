'use client';

import { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaVolumeUp, FaHeart, FaStar, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface AudioPlayerProps {
  song: {
    title: string;
    filename: string;
    description: string;
    mood: string;
  };
}

function AudioPlayer({ song }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume
    audio.volume = volume;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const onPlayEvent = () => setIsPlaying(true);
    const onPauseEvent = () => setIsPlaying(false);
    const onEndedEvent = () => setIsPlaying(false);
    const onLoadedData = () => {
      console.log('Audio loaded:', song.filename);
    };
    const onError = (e: Event) => {
      console.error('Audio error:', e, 'File:', song.filename);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('loadeddata', onLoadedData);
    audio.addEventListener('play', onPlayEvent);
    audio.addEventListener('pause', onPauseEvent);
    audio.addEventListener('ended', onEndedEvent);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('loadeddata', onLoadedData);
      audio.removeEventListener('play', onPlayEvent);
      audio.removeEventListener('pause', onPauseEvent);
      audio.removeEventListener('ended', onEndedEvent);
      audio.removeEventListener('error', onError);
    };
  }, [song.filename, volume]);

  const togglePlayPause = async () => {
    if (!audioRef.current) return;
    
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Ensure volume is set before playing
        audioRef.current.volume = volume;
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('Audio playing successfully:', song.filename);
        }
      }
    } catch (error) {
      console.error('Audio playback failed:', error);
      console.error('File path:', song.filename);
      console.error('Audio element:', audioRef.current);
      
      // Show user-friendly error
      alert(`Unable to play ${song.title}. Please check if the audio file exists and try again.`);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const newVolume = parseFloat(e.target.value) / 100;
    setVolume(newVolume);
    if (audio) audio.volume = newVolume;
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div>
      <audio ref={audioRef} src={song.filename} preload="auto" />
      
      <div className="mb-6">
        <h3 className="text-2xl font-playfair text-white mb-2">{song.title}</h3>
        <p className="text-pink-200/70">{song.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-pink-200/60 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={progressPercent}
            onChange={handleSeek}
            className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, ${song.mood === 'passionate' ? '#f472b6' : '#a855f7'} 0%, ${song.mood === 'passionate' ? '#f472b6' : '#a855f7'} ${progressPercent}%, rgba(255,255,255,0.1) ${progressPercent}%, rgba(255,255,255,0.1) 100%)`
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mb-6">
        <button
          onClick={togglePlayPause}
          className={`w-16 h-16 ${song.mood === 'passionate' ? 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400' : 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400'} rounded-full flex items-center justify-center text-white text-2xl transition-all duration-300 hover:scale-110 shadow-lg`}
        >
          {isPlaying ? <FaPause /> : <FaPlay className="ml-1" />}
        </button>
      </div>

      <div className="flex items-center justify-center gap-3">
        <FaVolumeUp className={song.mood === 'passionate' ? 'text-pink-300' : 'text-purple-300'} />
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-white/10 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, ${song.mood === 'passionate' ? '#f472b6' : '#a855f7'} 0%, ${song.mood === 'passionate' ? '#f472b6' : '#a855f7'} ${volume * 100}%, rgba(255,255,255,0.1) ${volume * 100}%, rgba(255,255,255,0.1) 100%)`
          }}
        />
      </div>
    </div>
  );
}

export default function MusicPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showLyrics, setShowLyrics] = useState<number | null>(null);

  const songs = [
    {
      title: "Two Years Strong",
      filename: "/music/Sana, Two Years Strong-2.mp3",
      description: "Our journey through every storm and sunshine - the song of our resilient love",
      mood: "passionate"
    },
    {
      title: "Celestial Grace",
      filename: "/music/Sana.mp3", 
      description: "For when you forget how magical you are - a reminder of your infinite worth",
      mood: "ethereal"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {i % 2 === 0 ? (
              <FaHeart className="text-2xl text-pink-300/20" />
            ) : (
              <FaStar className="text-2xl text-purple-300/20" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-pink-200/70 hover:text-pink-200 transition-colors mb-8"
          >
            <FaArrowLeft /> Back to our story
          </Link>
          
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 mb-6">
              Music for You
            </h1>
            <p className="text-xl md:text-2xl text-pink-200/80 max-w-3xl mx-auto leading-relaxed">
              Two songs, straight from my heart to yours. One for our journey, one for your soul.
            </p>
          </div>
        </div>

        {/* Song Tabs */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-black/20 backdrop-blur-xl rounded-full p-1 border border-white/10">
              {songs.map((song, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-3 rounded-full transition-all duration-300 ${
                    activeTab === index
                      ? song.mood === 'passionate'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                        : 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white'
                      : 'text-pink-200/70 hover:text-pink-200'
                  }`}
                >
                  {song.title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Song Display */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Audio Player */}
            <div className="bg-black/30 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
              <AudioPlayer song={songs[activeTab]} />
            </div>

            {/* Song Info & Lyrics Toggle */}
            <div className="space-y-6">
              <div className={`p-6 rounded-2xl border ${
                songs[activeTab].mood === 'passionate' 
                  ? 'bg-pink-500/10 border-pink-300/20' 
                  : 'bg-purple-500/10 border-purple-300/20'
              }`}>
                <h3 className="text-2xl font-playfair text-white mb-3">
                  {songs[activeTab].mood === 'passionate' ? 'Our Battle Song' : 'Your Celestial Anthem'}
                </h3>
                <p className="text-pink-200/80 leading-relaxed mb-4">
                  {songs[activeTab].description}
                </p>
                <button
                  onClick={() => setShowLyrics(showLyrics === activeTab ? null : activeTab)}
                  className={`${
                    songs[activeTab].mood === 'passionate'
                      ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-300/30 hover:from-pink-500/30 hover:to-rose-500/30'
                      : 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-300/30 hover:from-purple-500/30 hover:to-indigo-500/30'
                  } border rounded-full px-6 py-2 text-pink-200 transition-all duration-300 backdrop-blur-sm`}
                >
                  {showLyrics === activeTab ? 'Hide' : 'Show'} Lyrics
                </button>
              </div>

              {/* Message for Sana */}
              <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-gold/20">
                <h4 className="text-xl font-playfair text-gold mb-3">
                  {songs[activeTab].mood === 'passionate' ? 'For Us' : 'For You, My Star'}
                </h4>
                <p className="text-pink-200/70 leading-relaxed">
                  {songs[activeTab].mood === 'passionate' 
                    ? "This is our story - every fight, every kiss, every moment we chose each other. Through chaos and calm, we're unbreakable."
                    : "When the world feels heavy and you forget your magic, play this. You are galaxies and stardust, grace and fire. Never forget how extraordinary you are."
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Lyrics Display */}
          {showLyrics === activeTab && (
            <div className="mt-12 max-w-5xl mx-auto">
              <div className="bg-black/20 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-playfair text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-purple-200 mb-2">
                    {songs[activeTab].title} - Lyrics
                  </h3>
                  <p className="text-pink-200/60">The words that capture our story</p>
                </div>
                
                <div className="space-y-8">
                  {activeTab === 0 ? (
                    // Two Years Strong Lyrics
                    <>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="animate-fadeInUp">
                          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-2xl p-6 border border-pink-300/20">
                            <h4 className="text-xl font-playfair text-pink-200 mb-3">Where It All Began</h4>
                            <div className="text-pink-200/80 leading-relaxed space-y-1">
                              <p><em>"Two years back we took the dive"</em></p>
                              <p><em>"Through storms and sun we've stayed alive"</em></p>
                              <p><em>"Every fight left scars that burned"</em></p>
                              <p><em>"But in your arms, I always returned"</em></p>
                            </div>
                          </div>
                        </div>
                        <div className="animate-fadeInUp animation-delay-200">
                          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-300/20">
                            <h4 className="text-xl font-playfair text-pink-200 mb-3">Your Crown</h4>
                            <div className="text-pink-200/80 leading-relaxed space-y-1">
                              <p><em>"We've thrown words sharp like a blade"</em></p>
                              <p><em>"But love's the glue that never fades"</em></p>
                              <p><em>"Your laughter heals, your tears can drown"</em></p>
                              <p className="text-gold font-medium"><em>"But Sana, you still wear the crown"</em></p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="animate-fadeInUp animation-delay-400">
                        <div className="bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 rounded-3xl p-8 border-2 border-pink-300/30 animate-pulse-slow">
                          <h4 className="text-2xl font-playfair text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-gold mb-4">
                            Our Heart's Chorus
                          </h4>
                          <div className="text-center text-pink-200/90 text-lg leading-relaxed space-y-2">
                            <p className="text-xl"><em>"Countless fights, countless kisses"</em></p>
                            <p className="text-xl"><em>"You're the chaos my heart misses"</em></p>
                            <p className="text-xl"><em>"Through the wreckage, through the fire"</em></p>
                            <p className="text-2xl text-gold font-medium"><em>"Sana, you're my one desire"</em></p>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="animate-fadeInUp animation-delay-600">
                          <div className="bg-gradient-to-br from-rose-500/10 to-purple-500/10 rounded-2xl p-6 border border-rose-300/20">
                            <h4 className="text-xl font-playfair text-pink-200 mb-3">Wild Ride</h4>
                            <div className="text-pink-200/80 leading-relaxed space-y-1">
                              <p><em>"We've broken plates, we've mended hearts"</em></p>
                              <p><em>"Pulled ourselves back from falling apart"</em></p>
                              <p><em>"Your stubborn smile, my foolish pride"</em></p>
                              <p><em>"But we're stronger on this wild ride"</em></p>
                            </div>
                          </div>
                        </div>
                        <div className="animate-fadeInUp animation-delay-800">
                          <div className="bg-gradient-to-br from-gold/10 to-pink-500/10 rounded-2xl p-6 border border-gold/30">
                            <h4 className="text-xl font-playfair text-gold mb-3">Still Growing</h4>
                            <div className="text-pink-200/80 leading-relaxed space-y-1">
                              <p><em>"Two years in, and still we grow"</em></p>
                              <p><em>"With every high, with every low"</em></p>
                              <p><em>"If love's a war, then we've survived"</em></p>
                              <p className="text-gold font-medium"><em>"Sana, you keep my soul alive"</em></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Celestial Grace Lyrics
                    <>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="animate-fadeInUp">
                          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 border border-purple-300/20">
                            <h4 className="text-xl font-playfair text-purple-200 mb-3">Golden Light</h4>
                            <div className="text-purple-200/80 leading-relaxed space-y-1">
                              <p><em>"Golden light falls where she stands"</em></p>
                              <p><em>"Autumn breath held in her hands"</em></p>
                              <p><em>"Stillness deeper than the night"</em></p>
                              <p><em>"Eyes that pull the stars to light"</em></p>
                            </div>
                          </div>
                        </div>
                        <div className="animate-fadeInUp animation-delay-200">
                          <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-300/20">
                            <h4 className="text-xl font-playfair text-indigo-200 mb-3">Moonlight</h4>
                            <div className="text-indigo-200/80 leading-relaxed space-y-1">
                              <p><em>"Moonlight resting on her skin"</em></p>
                              <p><em>"Every step a storm within"</em></p>
                              <p><em>"Whispers rise with every breath"</em></p>
                              <p><em>"Like the silence after death"</em></p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="animate-fadeInUp animation-delay-400">
                        <div className="bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-3xl p-8 border-2 border-purple-300/30 animate-pulse-slow">
                          <h4 className="text-2xl font-playfair text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-gold mb-4">
                            Galaxies Behind Her Eyes
                          </h4>
                          <div className="text-center text-purple-200/90 text-lg leading-relaxed space-y-2">
                            <p className="text-xl"><em>"She's got galaxies behind her eyes"</em></p>
                            <p className="text-xl"><em>"A universe in soft disguise"</em></p>
                            <p className="text-xl"><em>"Time slows down when she walks through space"</em></p>
                            <p className="text-2xl text-gold font-medium"><em>"Wrapped in fire, in celestial grace"</em></p>
                          </div>
                        </div>
                      </div>

                      <div className="animate-fadeInUp animation-delay-600">
                        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl p-6 border border-indigo-300/30">
                          <h4 className="text-xl font-playfair text-indigo-200 mb-3">Dark Infinity</h4>
                          <div className="text-indigo-200/80 leading-relaxed space-y-1">
                            <p><em>"She's not of earth, nor air, nor sea—"</em></p>
                            <p><em>"She moves like dark infinity"</em></p>
                            <p><em>"You look once and never the same"</em></p>
                            <p><em>"Touched by stardust, lost in her name"</em></p>
                          </div>
                        </div>
                      </div>

                      <div className="animate-fadeInUp animation-delay-800">
                        <div className="bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-pink-500/20 rounded-3xl p-8 border-2 border-purple-300/30">
                          <h4 className="text-2xl font-playfair text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200 mb-4">
                            Living Myth
                          </h4>
                          <div className="text-center text-purple-200/90 text-lg leading-relaxed space-y-2">
                            <p className="text-lg"><em>"She's got galaxies behind her eyes"</em></p>
                            <p className="text-lg"><em>"Where even heaven looks and sighs"</em></p>
                            <p className="text-lg"><em>"She burns slow in her quiet place—"</em></p>
                            <p className="text-xl text-gold font-medium italic">A living myth... in celestial grace</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(244, 114, 182, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: currentColor;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(244, 114, 182, 0.4);
        }
      `}</style>
    </div>
  );
} 