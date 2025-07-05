'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import SanaChat from './SanaChat';


const SanaChatButton = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="fixed bottom-6 left-6 w-16 h-16 bg-gradient-to-r from-wine to-wine/90 rounded-full shadow-2xl z-40 flex items-center justify-center group hover:shadow-wine/30"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowChat(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 2, 
          type: "spring", 
          stiffness: 500, 
          damping: 25 
        }}
      >
        {/* Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-wine/30 animate-ping"></div>
        
        {/* Heart Icon */}
        <motion.div
          className="relative z-10"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            repeatDelay: 3 
          }}
        >
          <span className="text-2xl">💕</span>
        </motion.div>
        
        {/* Tooltip */}
        <motion.div
          className="absolute left-20 bg-wine text-ivory px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap"
          initial={{ x: -10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          <div className="text-sm font-playfair">Chat with Sana 🎬</div>
          <div className="text-xs opacity-80">Your Bollywood queen</div>
          
          {/* Tooltip Arrow */}
          <div className="absolute left-0 top-1/2 transform -translate-x-1 -translate-y-1/2">
            <div className="w-2 h-2 bg-wine rotate-45"></div>
          </div>
        </motion.div>
      </motion.button>

      {/* Floating Sparkles */}
      <motion.div
        className="fixed bottom-8 left-8 pointer-events-none"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold rounded-full"
            style={{
              top: `${Math.cos((i * 120 * Math.PI) / 180) * 25 + 25}px`,
              left: `${Math.sin((i * 120 * Math.PI) / 180) * 25 + 25}px`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </motion.div>



      {/* Chat Component */}
      <SanaChat isOpen={showChat} onClose={() => setShowChat(false)} />
    </>
  );
};

export default SanaChatButton; 