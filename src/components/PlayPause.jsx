import React from 'react';

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) => (isPlaying && activeSong?.id === song.id ? (
  <div 
    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform" 
    onClick={handlePause}
    title="Pause"
  >
    <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>pause</span>
  </div>
) : (
  <div 
    className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform" 
    onClick={handlePlay}
    title="Play"
  >
    <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
  </div>
));

export default PlayPause;
