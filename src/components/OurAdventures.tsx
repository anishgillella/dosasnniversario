import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Gift, Lock, Eye, Heart, Sparkles } from 'lucide-react';

const boxMessages = [
  {
    title: "🤫 A Secret Just for Sana",
    subtitle: "psst... don't tell anyone!",
    instruction: "Click the mysterious box to reveal the secret...",
    curiosity: "What could be inside? 🤔"
  },
  {
    title: "🎁 Another Layer!",
    subtitle: "wait, there's more?",
    instruction: "Keep going... this secret has layers!",
    curiosity: "Getting warmer... what's the big surprise? 😏"
  },
  {
    title: "📦 Box #3 Unlocked!",
    subtitle: "the plot thickens...",
    instruction: "You're doing great! One more click...",
    curiosity: "I can feel something special coming! ✨"
  },
  {
    title: "🎀 Almost There!",
    subtitle: "your patience is admirable",
    instruction: "This is it... the final box!",
    curiosity: "The anticipation is killing me! What is it?! 🥺"
  },
  {
    title: "🎯 The Final Reveal!",
    subtitle: "drumroll please...",
    instruction: "Click for the grand finale!",
    curiosity: "HERE WE GO! 🎊"
  }
];

const SecretBoxes = () => {
  const [currentBox, setCurrentBox] = useState(0);
  const [showFinalCard, setShowFinalCard] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const handleBoxClick = () => {
    console.log('Box clicked!', { currentBox, isOpening }); // Debug logging
    if (isOpening) return; // Prevent multiple clicks during animation
    
    setIsOpening(true);
    console.log('Starting opening animation'); // Debug logging
    
    setTimeout(() => {
      if (currentBox < boxMessages.length - 1) {
        setCurrentBox(currentBox + 1);
        setIsOpening(false);
        console.log('Moving to next box:', currentBox + 1); // Debug logging
      } else {
        setShowFinalCard(true);
        setIsOpening(false);
        console.log('Showing final card'); // Debug logging
      }
    }, 2000); // Increased duration for the full opening sequence
  };

  const getBoxSize = () => {
    const baseSize = 300;
    const reduction = currentBox * 40;
    return Math.max(200, baseSize - reduction);
  };

  if (showFinalCard) {
    return (
      <section ref={sectionRef} className="section min-h-screen py-20 bg-blush/40 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-orange-300 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-4 right-4 text-orange-400"
            >
              <Sparkles size={32} />
            </motion.div>
            
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-4 left-4 text-red-400"
            >
              <Heart size={24} />
            </motion.div>

            {/* Story card content */}
            <div className="text-center">
              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-4xl font-bold text-orange-800 mb-6"
              >
                🎭 Story Time! 📚
              </motion.h2>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200"
              >
                <p className="text-3xl font-semibold text-orange-900 mb-4 leading-relaxed text-center">
                  "Ek gaon mein kisaan rehta tha..."
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 }}
                className="mt-6"
              >
                <p className="text-orange-600 text-sm italic">
                  Was this worth all those boxes? 😄✨
                </p>
                <p className="text-orange-500 text-xs mt-2">
                  Remember... this is our little secret! 🤫💖
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="section min-h-screen py-20 bg-blush/40">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-wine text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chapter 6: A Secret for Sana
        </motion.h2>

        <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8">
          {/* Current message */}
        <motion.div
            key={currentBox}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8 max-w-md"
        >
            <h3 className="text-2xl font-semibold text-wine mb-2">
              {boxMessages[currentBox].title}
            </h3>
            <p className="text-wine/70 mb-4 italic">
              {boxMessages[currentBox].subtitle}
            </p>
            <p className="text-wine/90 mb-2">
              {boxMessages[currentBox].instruction}
            </p>
            <motion.p
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-wine/60 text-sm"
            >
              {boxMessages[currentBox].curiosity}
            </motion.p>
          </motion.div>

          {/* Simple Aesthetic Boxes */}
          <div className="relative flex items-center justify-center my-16" style={{ minHeight: '300px' }}>
            {Array.from({ length: boxMessages.length - currentBox }, (_, index) => {
              const boxIndex = currentBox + index;
              const size = 180 + (index * 25);
              const isClickable = index === 0;
              
              return (
                <motion.div
                  key={boxIndex}
                  className="absolute"
                style={{ 
                    width: `${size}px`,
                    height: `${size}px`,
                    zIndex: isClickable ? 100 : 10 - index,
                    cursor: isClickable ? 'pointer' : 'default',
                    pointerEvents: isClickable ? 'auto' : 'none'
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: isOpening && isClickable ? 0 : 1 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1 
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log('OUTER DIV CLICKED!', { isClickable, isOpening, currentBox });
                    if (isClickable && !isOpening) {
                      handleBoxClick();
                    }
                  }}
                  onMouseEnter={() => console.log('Mouse entered box', { isClickable, currentBox })}
                >
                  <motion.div
                    className={`w-full h-full rounded-2xl shadow-xl transition-all duration-300 ${
                      isClickable 
                        ? 'bg-gradient-to-br from-rose-100 to-rose-200 border-2 border-rose-300 hover:from-rose-200 hover:to-rose-300 hover:shadow-2xl' 
                        : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200'
                    }`}
                    whileHover={isClickable && !isOpening ? { scale: 1.02, y: -2 } : {}}
                    whileTap={isClickable && !isOpening ? { scale: 0.98 } : {}}
                    animate={{
                      scale: isOpening && isClickable ? [1, 1.1, 0] : 1,
                      rotateY: isOpening && isClickable ? [0, 15, 0] : 0,
                    }}
                    transition={{ 
                      duration: isOpening ? 1 : 0.3,
                      ease: "easeInOut"
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log('INNER DIV CLICKED!', { isClickable, isOpening, currentBox });
                      if (isClickable && !isOpening) {
                        handleBoxClick();
                      }
                    }}
              >
                    {/* Minimalist ribbon across */}
                    <div className={`absolute top-1/2 left-0 w-full h-1 transform -translate-y-1/2 ${
                      isClickable ? 'bg-rose-400' : 'bg-gray-300'
                    } transition-all duration-300 pointer-events-none`} />
                    
                    {/* Minimalist ribbon down */}
                    <div className={`absolute top-0 left-1/2 w-1 h-full transform -translate-x-1/2 ${
                      isClickable ? 'bg-rose-400' : 'bg-gray-300'
                    } transition-all duration-300 pointer-events-none`} />

                    {/* Center icon */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <motion.div
                        className={`${isClickable ? 'text-rose-600' : 'text-gray-400'} transition-colors duration-300`}
                        animate={{ 
                          rotate: isOpening && isClickable ? 360 : 0,
                          scale: isOpening && isClickable ? [1, 1.2, 0] : 1
                        }}
                        transition={{ duration: isOpening ? 1 : 0.5 }}
                      >
                        {currentBox === 0 ? (
                          <Lock size={28} />
                        ) : currentBox === 1 ? (
                          <Gift size={28} />
                        ) : currentBox === 2 ? (
                          <Eye size={28} />
                        ) : currentBox === 3 ? (
                          <Heart size={28} />
                        ) : (
                          <Sparkles size={28} />
                        )}
                      </motion.div>
                    </div>

                    {/* Simple opening effect */}
                    {isOpening && isClickable && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>

                  {/* Debug overlay for clickable box */}
                  {isClickable && (
                    <div 
                      className="absolute inset-0 bg-red-500/10 border-2 border-red-500 rounded-2xl"
                      style={{ display: 'none' }} // Hidden by default, can enable for debugging
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Elegant click prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-wine/60 text-sm italic"
            >
              Click the box to reveal the secret ✨
            </motion.p>
          </motion.div>

          {/* Progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="flex space-x-3"
          >
            {boxMessages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index <= currentBox ? 'bg-rose-400' : 'bg-rose-200'
                }`}
                animate={{
                  scale: index === currentBox ? [1, 1.4, 1] : 1
                }}
                transition={{
                  duration: 1.5,
                  repeat: index === currentBox ? Infinity : 0
                }}
              />
            ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SecretBoxes;
