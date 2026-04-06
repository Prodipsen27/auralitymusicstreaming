import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, addToPlaylist } from '../../redux/features/playerSlice';
import { toast } from 'react-toastify';

const Track = ({ isPlaying, isActive, activeSong }) => {
  const dispatch = useDispatch();
  const { favorites, playlists, isLoggedIn } = useSelector((state) => state.player);

  const isFavorite = favorites.find((s) => (s.id || s.key) === (activeSong.id || activeSong.key));

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (activeSong?.name) {
      dispatch(toggleFavorite(activeSong));
      const isAdding = !favorites.find((s) => (s.id || s.key) === (activeSong.id || activeSong.key));
      toast[isAdding ? 'success' : 'info'](isAdding ? 'Added to Favorites' : 'Removed from Favorites');
    }
  };

  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    // Instant add to default playlist
    if (activeSong?.name) {
      dispatch(addToPlaylist({ playlistId: 'pl-zxpr27', song: activeSong }));
      toast.success(`${activeSong.name} added to your Journey`);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-start group">
      <div className="relative w-16 h-16 mr-4 overflow-hidden rounded-xl shadow-2xl">
        <motion.div 
          animate={isPlaying && isActive ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className={`absolute inset-0 rounded-full border-2 border-primary/20 ${isPlaying && isActive ? 'opacity-100' : 'opacity-0'} transition-opacity`}
        />
        <img 
          src={activeSong?.album?.images?.[0]?.url || activeSong?.images?.coverart || 'https://images.unsplash.com/photo-1614149162883-504ce4d13909?q=80&w=2831&auto=format&fit=crop'} 
          alt="cover" 
          className={`w-full h-full object-cover transition-all duration-700 ${isPlaying && isActive ? 'scale-110 blur-[2px]' : 'scale-100 blur-0'}`} 
        />
        {isPlaying && isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
             <span className="material-symbols-outlined text-primary animate-pulse w-6 h-6 flex items-center justify-center">music_note</span>
          </div>
        )}
      </div>

      <div className="w-[180px] sm:w-[250px] flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1">
           <p className="truncate text-on-surface font-headline font-black text-lg group-hover:text-primary transition-colors cursor-default">
             {activeSong?.name ? activeSong?.name : 'AI Analysis...'}
           </p>
           {isPlaying && (
             <motion.div 
               animate={{ scale: [1, 1.2, 1] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="p-1 rounded-md bg-primary/10 flex items-center justify-center text-primary"
             >
               <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
             </motion.div>
           )}
        </div>
        <Link 
          to={activeSong?.artists?.[0]?.id ? `/artists/${activeSong?.artists?.[0]?.id}` : activeSong?.id ? `/artists/${activeSong?.id}` : '#'}
          onClick={(e) => e.stopPropagation()}
          className="truncate text-on-surface-variant text-xs font-bold uppercase tracking-widest hover:text-secondary transition-colors cursor-pointer w-fit"
        >
          {activeSong?.subtitle ? activeSong?.subtitle : activeSong?.artists?.[0]?.name || 'Waiting for selection'}
        </Link>
      </div>

    </div>
  );
};

export default Track;
