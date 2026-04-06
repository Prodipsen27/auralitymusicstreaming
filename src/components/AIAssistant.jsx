import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Send, Bot, Zap } from 'lucide-react';
import { useSelector } from 'react-redux';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSong } = useSelector((state) => state.player);

  const mockInsights = [
    "This track has a high energy level, perfect for a workout!",
    "The melodic structure suggests a blend of 80s synth and modern pop.",
    "Did you know? The artist wrote this during a coastal road trip.",
    "Similar vibes: Waveform, Midnight City, and Neon Lights.",
  ];

  return (
    <>
      {/* Floating Toggle Button — gradient CTA */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-32 right-8 z-50 p-4 rounded-full bg-brand-gradient text-dark shadow-lg shadow-brand-primary/20 flex items-center justify-center"
      >
        <Sparkles size={24} />
      </motion.button>

      {/* Assistant Panel — Glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 100, scale: 0.9, x: 20 }}
            className="fixed bottom-8 right-8 z-[60] w-[380px] h-[550px] glass-heavy rounded-3xl overflow-hidden flex flex-col shadow-ambient ghost-border glass-highlight"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(58, 74, 70, 0.15)' }}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-primary/20 text-brand-primary">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-onSurface text-lg leading-none">Auralia AI</h3>
                  <p className="text-xs text-brand-primary mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    Online & Analyzing
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-surface-high rounded-full text-onSurfaceVariant hover:text-onSurface transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat/Content Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 hide-scrollbar">
              {activeSong?.name && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-4 rounded-2xl bg-surface-high ghost-border"
                >
                  <p className="text-xs text-onSurfaceVariant uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                    <Zap size={12} className="text-brand-accent" />
                    Real-time Analysis
                  </p>
                  <h4 className="text-onSurface font-bold text-sm mb-1">{activeSong.name}</h4>
                  <p className="text-onSurfaceVariant text-xs italic">{activeSong.subtitle}</p>
                </motion.div>
              )}

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-surface-high p-3 rounded-2xl rounded-tl-none ghost-border">
                    <p className="text-sm text-onSurface">
                      Hello! I'm Auralia. I can help you discover new music, understand lyrics, or just chat about your favorite artists.
                    </p>
                  </div>
                </div>

                {activeSong?.name && mockInsights.map((insight, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 + 0.5 }}
                    className="flex gap-3"
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-secondary/20 flex items-center justify-center text-brand-secondaryLight shrink-0">
                      <Sparkles size={16} />
                    </div>
                    <div className="bg-surface-high p-3 rounded-2xl rounded-tl-none ghost-border">
                      <p className="text-sm text-onSurfaceVariant italic">{insight}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-surface-mid" style={{ borderTop: '1px solid rgba(58, 74, 70, 0.15)' }}>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask about this song..."
                  className="w-full bg-surface-low ghost-border rounded-2xl py-3 pl-4 pr-12 text-sm text-onSurface placeholder-onSurfaceVariant focus:outline-none focus:shadow-[0_0_15px_rgba(0,245,212,0.2)] transition-all font-sans"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary hover:text-brand-secondaryLight transition-colors">
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
