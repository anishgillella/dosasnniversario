import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
}

const memories: Memory[] = [
  {
    id: 1,
    title: "Chillis Restaurant",
    description: "Image of us in a Chillis restaurant. One of those simple, happy moments that felt so special just because we were together.",
    image: "/images/IMG_0413.jpg"
  },
  {
    id: 2,
    title: "Skincare Surprise",
    description: "Where she made me do skincare—which I never thought I would do in my life. She always brings out new sides of me, and I love her for it.",
    image: "/images/IMG_0522.jpg"
  },
  {
    id: 3,
    title: "Photo Day Realization",
    description: "The day I realized how much me taking pictures makes her happy, and I realized I'm actually good at it. Her smile in this photo says it all.",
    image: "/images/IMG_1959.jpg"
  },
  {
    id: 4,
    title: "Graduation Joy",
    description: "She made my graduation special—she doesn't realize it, but she was the only one who was more excited about my graduation than me or anyone else. I'll never forget that.",
    image: "/images/IMG-20240515-WA0065.jpg"
  },
  {
    id: 5,
    title: "Naatak Queen",
    description: "I promise I will bear her naatak (drama), even if sometimes it gets to my head. But honestly, my life would be boring without her naatak. Love you, drama queen!",
    image: "/images/PXL_20240513_231040844.MP.jpg"
  },
  {
    id: 6,
    title: "Austin Adventure",
    description: "Our trip to Austin was one of the best trips I ever made. The scenery was so beautiful, and seeing you cry at the view made me realize how deeply you feel things. That moment is forever in my heart.",
    image: "/images/IMG_2052.jpg"
  }
];

const FavoriteMemories = () => {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  return (
    <section ref={sectionRef} className="section min-h-screen py-20 bg-blush/30">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl md:text-5xl font-playfair font-bold mb-12 text-wine text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          Chapter 2: Favorite Memories
        </motion.h2>

        <motion.div 
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
  <div className="flex gap-12 px-8">
    {memories.map((memory, index) => (
      <motion.div
        key={memory.id}
        className="min-w-[80vw] md:min-w-[40vw] max-w-[90vw] md:max-w-[40vw] snap-center relative"
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(114,47,55,0.15)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.1 * index, type: "spring" }}
      >
        <div
          className="film-strip bg-white rounded-2xl shadow-2xl overflow-hidden cursor-pointer transition-transform group"
          onClick={() => setSelectedMemory(memory)}
        >
          <div className="aspect-[4/3] bg-gray-200 relative overflow-hidden">
            <img
              src={memory.image}
              alt={memory.title}
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              style={{ filter: 'brightness(0.97)' }}
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-wine/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-6">
            <h3 className="text-2xl font-playfair font-semibold text-wine mb-2">{memory.title}</h3>
            <motion.p
              className="text-wine/80 text-base font-inter min-h-[56px]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 * index }}
            >
              {memory.description}
            </motion.p>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</div>
        </motion.div>

        {/* Memory Modal */}
        {selectedMemory && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div 
              className="bg-white rounded-xl max-w-2xl w-full overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="aspect-video bg-gray-200 relative overflow-hidden">
  <img
    src={selectedMemory.image}
    alt={selectedMemory.title}
    className="object-cover w-full h-full"
  />
</div>
              <div className="p-6">
                <h3 className="text-2xl font-playfair font-bold text-wine mb-2">{selectedMemory.title}</h3>
                <p className="text-wine/80 mb-4">{selectedMemory.description}</p>
                <button 
                  className="px-4 py-2 bg-wine text-ivory rounded-full hover:bg-wine/90 transition-colors"
                  onClick={() => setSelectedMemory(null)}
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoriteMemories;
