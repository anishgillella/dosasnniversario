'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SanaChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const SanaChat = ({ isOpen, onClose }: SanaChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Areh aap! 💕 Missing me already, hai na? Dekho, I'm always here for you, bilkul like SRK's promise in every movie! Kya baat hai, what's on your mind? 🎬✨", 
      isUser: false, 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = { text: input, isUser: true, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat-with-sana', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput })
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      setMessages(prev => [...prev, {
        text: data.response,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        text: "Areh yaar, something went wrong! 😭 Just like when hero can't reach heroine in climax scene! Aap try again na?",
        isUser: false,
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Chat Modal */}
          <motion.div
            className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-wine/20"
            initial={{ scale: 0, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
          >
            {/* Chat Header */}
            <div className="p-4 bg-gradient-to-r from-wine to-wine/90 text-ivory rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-playfair text-lg font-bold flex items-center gap-2">
                    💕 Chat with Sana 
                    <span className="text-sm font-normal opacity-80">🎬</span>
                  </h3>
                  <p className="text-sm opacity-90 font-inter">Your Bollywood-loving girlfriend</p>
                </div>
                <button 
                  onClick={onClose} 
                  className="text-2xl hover:text-gold transition-colors"
                  aria-label="Close chat"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-ivory/30 to-blush/20">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl shadow-md ${
                    msg.isUser 
                      ? 'bg-wine text-ivory ml-4 rounded-br-sm' 
                      : 'bg-white text-wine mr-4 rounded-bl-sm border border-wine/10'
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                    <p className={`text-xs mt-1 opacity-60 ${msg.isUser ? 'text-ivory/70' : 'text-wine/50'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {loading && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-white text-wine p-3 rounded-2xl mr-4 rounded-bl-sm border border-wine/10 shadow-md">
                    <div className="flex items-center gap-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-wine/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-wine/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-wine/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs font-playfair italic">Sana is typing...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="p-4 border-t border-wine/10 bg-white">
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message... (like writing to SRK! 💕)"
                    className="w-full p-3 border border-wine/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-wine/50 focus:border-wine resize-none text-sm"
                    rows={1}
                    disabled={loading}
                    style={{ minHeight: '44px', maxHeight: '88px' }}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="px-4 py-3 bg-wine text-ivory rounded-xl hover:bg-wine/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center min-w-[44px]"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-ivory/30 border-t-ivory rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-wine/50 mt-2 font-inter">Press Enter to send</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SanaChat; 