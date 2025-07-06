'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AuthGateProps {
  children: React.ReactNode;
}

const ALLOWED_EMAILS = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(',') || [];
const VALID_PASSWORD = process.env.NEXT_PUBLIC_VALID_PASSWORD || '';

export default function AuthGate({ children }: AuthGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedAuth = localStorage.getItem('anniversary-auth');
    const savedEmail = localStorage.getItem('anniversary-email');
    
    if (savedAuth === 'authenticated' && savedEmail && ALLOWED_EMAILS.includes(savedEmail)) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const isValidEmail = ALLOWED_EMAILS.includes(email.toLowerCase());
    const isValidPassword = password === VALID_PASSWORD;

    if (!isValidEmail) {
      setError('This email is not authorized to access this website.');
      return;
    }

    if (!isValidPassword) {
      setError('Incorrect password. Please try again.');
      return;
    }

    localStorage.setItem('anniversary-auth', 'authenticated');
    localStorage.setItem('anniversary-email', email.toLowerCase());
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('anniversary-auth');
    localStorage.removeItem('anniversary-email');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-zinc-900 to-black">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-cyan-400 text-xl font-mono uppercase tracking-wider"
        >
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
            <span>INITIALIZING...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-zinc-900 to-black p-4 relative overflow-hidden">
        {/* Dark geometric background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500/5 rounded-full blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900/80 backdrop-blur-xl rounded-3xl p-10 max-w-md w-full shadow-2xl border border-zinc-700/50 relative z-10"
        >
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl mb-6 filter drop-shadow-lg"
            >
              🔐
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-3 font-mono tracking-tight">
              ACCESS CONTROL
            </h2>
            <p className="text-zinc-400 text-sm font-medium uppercase tracking-wider">
              AUTHORIZED PERSONNEL ONLY
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-zinc-300 text-sm font-bold mb-3 uppercase tracking-wide">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-500 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all font-mono"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-zinc-300 text-sm font-bold mb-3 uppercase tracking-wide">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full p-4 rounded-lg bg-zinc-800/50 text-white placeholder-zinc-500 border border-zinc-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all font-mono"
                required
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/50 border border-red-600/50 text-red-300 px-4 py-3 rounded-lg text-sm font-mono"
              >
                <span className="text-red-400 font-bold">ERROR:</span> {error}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-500 hover:to-blue-500 transition-all font-bold uppercase tracking-wide shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105 border border-cyan-500/30"
            >
              ⚡ AUTHENTICATE ⚡
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-wider">
              UNAUTHORIZED ACCESS PROHIBITED
            </p>
            <div className="mt-2 flex justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse delay-100"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Logout button */}
      <button
        onClick={handleLogout}
        className="fixed top-4 right-4 z-50 bg-zinc-900/80 backdrop-blur-sm text-cyan-400 px-4 py-2 rounded-lg hover:bg-zinc-800/90 transition-all text-sm font-mono uppercase tracking-wide border border-cyan-500/30 hover:border-cyan-400/50"
      >
        🔓 LOGOUT
      </button>
      {children}
    </div>
  );
} 