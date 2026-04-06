import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import PlayPause from './PlayPause';
import { playPause, setActiveSong, toggleFavorite, addToPlaylist, togglePlaylistSong } from '../redux/features/playerSlice';
import { toast } from 'react-toastify';

const SongCard = ({ song, isPlaying, activeSong, data, i }) => {
  const dispatch = useDispatch();
  const { favorites, playlists, isLoggedIn } = useSelector((state) => state.player);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const isFavorite = favorites.find((s) => (s.id || s.key) === (song.id || song.key));
  const isInPlaylist = playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (song.id || song.key));

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(song));
    const isAdding = !favorites.find((s) => (s.id || s.key) === (song.id || song.key));
    toast[isAdding ? 'success' : 'info'](isAdding ? 'Added to Favorites' : 'Removed from Favorites');
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    dispatch(togglePlaylistSong({ playlistId: 'pl-zxpr27', song }));
    toast[isInPlaylist ? 'info' : 'success'](isInPlaylist ? `${song.name} removed from your Journey` : `${song.name} added to your Journey`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ y: -5 }}
      className="group cursor-pointer flex flex-col relative z-20"
    >
      <div className="relative aspect-square rounded-xl mb-3 bg-surface-high ghost-border group-hover:shadow-neon-sm transition-all duration-500">
        <div className="absolute inset-0 rounded-xl overflow-hidden z-0">
           <img
             alt="song_img"
             src={song?.images?.coverart || song?.album?.images?.[0]?.url || 'https://via.placeholder.com/250x250'}
             className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
           />
        </div>
        <div className={`absolute inset-0 justify-center items-center bg-black/40 transition-all duration-300 z-10 flex rounded-xl ${activeSong?.id === song.id ? 'opacity-100 bg-black/60' : 'opacity-0 group-hover:opacity-100'}`}>
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>

        {/* Quick Actions Overlay - Only for Logged In */}
        {isLoggedIn && (
          <div className="absolute top-[8%] right-[8%] flex flex-col gap-2 z-[100] transition-opacity md:opacity-0 group-hover:opacity-100">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFavorite}
              title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              className={`w-[clamp(28px,15%,36px)] aspect-square rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${isFavorite ? 'bg-red-500/20 border-red-500/50 text-red-500 shadow-neon-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <span className="material-symbols-outlined text-[clamp(14px,50%,18px)]" style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToPlaylist}
              title={isInPlaylist ? "Remove from My Journey" : "Quick Add to My Journey"}
              className={`w-[clamp(28px,15%,36px)] aspect-square rounded-full backdrop-blur-md flex items-center justify-center border transition-all ${isInPlaylist ? 'bg-primary border-primary text-on-primary shadow-neon-sm' : 'bg-white/10 border-white/20 text-white hover:bg-white/20'}`}
            >
              <span className="material-symbols-outlined text-[clamp(14px,50%,18px)]">{isInPlaylist ? 'check' : 'add'}</span>
            </motion.button>
          </div>
        )}

        {/* Hover glow behind card */}
        <div className="absolute -inset-2 bg-primary/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="flex flex-col">
        <h4 className="font-bold text-sm text-on-surface truncate group-hover:text-primary transition-colors">
          <Link to={`/songs/${song?.id}`}>
            {song?.name || 'Unknown Track'}
          </Link>
        </h4>
        <p className="text-xs truncate text-on-surface-variant mt-1 hover:text-white transition-colors">
          <Link to={`/artists/${song?.artists?.[0]?.id}`}>
            {song?.subtitle || song?.artists?.[0]?.name || 'Unknown Artist'}
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SongCard;
