import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const HowWeMet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  return (
    <section ref={ref} className="section min-h-screen py-20 bg-gradient-to-b from-ivory to-blush/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-playfair font-bold mb-16 text-wine"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How We Met
          </motion.h2>

          <motion.div
            className="space-y-12 text-lg md:text-xl text-wine/80 font-inter leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p>
              <span className="font-playfair italic text-2xl text-wine">January 2023, UTD Student Union</span>
            </p>
            
            <p className="text-xl md:text-2xl font-playfair italic text-wine">
              "I saw those eyes gleaming with respect towards me..."
            </p>
            
            <p>
              In that moment at the Student Union, everything changed. Those eyes held something different—
              a respect, a warmth that made me ask myself a question that would change my life: 
              <em className="font-playfair text-wine">"What if I could have those eyes looking at me every day of my life?"</em>
            </p>
            
            <p>
              The answer was instant: <strong className="text-wine">Yes.</strong>
            </p>
            
            <p>
              But this wasn't going to be like before. For some reason, I couldn't be the same old Anish with her. 
              She deserved something real, something deeper. It took me longer than usual because she made me want to be better.
            </p>
            
            <p>
              <span className="font-playfair italic text-2xl text-wine">April 10, 2023</span> - 
              The world brought us closer, and since then, it's been the most beautiful wild ride.
            </p>
            
            <div className="bg-wine/10 rounded-lg p-8 mt-12">
              <p className="font-playfair italic text-wine text-xl mb-4">
                Our Journey Since Then:
              </p>
              <p>
                Countless kisses, countless fights. Days where we felt distant, days we felt closer than ever. 
                Days where we wanted to break up, but we still chose to stick close. 
                We've outlasted the 3 romantic couples she compared us to—they all broke up, but here we are, 
                still choosing each other, still growing together.
              </p>
            </div>
            
            <p className="font-playfair italic text-2xl text-wine">
              Because some love stories aren't perfect—they're real.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeMet;
