"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Star, MapPin } from "lucide-react";

const timelineEvents = [
  {
    date: "January 2023",
    title: "When We First Met",
    description: "The stars aligned and our paths crossed. Little did we know this was the beginning of something beautiful.",
    icon: <Star className="w-5 h-5" />,
    color: "from-pink-500 to-purple-500",
  },
  {
    date: "April 10, 2023",
    title: "Our Journey Begins",
    description: "The day we decided to write our love story together. From this moment, every day became special.",
    icon: <Heart className="w-5 h-5" />,
    color: "from-red-500 to-pink-500",
  },
  {
    date: "Summer 2023",
    title: "First Adventures",
    description: "Exploring new places, creating memories, and falling deeper in love with every sunset we watched together.",
    icon: <MapPin className="w-5 h-5" />,
    color: "from-yellow-500 to-orange-500",
  },
  {
    date: "Today",
    title: "Still Writing Our Story",
    description: "Every day with you is a new chapter filled with love, laughter, and endless possibilities.",
    icon: <Calendar className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
  },
];

export default function TimelinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold text-white text-center mb-16"
        >
          Our Timeline 💕
        </motion.h1>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-300 via-purple-300 to-blue-300 opacity-50" />

          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`flex items-center mb-16 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="w-1/2" />
              
              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  className={`w-12 h-12 bg-gradient-to-br ${event.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                >
                  {event.icon}
                </motion.div>
              </div>

              {/* Content */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}
              >
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl">
                  <h3 className="text-2xl font-bold text-white mb-2">{event.title}</h3>
                  <p className="text-pink-200 text-sm mb-3">{event.date}</p>
                  <p className="text-white/80">{event.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 