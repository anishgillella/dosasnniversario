"use client";

import { motion } from "framer-motion";
import SanaChat from "@/components/SanaChat";
import { useState } from "react";

export default function ChatPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-red-900 flex items-center justify-center py-24 px-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Chat with Sana 💬
          </h1>
          <p className="text-pink-200 text-lg">
            Have a conversation with the virtual Sana! She's ready to chat about anything and everything.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SanaChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </motion.div>
      </div>
    </div>
  );
} 