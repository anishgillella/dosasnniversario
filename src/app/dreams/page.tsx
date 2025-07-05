"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Sparkles, CheckCircle, CalendarDays } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadStarsPreset } from "@tsparticles/preset-stars";

// Floating wishes data
const floatingWishes = [
  { id: 1, text: "To never leave each other, through health and sickness", x: 15, y: 20, delay: 0 },
  { id: 2, text: "To always make up the same night if we fight before sleeping", x: 70, y: 35, delay: 1 },
  { id: 3, text: "To travel through Europe together, hand in hand", x: 30, y: 60, delay: 2 },
  { id: 4, text: "To taste the world's most delicious delicacies together", x: 80, y: 70, delay: 3 },
  { id: 5, text: "To wake up next to you every morning", x: 20, y: 80, delay: 4 },
  { id: 6, text: "To dance in the kitchen while cooking together", x: 60, y: 15, delay: 5 },
  { id: 7, text: "To grow old and wrinkled together, still holding hands", x: 40, y: 40, delay: 6 },
  { id: 8, text: "Savoring every bite of your handmade tacos", x: 50, y: 85, delay: 7 },
  { id: 9, text: "Warming my soul with a cup of your special chai", x: 85, y: 50, delay: 8 },
  { id: 10, text: "Learning to dance with you as my hot teacher", x: 5, y: 50, delay: 9 },
];

// Constellation dreams
const constellations = [
  {
    id: 'travel',
    name: 'Wanderlust',
    stars: [
      { x: 20, y: 25, size: 4 },
      { x: 25, y: 20, size: 3 },
      { x: 30, y: 30, size: 5 },
      { x: 35, y: 25, size: 3 },
    ],
    dreams: ['Paris cafés', 'Italian pasta', 'Swiss mountains', 'Greek islands']
  },
  {
    id: 'love',
    name: 'Eternal Love',
    stars: [
      { x: 70, y: 40, size: 5 },
      { x: 75, y: 35, size: 4 },
      { x: 80, y: 45, size: 3 },
      { x: 85, y: 40, size: 4 },
    ],
    dreams: ['Forever together', 'Growing old as one', 'Unconditional support', 'Daily I love yous']
  },
  {
    id: 'adventure',
    name: 'Adventures',
    stars: [
      { x: 45, y: 65, size: 3 },
      { x: 50, y: 60, size: 4 },
      { x: 55, y: 70, size: 5 },
      { x: 60, y: 65, size: 3 },
    ],
    dreams: ['Food festivals', 'Cozy winter nights', 'Surprise dates', 'Making memories']
  }
];

// Vision board items
const visionBoardItems = [
  { id: 1, title: "European Adventure", image: "🏰", description: "Exploring castles and cobblestone streets" },
  { id: 2, title: "Culinary Journey", image: "🍝", description: "Tasting authentic dishes worldwide" },
  { id: 3, title: "Cozy Home", image: "🏡", description: "Our little sanctuary together" },
  { id: 4, title: "Growing Together", image: "🌱", description: "Supporting each other's dreams" },
  { id: 5, title: "Dance Lessons", image: "💃", description: "Learning to waltz under the stars" },
  { id: 6, title: "Morning Coffee", image: "☕", description: "Starting every day together" },
];

// Messages for 365 Days of Us
const dailyMessages = [
  "Every day with you is a gift I treasure.",
  "Thinking of you makes my day brighter.",
  "You are the reason for my smile, today and always.",
  "My favorite part of the day is any moment spent with you.",
  "Just a reminder that I love you more than words can say.",
  "I'm so grateful for another day to love you.",
  "You're my sunshine on a cloudy day.",
  "My love for you grows stronger with each passing day.",
  "With you, every day feels like a beautiful dream.",
  "You make ordinary moments extraordinary.",
  "I fall for you more and more each day.",
  "My heart is, and always will be, yours."
];

// Quiz questions about him for Sana
const quizQuestions = [
  {
    id: 1,
    question: "What's my favorite way to show you I love you?",
    options: [
      "Surprise hugs from behind",
      "Making you breakfast in bed",
      "Writing you little notes",
      "All of the above"
    ],
    correct: 3
  },
  {
    id: 2,
    question: "What do I dream about most when it comes to our future?",
    options: [
      "Traveling the world together",
      "Building a cozy home",
      "Growing old together",
      "All of these dreams"
    ],
    correct: 3
  },
  {
    id: 3,
    question: "What's my favorite thing about our relationship?",
    options: [
      "How we never go to bed angry",
      "How we support each other",
      "How we laugh together",
      "Everything about us"
    ],
    correct: 3
  },
  {
    id: 4,
    question: "What makes me happiest when I'm with you?",
    options: [
      "Your beautiful smile",
      "Our silly conversations",
      "Just being in your presence",
      "All of these moments"
    ],
    correct: 3
  }
];

// Shooting star component
function ShootingStar({ delay }: { delay: number }) {
  const [windowWidth, setWindowWidth] = useState(1200); // Default fallback

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);
    
    // Handle window resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
      initial={{ x: -100, y: Math.random() * 400, opacity: 0 }}
      animate={{
        x: windowWidth + 100,
        y: Math.random() * 400 + 200,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration: 3,
        delay: delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 10 + 5,
        ease: "linear"
      }}
    >
      <motion.div
        className="absolute w-20 h-0.5 bg-gradient-to-r from-yellow-300 to-transparent"
        style={{ originX: 0 }}
        animate={{ scaleX: [0, 1, 0] }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />
    </motion.div>
  );
}

// Floating wish component
function FloatingWish({ wish, index }: { wish: any; index: number }) {
  return (
    <motion.div
      className="absolute"
      style={{ left: `${wish.x}%`, top: `${wish.y}%` }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: [0, 1, 1, 0.7],
        y: [50, 0, -10, 0],
      }}
      transition={{
        duration: 8,
        delay: wish.delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      <motion.div
        className="bg-purple-900/20 backdrop-blur-sm border border-purple-300/30 rounded-full px-4 py-2 max-w-xs"
        whileHover={{ scale: 1.05, backgroundColor: "rgba(147, 51, 234, 0.3)" }}
      >
        <p className="text-purple-100 text-sm text-center font-light">
          {wish.text}
        </p>
      </motion.div>
    </motion.div>
  );
}

// Constellation component
function Constellation({ constellation, isActive, onClick }: { constellation: any; isActive: boolean; onClick: () => void }) {
  return (
    <div className="absolute" onClick={onClick}>
      {constellation.stars.map((star: any, index: number) => (
        <motion.div
          key={index}
          className={`absolute rounded-full cursor-pointer ${
            isActive ? 'bg-yellow-300' : 'bg-blue-200'
          }`}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
          whileHover={{ scale: 1.5 }}
          animate={{
            opacity: isActive ? [0.5, 1, 0.5] : 0.7,
            scale: isActive ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 2,
            repeat: isActive ? Infinity : 0,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {isActive && (
        <motion.div
          className="absolute bg-indigo-900/80 backdrop-blur-sm border border-indigo-300/50 rounded-lg p-3 mt-8"
          style={{ left: `${constellation.stars[0].x}%`, top: `${constellation.stars[0].y + 5}%` }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-indigo-200 font-semibold mb-2">{constellation.name}</h3>
          {constellation.dreams.map((dream: string, index: number) => (
            <p key={index} className="text-indigo-100 text-sm">✨ {dream}</p>
          ))}
        </motion.div>
      )}
    </div>
  );
}

// Celestial Calendar component
function CelestialCalendar() {
  const [message, setMessage] = useState("");
  const [day, setDay] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadStarsPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const pickRandomDay = () => {
    const randomDay = Math.floor(Math.random() * 365) + 1;
    const randomMessageIndex = Math.floor(Math.random() * dailyMessages.length);
    setDay(randomDay);
    setMessage(dailyMessages[randomMessageIndex]);
    setIsRevealed(true);
  };

  const particlesOptions = {
    preset: "stars",
    background: {
      color: {
        value: 'transparent'
      }
    },
    particles: {
      number: {
        value: 100,
        density: {
          enable: true,
        }
      },
      color: {
        value: "#ffffff"
      },
      opacity: {
        value: {min: 0.3, max: 0.8},
        animation: {
          enable: true,
          speed: 1,
          sync: false
        }
      },
      size: {
        value: {min: 1, max: 3}
      },
    }
  };

  const AnimatedText = ({ text }: { text: string }) => {
    const letters = Array.from(text);
    const container = {
      hidden: { opacity: 0 },
      visible: (i = 1) => ({
        opacity: 1,
        transition: { staggerChildren: 0.04, delayChildren: 0.2 * i },
      }),
    };
    const child = {
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
      hidden: {
        opacity: 0,
        y: 20,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 100,
        },
      },
    };

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap justify-center"
      >
        {letters.map((letter, index) => (
          <motion.span key={index} variants={child} className="text-lg text-white font-serif italic">
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="relative backdrop-blur-sm border border-purple-700/50 rounded-2xl p-8 text-center max-w-2xl mx-auto my-20 overflow-hidden bg-black/20">
      {init && <Particles id="tsparticles" options={particlesOptions} />}
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
        >
          <CalendarDays className="mx-auto h-16 w-16 text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-pink-500" />
          <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 my-4">
            Our Celestial Calendar
          </h3>
          <p className="text-purple-200 mb-8">
            Each star holds a memory, each day a new reason to love you. Choose a day from our cosmos.
          </p>
        </motion.div>

        {!isRevealed ? (
          <motion.button
            onClick={pickRandomDay}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/40"
            whileHover={{
              boxShadow: "0 0 25px rgba(224, 102, 255, 0.6)",
            }}
          >
            <Sparkles className="inline-block mr-2 -mt-1" size={22} />
            Reveal a Cosmic Memory
          </motion.button>
        ) : (
          <motion.div
            key={day}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 bg-black/40 p-6 rounded-lg border border-purple-500/50 min-h-[120px] flex flex-col justify-center"
          >
            <p className="text-purple-300 font-semibold mb-3">A message from Day {day}:</p>
            <AnimatedText text={`"${message}"`} />
            <motion.button
              onClick={() => setIsRevealed(false)}
              className="mt-6 mx-auto px-5 py-2 text-sm bg-gray-700/80 hover:bg-gray-600/80 text-white rounded-full transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              Choose another day
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// Quiz component
function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
    } else {
      setTimeout(() => setShowResults(true), 1000);
    }
  };

  const score = selectedAnswers.reduce((acc, answer, index) => {
    return acc + (answer === quizQuestions[index].correct ? 1 : 0);
  }, 0);

  if (showResults) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-sm border border-pink-300/30 rounded-xl p-8 text-center max-w-md mx-auto"
      >
        <h3 className="text-2xl font-semibold text-pink-200 mb-4">How Well Do You Know Me? 💕</h3>
        <div className="text-6xl mb-4">
          {score === quizQuestions.length ? "🥰" : score >= 3 ? "😍" : score >= 2 ? "😊" : "🤔"}
        </div>
        <p className="text-pink-100 text-lg mb-4">
          You got {score} out of {quizQuestions.length} right!
        </p>
        <p className="text-pink-200 text-sm">
          {score === quizQuestions.length 
            ? "Perfect! You know me better than I know myself! 💖"
            : score >= 3 
            ? "Amazing! We're so connected 💕"
            : score >= 2
            ? "Good job! We should talk more about these things 😘"
            : "Time for more deep conversations together! 🥰"
          }
        </p>
        <button
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswers([]);
            setShowResults(false);
          }}
          className="mt-4 px-6 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full transition-colors"
        >
          Try Again
        </button>
      </motion.div>
    );
  }

  const question = quizQuestions[currentQuestion];

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gradient-to-br from-pink-900/40 to-purple-900/40 backdrop-blur-sm border border-pink-300/30 rounded-xl p-8 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <span className="text-pink-300 text-sm">Question {currentQuestion + 1} of {quizQuestions.length}</span>
        <h3 className="text-xl font-semibold text-pink-200 mt-2">{question.question}</h3>
      </div>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(index)}
            className={`w-full p-3 text-left rounded-lg transition-all ${
              selectedAnswers[currentQuestion] === index
                ? index === question.correct
                  ? 'bg-green-600/50 border-green-400'
                  : 'bg-red-600/50 border-red-400'
                : 'bg-purple-800/30 hover:bg-purple-700/50 border-purple-400/30'
            } border`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedAnswers[currentQuestion] !== undefined}
          >
            <span className="text-pink-100">{option}</span>
            {selectedAnswers[currentQuestion] === index && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="float-right"
              >
                {index === question.correct ? (
                  <CheckCircle className="w-5 h-5 text-green-400" />
                ) : (
                  <span className="text-red-400">✗</span>
                )}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

export default function DreamsPage() {
  const [activeConstellation, setActiveConstellation] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const starsY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const moonY = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // Generate random stars
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number}>>([]);
  
  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 200; i++) {
        newStars.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 2 + 1,
        });
      }
      setStars(newStars);
    };
    generateStars();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-indigo-900 relative overflow-hidden"
    >
      {/* Stars background */}
      <motion.div className="absolute inset-0" style={{ y: starsY }}>
        {stars.map((star, index) => (
          <motion.div
            key={index}
            className="absolute bg-white rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.div>

      {/* Moon */}
      <motion.div 
        className="absolute top-20 right-20"
        style={{ y: moonY }}
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-32 h-32 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-full shadow-2xl relative">
          <div className="absolute inset-4 bg-gradient-to-br from-yellow-100 to-yellow-300 rounded-full opacity-80" />
          <div className="absolute inset-8 bg-gradient-to-br from-yellow-50 to-yellow-200 rounded-full opacity-60" />
        </div>
      </motion.div>

      {/* Shooting stars */}
      {[...Array(5)].map((_, index) => (
        <ShootingStar key={index} delay={index * 2} />
      ))}

      {/* Main content */}
      <div className="relative z-10 px-8 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl md:text-8xl font-light text-white mb-4 tracking-tight">
            dreams & wishes
          </h1>
          <p className="text-purple-200 text-lg font-light tracking-widest lowercase">
            written in the stars, held in our hearts
          </p>
        </motion.div>

        {/* Floating wishes */}
        {floatingWishes.map((wish, index) => (
          <FloatingWish key={wish.id} wish={wish} index={index} />
        ))}

        {/* Constellations */}
        <div className="relative h-96 mb-20">
          {constellations.map((constellation) => (
            <Constellation
              key={constellation.id}
              constellation={constellation}
              isActive={activeConstellation === constellation.id}
              onClick={() => setActiveConstellation(
                activeConstellation === constellation.id ? null : constellation.id
              )}
            />
          ))}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-center"
          >
            <p className="text-purple-300 text-sm italic">
              Click the stars to explore our constellation of dreams ✨
            </p>
          </motion.div>
        </div>

        {/* Vision Board */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-20"
        >
          <h2 className="text-4xl font-light text-white text-center mb-12">Our Vision Board</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {visionBoardItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-800/40 to-pink-800/40 backdrop-blur-sm border border-purple-300/30 rounded-xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.image}</div>
                <h3 className="text-purple-200 font-semibold mb-2">{item.title}</h3>
                <p className="text-purple-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 365 Days of Us */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <CelestialCalendar />
        </motion.div>

        {/* Quiz Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-4xl font-light text-white text-center mb-8">A Special Quiz for Sana</h2>
          <p className="text-purple-200 mb-8">Let's see how well you know me! 💕</p>
          
          {!showQuiz ? (
            <motion.button
              onClick={() => setShowQuiz(true)}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white rounded-full transition-all duration-300 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Quiz ✨
            </motion.button>
          ) : (
            <Quiz />
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="text-center mt-32"
        >
          <p className="text-purple-300 font-light italic">
            "Every night I wish upon a star that our dreams come true together"
          </p>
        </motion.div>
      </div>
    </div>
  );
} 