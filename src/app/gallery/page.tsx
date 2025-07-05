"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Sparkles, Quote, Upload, X } from "lucide-react";

// Pool of quotes for new uploads
const quotePool = [
  { quote: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu" },
  { quote: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle" },
  { quote: "The greatest happiness of life is the conviction that we are loved.", author: "Victor Hugo" },
  { quote: "Love is not only something you feel, it is something you do.", author: "David Wilkerson" },
  { quote: "We loved with a love that was more than love.", author: "Edgar Allan Poe" },
  { quote: "Love is the bridge between two hearts.", author: "Unknown" },
  { quote: "In dreams and in love there are no impossibilities.", author: "János Arany" },
  { quote: "Love is a canvas furnished by nature and embroidered by imagination.", author: "Voltaire" },
  { quote: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn" },
  { quote: "Love recognizes no barriers.", author: "Maya Angelou" }
];

// Video collection - Sana's cutest moments
const cuteVideos = [
  {
    id: 'video1',
    src: "/videos/Snapchat-1510783126.mp4",
    caption: "your adorable giggle",
    rotation: -4,
    position: { x: 25, y: 25 },
    quote: "The most wasted of days is one without laughter.",
    author: "E.E. Cummings",
    childishQuote: "Giggles are just happiness spilling out! 🤭✨"
  },
  {
    id: 'video2', 
    src: "/videos/Snapchat-226768812.mp4",
    caption: "being absolutely cute",
    rotation: 6,
    position: { x: 70, y: 45 },
    quote: "A thing of beauty is a joy forever.",
    author: "John Keats",
    childishQuote: "You're like a real-life Disney princess! 👑🌟"
  },
  {
    id: 'video3',
    src: "/videos/Snapchat-269284097.mp4", 
    caption: "that smile I live for",
    rotation: -7,
    position: { x: 15, y: 55 },
    quote: "We shall never know all the good that a simple smile can do.",
    author: "Mother Teresa",
    childishQuote: "Your smile is like sunshine on a rainy day! ☀️😊"
  },
  {
    id: 'video4',
    src: "/videos/E99DA5CC-A1D6-4B46-80F8-7C4DD378884F.mp4",
    caption: "pure cuteness overload", 
    rotation: 3,
    position: { x: 55, y: 75 },
    quote: "The best and most beautiful things cannot be seen or touched - they must be felt with the heart.",
    author: "Helen Keller",
    childishQuote: "You're cuter than a basket of puppies! 🐶💕"
  },
  {
    id: 'video5',
    src: "/videos/D4038A22-E77D-4EEF-8CC7-BAC3476E0897.mov",
    caption: "my favorite human",
    rotation: -2,
    position: { x: 80, y: 25 },
    quote: "You have bewitched me, body and soul.",
    author: "Jane Austen",
    childishQuote: "You're my favorite person in the whole wide world! 🌍💖"
  },
  {
    id: 'video6',
    src: "/videos/29A98FFC-0ED2-419A-9EA2-7E07BEFC3C05.mov",
    caption: "cuteness redefined",
    rotation: 5,
    position: { x: 45, y: 15 },
    quote: "Beauty begins the moment you decide to be yourself.",
    author: "Coco Chanel",
    childishQuote: "You're as sweet as cotton candy and sprinkles! 🍭🌈"
  }
];

const initialImages = [
  { 
    id: 'img1',
    src: "/images/IMG_0413.jpg", 
    caption: "where it all began",
    rotation: -5,
    position: { x: 10, y: 5 },
    quote: "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    author: "Maya Angelou"
  },
  { 
    id: 'img2',
    src: "/images/IMG_0522.jpg", 
    caption: "golden hour with you",
    rotation: 3,
    position: { x: 60, y: 15 },
    quote: "I have waited for this opportunity for more than half a century, to repeat to you once again my vow of eternal fidelity and everlasting love.",
    author: "Gabriel García Márquez"
  },
  { 
    id: 'img3',
    src: "/images/IMG_1959.jpg", 
    caption: "your smile, my world",
    rotation: -3,
    position: { x: 35, y: 40 },
    quote: "Whatever our souls are made of, his and mine are the same.",
    author: "Emily Brontë"
  },
  { 
    id: 'img4',
    src: "/images/IMG_1993.JPG", 
    caption: "dancing under stars",
    rotation: 7,
    position: { x: 80, y: 35 },
    quote: "I would rather spend one lifetime with you, than face all the ages of this world alone.",
    author: "J.R.R. Tolkien"
  },
  { 
    id: 'img5',
    src: "/images/IMG_2052.jpg", 
    caption: "adventures & you",
    rotation: -8,
    position: { x: 15, y: 65 },
    quote: "The best love is the kind that awakens the soul and makes us reach for more, that plants a fire in our hearts and brings peace to our minds.",
    author: "Nicholas Sparks"
  },
  { 
    id: 'img6',
    src: "/images/IMG_2580.jpg", 
    caption: "perfectly us",
    rotation: 4,
    position: { x: 55, y: 70 },
    quote: "When you realize you want to spend the rest of your life with somebody, you want the rest of your life to start as soon as possible.",
    author: "When Harry Met Sally"
  },
  { 
    id: 'img7',
    src: "/images/IMG-20240515-WA0065.jpg", 
    caption: "still falling",
    rotation: -6,
    position: { x: 85, y: 60 },
    quote: "I love you without knowing how, or when, or from where. I love you simply, without problems or pride.",
    author: "Pablo Neruda"
  },
  { 
    id: 'img8',
    src: "/images/PXL_20240513_231040844.MP.jpg", 
    caption: "midnight dreams",
    rotation: 2,
    position: { x: 40, y: 85 },
    quote: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.",
    author: "Dr. Seuss"
  },
];

function VideoPolaroidFrame({ video, index, onUpdatePosition }: {
  video: any;
  index: number;
  onUpdatePosition: (id: string, position: { x: number, y: number }) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showChildish, setShowChildish] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFlipped) return;
    e.preventDefault();
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
      setIsDragging(true);
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current?.parentElement) {
        const parent = elementRef.current.parentElement.getBoundingClientRect();
        const x = ((e.clientX - parent.left - dragOffset.x) / parent.width) * 100;
        const y = ((e.clientY - parent.top - dragOffset.y) / parent.height) * 100;
        
        const constrainedX = Math.max(5, Math.min(95, x));
        const constrainedY = Math.max(5, Math.min(95, y));
        
        onUpdatePosition(video.id, { x: constrainedX, y: constrainedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, video.id, onUpdatePosition]);

  return (
    <motion.div
      ref={elementRef}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: isFlipped ? 0 : video.rotation,
      }}
      whileHover={{ 
        scale: isDragging ? 1 : 1.05, 
        rotate: isDragging ? video.rotation : 0,
        zIndex: 20,
        transition: { duration: 0.3 }
      }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
      className={`absolute preserve-3d ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
      style={{ 
        left: `${video.position.x}%`, 
        top: `${video.position.y}%`,
        transform: `translate(-50%, -50%) ${isDragging ? 'translateY(-5px) translateX(5px)' : ''}`,
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onClick={(e) => {
        if (!isDragging && e.detail === 1) {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <motion.div
        className="relative group"
        style={{ 
          transformStyle: 'preserve-3d',
          rotateY: isFlipped ? 180 : 0 
        }}
        transition={{ duration: 0.6 }}
      >
        {/* Front - Video */}
        <div className="backface-hidden">
          <div className="bg-white p-4 rounded-lg shadow-2xl w-64 h-80 relative overflow-hidden border-2 border-gray-100">
            <div className="relative h-48 mb-4 bg-gray-200 rounded overflow-hidden group">
              <video
                ref={videoRef}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loop
                playsInline
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onLoadedData={() => {
                  if (videoRef.current) {
                    videoRef.current.volume = 0.7;
                  }
                }}
              >
                <source src={video.src} type="video/mp4" />
                <source src={video.src} type="video/mov" />
              </video>
              
              {/* Play/Pause overlay */}
              <div 
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="bg-white/80 rounded-full p-3"
                >
                  {isPlaying ? (
                    <div className="w-4 h-4 flex gap-1">
                      <div className="w-1.5 h-4 bg-gray-800"></div>
                      <div className="w-1.5 h-4 bg-gray-800"></div>
                    </div>
                  ) : (
                    <div className="w-4 h-4 border-l-8 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent ml-1"></div>
                  )}
                </motion.div>
              </div>
            </div>
            
            <div className="space-y-2">
              <p className="text-gray-800 font-handwriting text-lg text-center">{video.caption}</p>
              <div className="flex justify-center">
                <span className="text-pink-500 text-sm">💕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Quotes */}
        <div className="backface-hidden absolute inset-0" style={{ transform: 'rotateY(180deg)' }}>
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 p-4 rounded-lg shadow-2xl w-64 h-80 flex flex-col justify-center items-center text-center border-2 border-pink-100 relative">
            {/* Toggle Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowChildish(!showChildish);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-2 right-2 bg-pink-300 hover:bg-pink-400 text-white rounded-full p-2 text-xs font-bold shadow-lg"
            >
              {showChildish ? '🎩' : '🍭'}
            </motion.button>

            <AnimatePresence mode="wait">
              {!showChildish ? (
                <motion.div
                  key="classic"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center items-center h-full"
                >
                  <Quote className="w-6 h-6 text-pink-400 mb-3" />
                  <blockquote className="text-gray-700 font-serif italic text-sm leading-relaxed mb-3">
                    "{video.quote}"
                  </blockquote>
                  <cite className="text-pink-600 font-semibold text-xs">— {video.author}</cite>
                  <div className="mt-4 flex space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360] 
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.2 
                        }}
                        className="text-pink-400 text-lg"
                      >
                        💖
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="childish"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-center items-center h-full"
                >
                  <div className="text-4xl mb-3">🌈</div>
                  <p className="text-purple-600 font-comic text-lg leading-relaxed mb-4 text-center">
                    {video.childishQuote}
                  </p>
                  <div className="flex space-x-1">
                    {['🎀', '✨', '🦄', '🌸', '💫'].map((emoji, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          y: [0, -5, 0],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 1, 
                          repeat: Infinity, 
                          delay: i * 0.1 
                        }}
                        className="text-lg"
                      >
                        {emoji}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PolaroidFrame({ image, index, onUpdatePosition, onRemove, isUploaded }: { 
  image: any; 
  index: number; 
  onUpdatePosition: (id: string, position: { x: number, y: number }) => void;
  onRemove?: (id: string) => void;
  isUploaded?: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isFlipped) return;
    e.preventDefault();
    const rect = elementRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
      setIsDragging(true);
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (elementRef.current?.parentElement) {
        const parent = elementRef.current.parentElement.getBoundingClientRect();
        const x = ((e.clientX - parent.left - dragOffset.x) / parent.width) * 100;
        const y = ((e.clientY - parent.top - dragOffset.y) / parent.height) * 100;
        
        // Constrain to bounds
        const constrainedX = Math.max(5, Math.min(95, x));
        const constrainedY = Math.max(5, Math.min(95, y));
        
        onUpdatePosition(image.id, { x: constrainedX, y: constrainedY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, image.id, onUpdatePosition]);

  return (
    <>
      <motion.div
        ref={elementRef}
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          rotate: isFlipped ? 0 : image.rotation,
        }}
        whileHover={{ 
          scale: isDragging ? 1 : 1.05, 
          rotate: isDragging ? image.rotation : 0,
          zIndex: 20,
          transition: { duration: 0.3 }
        }}
        transition={{ 
          delay: index * 0.1,
          duration: 0.8,
          type: "spring",
          stiffness: 100
        }}
        className={`absolute preserve-3d ${isDragging ? 'cursor-grabbing z-50' : 'cursor-grab'}`}
        style={{ 
          left: `${image.position.x}%`, 
          top: `${image.position.y}%`,
          transform: `translate(-50%, -50%) ${isDragging ? 'translateY(-5px) translateX(5px)' : ''}`,
          transformStyle: 'preserve-3d',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={handleMouseDown}
        onClick={(e) => {
          if (!isDragging && e.detail === 1) {
            setIsFlipped(!isFlipped);
          }
        }}
      >
        {/* Remove button for uploaded images */}
        {isUploaded && isHovered && !isFlipped && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 z-10"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.(image.id);
            }}
          >
            <X size={16} />
          </motion.button>
        )}

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div className="bg-white p-4 pb-16 shadow-2xl rounded-sm backface-hidden">
            <div className="relative w-64 h-64 overflow-hidden">
              <Image
                src={image.src}
                alt={image.caption}
                fill
                className="object-cover filter grayscale-[20%] contrast-110"
                unoptimized={isUploaded}
              />
              {/* Film grain overlay */}
              <div className="absolute inset-0 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`
                }}
              />
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-6 left-0 right-0 text-center">
              <p className="font-mono text-gray-700 text-sm tracking-wider">
                {image.caption}
              </p>
              <div className="flex justify-center mt-1">
                <motion.div
                  animate={{ 
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 5 
                  }}
                  className="text-pink-400"
                >
                  <Sparkles size={16} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-pink-50 p-4 shadow-2xl rounded-sm backface-hidden rotate-y-180">
            <div className="h-full flex flex-col justify-center items-center px-6 py-8">
              <Quote className="text-pink-300 mb-4" size={24} />
              <p className="text-gray-700 text-center text-sm leading-relaxed mb-4 italic">
                "{image.quote}"
              </p>
              <p className="text-gray-500 text-xs tracking-wider">
                — {image.author}
              </p>
              
              {/* View full image button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowLightbox(true);
                }}
                className="mt-6 text-xs text-pink-400 hover:text-pink-600 transition-colors underline underline-offset-2"
              >
                view photo
              </button>
            </div>
          </div>
        </motion.div>

        {/* Tape effect */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-yellow-100/80 rotate-12 shadow-md" />
      </motion.div>

      {/* Fullscreen view */}
      {showLightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-8"
          onClick={() => setShowLightbox(false)}
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 15 }}
            className="relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white p-8 pb-20 shadow-2xl rounded-sm max-w-2xl">
              <div className="relative w-full aspect-square max-h-[70vh]">
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-contain"
                  unoptimized={isUploaded}
                />
              </div>
              <p className="absolute bottom-8 left-0 right-0 text-center font-mono text-gray-700 text-lg tracking-wider">
                {image.caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState(initialImages);
  const [galleryVideos, setGalleryVideos] = useState(cuteVideos);
  const [uploadedImages, setUploadedImages] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('anniversary-gallery');
    if (saved) {
      const { positions, uploaded } = JSON.parse(saved);
      
      // Update positions of initial images
      if (positions) {
        setGalleryImages(prev => prev.map(img => ({
          ...img,
          position: positions[img.id] || img.position
        })));
      }
      
      // Load uploaded images
      if (uploaded) {
        setUploadedImages(uploaded);
      }
    }
  }, []);

  // Save to localStorage
  const saveToLocalStorage = (images: any[], uploaded: any[]) => {
    const positions: any = {};
    images.forEach(img => {
      positions[img.id] = img.position;
    });
    
    localStorage.setItem('anniversary-gallery', JSON.stringify({
      positions,
      uploaded
    }));
  };

  const updateImagePosition = (id: string, position: { x: number, y: number }) => {
    setGalleryImages(prev => {
      const updated = prev.map(img => 
        img.id === id ? { ...img, position } : img
      );
      saveToLocalStorage(updated, uploadedImages);
      return updated;
    });
    
    setGalleryVideos(prev => {
      const updated = prev.map(video => 
        video.id === id ? { ...video, position } : video
      );
      return updated;
    });
    
    setUploadedImages(prev => {
      const updated = prev.map(img => 
        img.id === id ? { ...img, position } : img
      );
      saveToLocalStorage(galleryImages, updated);
      return updated;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const randomQuote = quotePool[Math.floor(Math.random() * quotePool.length)];
        const newImage = {
          id: `upload_${Date.now()}_${index}`,
          src: event.target?.result as string,
          caption: `memory #${uploadedImages.length + galleryImages.length + 1}`,
          rotation: Math.random() * 20 - 10,
          position: {
            x: Math.random() * 60 + 20,
            y: Math.random() * 60 + 20
          },
          quote: randomQuote.quote,
          author: randomQuote.author
        };
        
        setUploadedImages(prev => {
          const updated = [...prev, newImage];
          saveToLocalStorage(galleryImages, updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
  };

  const removeUploadedImage = (id: string) => {
    setUploadedImages(prev => {
      const updated = prev.filter(img => img.id !== id);
      saveToLocalStorage(galleryImages, updated);
      return updated;
    });
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 relative overflow-hidden"
    >
      {/* Add styles for 3D transforms */}
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Upload button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 bg-pink-400 hover:bg-pink-500 text-white rounded-full p-4 shadow-lg z-40 transition-colors"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={24} />
      </motion.button>
      
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={handleFileUpload}
      />

      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)`
          }}
        />
      </div>

      {/* Parallax background elements */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-rose-300 rounded-full blur-3xl" />
      </motion.div>

      <div className="relative z-10 px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-32"
        >
          <h1 className="text-6xl md:text-8xl font-light text-gray-800 mb-4 tracking-tight">
            moments
          </h1>
          <p className="text-gray-600 text-lg font-light tracking-widest lowercase">
            captured in time, preserved in love
          </p>
          <p className="text-gray-400 text-sm mt-4 italic">
            click to flip • drag to move • hover videos to play • upload to add
          </p>
        </motion.div>

        {/* Gallery Container */}
        <div className="relative max-w-7xl mx-auto h-[150vh]">
          {/* Decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-10 right-10 text-gray-400 font-mono text-sm"
          >
            2023 - ∞
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-10 left-10 text-gray-400 font-mono text-sm"
          >
            {galleryImages.length + uploadedImages.length + galleryVideos.length} memories & counting...
          </motion.div>

          {/* Polaroid Photos */}
          {galleryImages.map((image, index) => (
            <PolaroidFrame 
              key={image.id} 
              image={image} 
              index={index} 
              onUpdatePosition={updateImagePosition}
            />
          ))}
          
          {/* Uploaded Photos */}
          {uploadedImages.map((image, index) => (
            <PolaroidFrame 
              key={image.id} 
              image={image} 
              index={galleryImages.length + index} 
              onUpdatePosition={updateImagePosition}
              onRemove={removeUploadedImage}
              isUploaded
            />
          ))}

          {/* Video Polaroids - Sana's Cutest Moments */}
          {galleryVideos.map((video, index) => (
            <VideoPolaroidFrame 
              key={video.id} 
              video={video} 
              index={galleryImages.length + uploadedImages.length + index} 
              onUpdatePosition={updateImagePosition}
            />
          ))}
        </div>

        {/* Footer text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mt-32 mb-16"
        >
          <p className="text-gray-500 font-light italic">
            "every photo tells a story, but our story is my favorite"
          </p>
        </motion.div>
      </div>
    </div>
  );
} 