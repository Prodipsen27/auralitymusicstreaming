import React from 'react';
import { motion } from 'framer-motion';

const Controls = ({ isPlaying, repeat, setRepeat, shuffle, setShuffle, currentSongs, handlePlayPause, handlePrevSong, handleNextSong, isFavorite, isInPlaylist, handleFavorite, handleAddToPlaylist }) => (
  <div className="flex items-center space-x-4 sm:space-x-6 px-4">
    <div className="flex items-center gap-4 border-r border-white/5 pr-4 mr-2">
      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleFavorite}
        title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        className={`transition-all ${isFavorite ? 'text-red-500 drop-shadow-glow' : 'text-on-surface-variant hover:text-white'}`}
      >
        <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleAddToPlaylist}
        title={isInPlaylist ? "Remove from Journey" : "Add to Journey"}
        className={`transition-all pr-1 ${isInPlaylist ? 'text-primary drop-shadow-glow' : 'text-on-surface-variant hover:text-white'}`}
      >
        <span className="material-symbols-outlined text-[24px]">{isInPlaylist ? 'check_circle' : 'add_circle'}</span>
      </motion.button>
    </div>

    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setRepeat((prev) => !prev)}
      title={repeat ? 'Disable Repeat' : 'Enable Repeat'}
      className={`hidden sm:block transition-colors ${repeat ? 'text-primary drop-shadow-[0_0_8px_rgba(186,158,255,0.6)]' : 'text-on-surface-variant hover:text-white'}`}
    >
      <span className="material-symbols-outlined">repeat</span>
    </motion.button>

    {currentSongs?.length && (
      <motion.button 
        whileHover={{ scale: 1.2, x: -2 }}
        whileTap={{ scale: 0.8 }}
        onClick={handlePrevSong}
        title="Previous Track"
        className="text-white hover:text-primary transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_previous</span>
      </motion.button>
    )}

    {/* Play button — full radius circle with primary gradient (Stitch §5) */}
    <motion.button
      whileHover={{ scale: 1.1, rotate: isPlaying ? 0 : 5 }}
      whileTap={{ scale: 0.9 }}
      onClick={handlePlayPause}
      title={isPlaying ? 'Pause' : 'Play'}
      className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-dim flex items-center justify-center text-on-primary shadow-xl shadow-primary/30 hover:shadow-neon-lg transition-all duration-300 group"
    >
      {isPlaying 
        ? <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span> 
        : <span className="material-symbols-outlined text-3xl ml-1" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
      }
    </motion.button>

    {currentSongs?.length && (
      <motion.button 
        whileHover={{ scale: 1.2, x: 2 }}
        whileTap={{ scale: 0.8 }}
        onClick={handleNextSong}
        title="Next Track"
        className="text-white hover:text-primary transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>skip_next</span>
      </motion.button>
    )}

    <motion.button 
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setShuffle((prev) => !prev)}
      title={shuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
      className={`hidden sm:block transition-colors ${shuffle ? 'text-primary drop-shadow-[0_0_8px_rgba(186,158,255,0.6)]' : 'text-on-surface-variant hover:text-white'}`}
    >
      <span className="material-symbols-outlined">shuffle</span>
    </motion.button>
  </div>
);

export default Controls;
