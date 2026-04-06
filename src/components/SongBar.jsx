import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import PlayPause from './PlayPause';
import { toggleFavorite, addToPlaylist, togglePlaylistSong } from '../redux/features/playerSlice';
import { toast } from 'react-toastify';

const SongBar = ({ song, i, artistId, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => {
  const dispatch = useDispatch();
  const { favorites, playlists } = useSelector((state) => state.player);

  const isFavorite = favorites.find((s) => (s.id || s.key) === (song.id || song.key));

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(song));
    const isAdding = !favorites.find((s) => (s.id || s.key) === (song.id || song.key));
    toast[isAdding ? 'success' : 'info'](isAdding ? 'Added to Favorites' : 'Removed from Favorites');
  };

  const handleTogglePlaylist = (e) => {
    e.stopPropagation();
    const playlistId = 'pl-zxpr27';
    const playlist = playlists.find(p => p.id === playlistId);
    const isInPl = playlist?.songs.find(s => (s.id || s.key) === (song.id || song.key));
    
    dispatch(togglePlaylistSong({ playlistId, song }));
    toast[isInPl ? 'info' : 'success'](isInPl ? `${song.name} removed from your Journey` : `${song.name} added to your Journey`);
  };

  return (
    <div className={`w-full flex flex-row items-center hover:bg-surface-high ${activeSong?.id === song?.id ? 'bg-surface-highest' : 'bg-transparent'} py-3 p-4 rounded-xl cursor-pointer mb-2 transition-all group ghost-border border-y-0 border-x-0 relative`}>
      <h3 className="font-headline font-black text-xs text-on-surface-variant mr-4 w-5 text-right">{i + 1}</h3>
      <div className="flex-1 flex flex-row justify-between items-center overflow-hidden">
        <img
          className="w-16 h-16 rounded-xl object-cover shadow-2xl"
          src={song?.images?.coverart || song?.album?.images?.[0]?.url || 'https://via.placeholder.com/150'}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-4 overflow-hidden">
          <Link to={`/songs/${song.id}`}>
            <p className="text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors">
              {song?.name}
            </p>
          </Link>
          <p className="text-xs text-on-surface-variant mt-1 truncate uppercase tracking-widest font-bold hover:text-white transition-colors">
            {song?.subtitle || song?.artists?.[0]?.name}
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-2 mr-6" onClick={(e) => e.stopPropagation()}>
         <motion.button
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.9 }}
           onClick={handleFavorite}
           title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
           className={`p-2 transition-all ${isFavorite ? 'text-red-500' : 'text-on-surface-variant hover:text-white'}`}
         >
           <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
         </motion.button>

         <div className="relative">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleTogglePlaylist}
              title={playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (song.id || song.key)) ? "Remove from Journey" : "Add to My Journey"}
              className={`p-2 rounded-lg transition-all ${playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (song.id || song.key)) ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
            >
              <span className="material-symbols-outlined text-[24px]">
                {playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (song.id || song.key)) ? 'check_circle' : 'add_circle'}
              </span>
            </motion.button>
         </div>
      </div>

      <div onClick={(e) => e.stopPropagation()}>
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      </div>
    </div>
  );
};

export default SongBar;
