'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaChevronLeft, FaChevronRight, FaHeart } from 'react-icons/fa';

const cuteVideos = [
  {
    id: 'cute1',
    src: '/videos/Snapchat-1510783126.mp4',
    title: 'Your Adorable Giggle',
    description: 'The sound that makes my heart skip a beat every single time',
    quote: 'The most wasted of days is one without laughter.',
    author: 'E.E. Cummings',
    childishQuote: 'Giggles are just happiness spilling out! 🤭✨'
  },
  {
    id: 'cute2',
    src: '/videos/Snapchat-226768812.mp4',
    title: 'Being Absolutely Cute',
    description: 'Just being your natural, perfect self - pure magic',
    quote: 'A thing of beauty is a joy forever.',
    author: 'John Keats',
    childishQuote: 'You\'re like a real-life Disney princess! 👑🌟'
  },
  {
    id: 'cute3',
    src: '/videos/Snapchat-269284097.mp4',
    title: 'That Smile I Live For',
    description: 'The smile that lights up my entire world',
    quote: 'We shall never know all the good that a simple smile can do.',
    author: 'Mother Teresa',
    childishQuote: 'Your smile is like sunshine on a rainy day! ☀️😊'
  },
  {
    id: 'cute4',
    src: '/videos/E99DA5CC-A1D6-4B46-80F8-7C4DD378884F.mp4',
    title: 'Pure Cuteness Overload',
    description: 'When you\'re so cute it should be illegal',
    quote: 'The best and most beautiful things cannot be seen or touched - they must be felt with the heart.',
    author: 'Helen Keller',
    childishQuote: 'You\'re cuter than a basket of puppies! 🐶💕'
  },
  {
    id: 'cute5',
    src: '/videos/D4038A22-E77D-4EEF-8CC7-BAC3476E0897.mov',
    title: 'My Favorite Human',
    description: 'Every moment with you is a treasure I keep forever',
    quote: 'You have bewitched me, body and soul.',
    author: 'Jane Austen',
    childishQuote: 'You\'re my favorite person in the whole wide world! 🌍💖'
  },
  {
    id: 'cute6',
    src: '/videos/29A98FFC-0ED2-419A-9EA2-7E07BEFC3C05.mov',
    title: 'Cuteness Redefined',
    description: 'Making ordinary moments extraordinary just by being you',
    quote: 'Beauty begins the moment you decide to be yourself.',
    author: 'Coco Chanel',
    childishQuote: 'You\'re as sweet as cotton candy and sprinkles! 🍭🌈'
  },
];

export default function CutestMoments() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState<{ [key: number]: boolean }>({});
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
  const [showChildish, setShowChildish] = useState(false);

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % cuteVideos.length);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + cuteVideos.length) % cuteVideos.length);
  };

  const togglePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (isPlaying[index]) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(prev => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 py-20 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-300/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -40, -20],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FaHeart className="text-2xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-playfair text-wine mb-6">
            Your Cutest
            <span className="block text-gold italic">Moments</span>
          </h2>
          <p className="text-wine/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Every video captures a piece of my heart. Your smile, your laugh, your perfect imperfections—
            these are the moments I replay in my mind when I miss you.
          </p>
        </motion.div>

        {/* Main Video Display */}
        <div className="mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="relative">
                  <video
                    ref={(el) => { videoRefs.current[currentVideo] = el; }}
                    className="w-full aspect-video object-cover"
                    loop
                    playsInline
                    onPlay={() => setIsPlaying(prev => ({ ...prev, [currentVideo]: true }))}
                    onPause={() => setIsPlaying(prev => ({ ...prev, [currentVideo]: false }))}
                    onLoadedData={() => {
                      const video = videoRefs.current[currentVideo];
                      if (video) {
                        video.volume = 0.7;
                      }
                    }}
                  >
                    <source src={cuteVideos[currentVideo].src} type="video/mp4" />
                    <source src={cuteVideos[currentVideo].src} type="video/mov" />
                  </video>
                  
                  {/* Play/Pause Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      onClick={() => togglePlay(currentVideo)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/90 text-wine rounded-full p-4 shadow-lg"
                    >
                      {isPlaying[currentVideo] ? <FaPause className="text-2xl" /> : <FaPlay className="text-2xl ml-1" />}
                    </motion.button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-playfair text-wine mb-3">
                    {cuteVideos[currentVideo].title}
                  </h3>
                  <p className="text-wine/70 leading-relaxed mb-4">
                    {cuteVideos[currentVideo].description}
                  </p>
                  
                  {/* Quote Section */}
                  <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 border border-pink-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-wine/80">Quote of the Moment</h4>
                      <motion.button
                        onClick={() => setShowChildish(!showChildish)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-pink-300 hover:bg-pink-400 text-white rounded-full px-3 py-1 text-xs font-bold transition-colors"
                      >
                        {showChildish ? '📚 Classic' : '🍭 Childish'}
                      </motion.button>
                    </div>
                    
                    <AnimatePresence mode="wait">
                      {!showChildish ? (
                        <motion.div
                          key="classic"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <blockquote className="text-wine/80 italic text-sm leading-relaxed mb-2">
                            "{cuteVideos[currentVideo].quote}"
                          </blockquote>
                          <cite className="text-pink-600 font-semibold text-xs">
                            — {cuteVideos[currentVideo].author}
                          </cite>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="childish"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="text-purple-600 font-comic text-sm leading-relaxed">
                            {cuteVideos[currentVideo].childishQuote}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-8 mb-12">
          <motion.button
            onClick={prevVideo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-wine text-white rounded-full p-4 shadow-lg hover:bg-wine/90 transition-colors"
          >
            <FaChevronLeft className="text-xl" />
          </motion.button>

          <div className="flex gap-3">
            {cuteVideos.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentVideo(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentVideo ? 'bg-wine' : 'bg-wine/30'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={nextVideo}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-wine text-white rounded-full p-4 shadow-lg hover:bg-wine/90 transition-colors"
          >
            <FaChevronRight className="text-xl" />
          </motion.button>
        </div>

        {/* Video Grid Thumbnails */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cuteVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
                index === currentVideo 
                  ? 'ring-4 ring-wine shadow-2xl' 
                  : 'hover:shadow-xl'
              }`}
              onClick={() => setCurrentVideo(index)}
            >
              <div className="relative">
                <video
                  className="w-full aspect-video object-cover"
                  playsInline
                  onLoadedData={(e) => {
                    const video = e.target as HTMLVideoElement;
                    video.volume = 0.5;
                  }}
                >
                  <source src={video.src} type="video/mp4" />
                  <source src={video.src} type="video/mov" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-white text-xs font-medium truncate">
                    {video.title}
                  </p>
                </div>
                {index === currentVideo && (
                  <div className="absolute top-2 right-2">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="bg-wine text-white rounded-full p-1"
                    >
                      <FaPlay className="text-xs" />
                    </motion.div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Love Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg">
            <p className="text-wine/80 text-lg leading-relaxed italic">
              "Every time I watch these videos, I fall in love with you all over again. 
              Your cuteness isn't just in what you do—it's in who you are. 
              These moments are my daily dose of happiness."
            </p>
            <p className="text-wine font-playfair text-xl mt-4">— Your biggest fan 💕</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 