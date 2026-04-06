import React from 'react';
import { motion } from 'framer-motion';

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  const getTime = (time) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;

  return (
    <div className="hidden sm:flex flex-row items-center w-full max-w-2xl px-6 group">
      <p className="text-on-surface font-bold text-xs w-10 text-right opacity-50 group-hover:opacity-100 transition-opacity tracking-widest">{value === 0 ? '0:00' : getTime(value)}</p>
      
      <div className="relative flex-1 mx-4 flex items-center">
        <input
          type="range"
          step="any"
          value={value}
          min={min}
          max={max}
          onInput={onInput}
          className="w-full h-1.5 bg-surface-highest rounded-full appearance-none cursor-pointer accent-primary hover:accent-secondary transition-all"
        />
        {/* Progress Bar Overlay */}
        <div 
          className="absolute h-1.5 bg-gradient-to-r from-primary to-secondary rounded-full pointer-events-none transition-all duration-100 shadow-[0_0_10px_rgba(186,158,255,0.5)]"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>

      <p className="text-on-surface font-bold text-xs w-10 text-left opacity-50 group-hover:opacity-100 transition-opacity tracking-widest">{max === 0 ? '0:00' : getTime(max)}</p>
    </div>
  );
};

export default Seekbar;
