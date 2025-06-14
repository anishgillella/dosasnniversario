import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const LoveLetter = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.4 });
  const [isWriting, setIsWriting] = useState(false);

  // Love letter content split into lines
  const letterLines = [
    "My dearest,",
    "",
    "Two years ago, our story began. Two years of laughter,",
    "adventures, challenges, and growth. Two years of building",
    "something beautiful together.",
    "",
    "Every day with you feels like a gift. Your smile brightens",
    "my darkest days, and your love gives me strength I never",
    "knew I had.",
    "",
    "Thank you for choosing me, for loving me, for being my",
    "partner in this beautiful journey called life.",
    "",
    "Here's to many more years of us.",
    "",
    "Forever yours,"
  ];

  useEffect(() => {
    if (isInView && !isWriting) {
      setIsWriting(true);
    }
  }, [isInView]);

  return (
    <section ref={sectionRef} className="section min-h-screen py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold mb-16 text-wine text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chapter 5: A Love Letter
        </motion.h2>

        <motion.div
          className="max-w-2xl mx-auto bg-blush/20 p-8 md:p-12 rounded-lg shadow-lg relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 right-4 text-gold/30 text-6xl font-playfair">"</div>
          <div className="absolute bottom-4 left-4 text-gold/30 text-6xl font-playfair">"</div>
          
          {/* Letter content */}
          <div 
            ref={letterRef} 
            className="font-['Caveat',_cursive] text-lg md:text-xl text-wine/90 leading-relaxed relative z-10"
          >
            {letterLines.map((line, index) => (
              <motion.p
                key={index}
                className="mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={isWriting ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.5 + index * 0.15,
                  ease: "easeOut"
                }}
              >
                {line || "\u00A0"}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Future enhancement note */}
        <motion.div
          className="mt-8 text-center text-wine/60 italic"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
        >
          <p>Audio version coming soon...</p>
        </motion.div>
      </div>
    </section>
  );
};

export default LoveLetter;
