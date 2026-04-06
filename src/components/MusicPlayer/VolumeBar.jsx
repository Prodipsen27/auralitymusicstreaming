import React from 'react';
import { motion } from 'framer-motion';

const VolumeBar = ({ value, min, max, onChange, setVolume, onLyricsClick, onQueueClick }) => (
  <div className="hidden lg:flex flex-1 items-center justify-end px-8 group">
    <div className="flex items-center space-x-3 mr-6">
      <motion.span 
        whileHover={{ scale: 1.2 }}
        title="AI Magic"
        className="material-symbols-outlined text-primary cursor-pointer hover:text-white transition-colors" 
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        auto_awesome
      </motion.span>
      <motion.span 
        whileHover={{ scale: 1.2 }}
        title="Lyrics"
        onClick={onLyricsClick}
        className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-white transition-colors"
      >
        mic
      </motion.span>
      <motion.span 
        whileHover={{ scale: 1.2 }}
        title="Queue"
        onClick={onQueueClick}
        className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-white transition-colors"
      >
        queue_music
      </motion.span>
      <motion.span 
        whileHover={{ scale: 1.2 }}
        title="Connect to Device"
        className="material-symbols-outlined text-on-surface-variant cursor-pointer hover:text-white transition-colors"
      >
        cast
      </motion.span>
    </div>

    <motion.div 
      whileHover={{ scale: 1.1 }}
      title={value === '0' || value === 0 ? 'Unmute' : 'Mute'}
      className="cursor-pointer text-on-surface-variant hover:text-primary transition-colors mr-3"
      onClick={() => setVolume(value === '0' ? '0.1' : '0')}
    >
      {value <= 1 && value > 0.5 && <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>}
      {value <= 0.5 && value > 0 && <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>volume_down</span>}
      {(value === '0' || value === 0) && <span className="material-symbols-outlined text-red-400" style={{ fontVariationSettings: "'FILL' 1" }}>volume_off</span>}
    </motion.div>
    
    <div className="relative w-24 md:w-32 h-1.5 bg-surface-highest rounded-full flex items-center">
       <input
         type="range"
         step="any"
         value={value}
         min={min}
         max={max}
         onChange={onChange}
         className="w-full h-full appearance-none bg-transparent cursor-pointer accent-primary group-hover:accent-tertiary transition-all z-10"
       />
       {/* Visual Feedback Overlay */}
       <div 
         className="absolute h-full bg-gradient-to-r from-primary to-secondary rounded-full pointer-events-none shadow-[0_0_8px_rgba(186,158,255,0.4)]"
         style={{ width: `${(value / max) * 100}%` }}
       />
    </div>
  </div>
);

export default VolumeBar;
