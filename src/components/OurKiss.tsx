'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaHeart, FaInfinity } from 'react-icons/fa';
import { useState } from 'react';

export default function OurKiss() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-50 py-20 px-6 relative overflow-hidden">
      {/* Romantic background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-rose-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-400/30"
            style={{
              left: `${10 + (i * 8)}%`,
              top: `${20 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <FaHeart className="text-xl" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">


        {/* Main Image Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="relative max-w-5xl mx-auto pt-12"
        >
          {/* Decorative frame */}
          <div className="relative bg-white p-8 rounded-3xl shadow-2xl border-4 border-red-200/50">
            {/* Corner decorations */}
            <div className="absolute -top-4 -left-4 text-4xl">💕</div>
            <div className="absolute -top-4 -right-4 text-4xl">💕</div>
            <div className="absolute -bottom-4 -left-4 text-4xl">💕</div>
            <div className="absolute -bottom-4 -right-4 text-4xl">💕</div>
            
            {/* Image */}
            <div className="relative aspect-[4/3] max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/ChatGPT Image Jun 22, 2025 at 02_16_03 PM.png"
                alt="Our beautiful kiss - a moment frozen in time"
                fill
                className={`object-contain transition-all duration-1000 ${
                  isImageLoaded ? 'scale-100 blur-0' : 'scale-105 blur-sm'
                }`}
                onLoad={() => setIsImageLoaded(true)}
                priority
              />
              
              {/* Romantic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 via-transparent to-pink-900/20"></div>
              
              {/* Loading animation */}
              {!isImageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/50 to-red-200/50 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-red-400"
                  >
                    <FaHeart className="text-4xl" />
                  </motion.div>
                </div>
              )}
            </div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-center mt-6"
            >
              <p className="font-handwriting text-2xl text-wine/80 mb-2">
                "In your kiss, I found my home"
              </p>
              <p className="text-wine/60 text-sm">
                The moment that sealed our forever 💋
              </p>
            </motion.div>
          </div>

          {/* Floating particles around the image */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                }}
                animate={{
                  y: [-5, -15, -5],
                  x: [-5, 5, -5],
                  rotate: [0, 180, 360],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              >
                <div className="text-2xl">
                  {['💖', '💕', '💓', '💗', '💘', '💝'][i]}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Love Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50"
            >
              <p className="text-wine/80 italic text-lg leading-relaxed mb-3">
                "A kiss is a secret told to the mouth instead of the ear; 
                kisses are the messengers of love and tenderness."
              </p>
              <cite className="text-red-600 font-semibold text-sm">— Ingrid Bergman</cite>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-red-200/50"
            >
              <p className="text-wine/80 italic text-lg leading-relaxed mb-3">
                "The kiss is a wordless articulation of desire whose object 
                lies in the future, and somewhat to the south."
              </p>
              <cite className="text-red-600 font-semibold text-sm">— Lance Morrow</cite>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-4 bg-gradient-to-r from-red-500/10 to-pink-500/10 backdrop-blur-sm rounded-full px-8 py-4 border border-red-300/30">
            <FaHeart className="text-red-500 text-xl animate-pulse" />
            <span className="text-wine font-playfair text-lg">
              Every kiss with you feels like the first
            </span>
            <FaHeart className="text-red-500 text-xl animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
} 