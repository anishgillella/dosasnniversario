import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface LoveItem {
  id: number;
  text: string;
}

const loveItems: LoveItem[] = [
  { id: 1, text: "The way you laugh when you're sleepy" },
  { id: 2, text: "Your obsession with food pics" },
  { id: 3, text: "How your eyes sparkle with old Bollywood tunes" },
  { id: 4, text: "Your kindness to everyone you meet" },
  { id: 5, text: "How you always know what to say" },
  { id: 6, text: "Your passion for the things you love" },
];

const ThingsILove = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="section min-h-screen py-20 bg-ivory">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold mb-16 text-wine text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chapter 3: Things I Love About You
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {loveItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-lg shadow-lg p-6 transform transition-all hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="flex items-center mb-4">
                <span className="w-10 h-10 rounded-full bg-wine text-ivory flex items-center justify-center font-playfair text-xl">
                  {item.id}
                </span>
                <div className="w-full h-[1px] bg-wine/30 ml-3"></div>
              </div>
              <p className="text-lg font-inter text-wine/90">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="text-xl font-playfair italic text-wine/80">
            ...and countless more reasons every day.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ThingsILove;
