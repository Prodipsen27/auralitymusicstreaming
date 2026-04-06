import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { nextSong, prevSong, playPause, setCurrentTime, setQueue, closePlayer, togglePlaylistSong, toggleFavorite } from '../../redux/features/playerSlice';
import { toast } from 'react-toastify';
import { useGetRelatedSongsQuery } from '../../redux/services/apiCore';
import Controls from './Controls';
import Player from './Player';
import Seekbar from './Seekbar';
import Track from './Track';
import VolumeBar from './VolumeBar';

const MusicPlayer = ({ onQueueClick }) => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying, favorites, playlists } = useSelector((state) => state.player);
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(0.3);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Related Songs as Queue logic
  const songId = activeSong?.id || activeSong?.key;
  const { data: relatedData } = useGetRelatedSongsQuery(songId, { skip: !songId });

  useEffect(() => {
    if (relatedData && relatedData.length > 0) {
      // We only update the queue if the current song is NOT already part of a multi-song context 
      // OR if the user explicitly played a single song.
      // For now, let's follow the user's request: "the queued songs should be related songs"
      dispatch(setQueue([activeSong, ...relatedData]));
    }
  }, [relatedData]);

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    let nextIndex;
    if (!shuffle) {
      nextIndex = (currentIndex + 1) % currentSongs.length;
    } else {
      nextIndex = Math.floor(Math.random() * currentSongs.length);
    }
    
    const nextS = currentSongs[nextIndex];
    dispatch(nextSong(nextIndex));

    // SYNC: If user is on a song details page, follow the song change (lyrics sync)
    if (window.location.pathname.startsWith('/songs/')) {
      const nextId = nextS?.id || nextS?.key;
      if (nextId) navigate(`/songs/${nextId}`);
    }
  };

  const handlePrevSong = () => {
    let prevIndex;
    if (currentIndex === 0) {
      prevIndex = currentSongs.length - 1;
    } else if (shuffle) {
      prevIndex = Math.floor(Math.random() * currentSongs.length);
    } else {
      prevIndex = currentIndex - 1;
    }

    const prevS = currentSongs[prevIndex];
    dispatch(prevSong(prevIndex));

    // SYNC: If user is on a song details page, follow the song change (lyrics sync)
    if (window.location.pathname.startsWith('/songs/')) {
      const prevId = prevS?.id || prevS?.key;
      if (prevId) navigate(`/songs/${prevId}`);
    }
  };

  const handlePlayerClick = () => {
    const songId = activeSong?.id || activeSong?.key;
    if (songId) {
      navigate(`/songs/${songId}`);
    }
  };

  const handleLyricsClick = (e) => {
    e.stopPropagation();
    handlePlayerClick();
  };

  return (
    <div className="p-4 w-full cursor-pointer" onClick={handlePlayerClick}>
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="max-w-7xl mx-auto glass-panel ghost-border rounded-2xl p-4 flex items-center justify-between shadow-ambient relative overflow-hidden"
      >
        {/* Track Info Section */}
        <div className="flex-1 lg:flex-1 flex items-center justify-start min-w-0 pr-2">
          <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        </div>
        
        {/* Center Controls & Seekbar Section */}
        <div 
          className="flex-1 lg:flex-[1.2] flex flex-col items-center justify-center max-w-2xl mx-auto cursor-default px-4 py-2" 
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-center w-full space-y-2">
            <Controls
              isPlaying={isPlaying}
              isActive={isActive}
              repeat={repeat}
              setRepeat={setRepeat}
              shuffle={shuffle}
              setShuffle={setShuffle}
              currentSongs={currentSongs}
              handlePlayPause={handlePlayPause}
              handlePrevSong={handlePrevSong}
              handleNextSong={handleNextSong}
              isFavorite={favorites.find((s) => (s.id || s.key) === (activeSong?.id || activeSong?.key))}
              isInPlaylist={playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (activeSong?.id || activeSong?.key))}
              handleFavorite={(e) => {
                e.stopPropagation();
                dispatch(toggleFavorite(activeSong));
                const isAdding = !favorites.find((s) => (s.id || s.key) === (activeSong?.id || activeSong?.key));
                toast[isAdding ? 'success' : 'info'](isAdding ? 'Added to Favorites' : 'Removed from Favorites');
              }}
              handleAddToPlaylist={(e) => {
                e.stopPropagation();
                const isInPl = playlists.find(pl => pl.id === 'pl-zxpr27')?.songs.find(s => (s.id || s.key) === (activeSong?.id || activeSong?.key));
                dispatch(togglePlaylistSong({ playlistId: 'pl-zxpr27', song: activeSong }));
                toast[isInPl ? 'info' : 'success'](isInPl ? `${activeSong.name} removed from your Journey` : `${activeSong.name} added to your Journey`);
              }}
            />
            <div className="w-full mt-1">
              <Seekbar
                value={appTime}
                min="0"
                max={duration}
                onInput={(event) => setSeekTime(event.target.value)}
                setSeekTime={setSeekTime}
                appTime={appTime}
              />
            </div>
          </div>
          <Player
            activeSong={activeSong}
            volume={volume}
            isPlaying={isPlaying}
            seekTime={seekTime}
            repeat={repeat}
            currentIndex={currentIndex}
            onEnded={handleNextSong}
            onTimeUpdate={(event) => {
              setAppTime(event.target.currentTime);
              dispatch(setCurrentTime(event.target.currentTime));
            }}
            onLoadedData={(event) => setDuration(event.target.duration)}
          />
        </div>
        
        {/* Volume & Extras Section (Desktop) */}
        <div className="hidden lg:flex flex-1 items-center justify-end" onClick={(e) => e.stopPropagation()}>
          <VolumeBar 
            value={volume} 
            min="0" 
            max="1" 
            onChange={(event) => setVolume(event.target.value)} 
            setVolume={setVolume} 
            onLyricsClick={handleLyricsClick}
            onQueueClick={onQueueClick}
          />
        </div>

        {/* Mobile Extras Toggle (Queue/Lyrics) */}
        <div className="lg:hidden flex items-center gap-2 ml-2" onClick={(e) => e.stopPropagation()}>
           <motion.button
             whileTap={{ scale: 0.9 }}
             onClick={() => dispatch(closePlayer())}
             className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 transition-all border border-red-500/10"
           >
             <span className="material-symbols-outlined text-[20px]">close</span>
           </motion.button>
           <motion.button
             whileTap={{ scale: 0.9 }}
             onClick={onQueueClick}
             className="w-10 h-10 rounded-xl bg-surface-high flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors border border-white/5"
           >
             <span className="material-symbols-outlined text-[20px]">queue_music</span>
           </motion.button>
        </div>

        {/* Global Exit Button (Desktop Only) */}
        <div className="hidden lg:flex items-center ml-4 border-l border-white/5 pl-4" onClick={(e) => e.stopPropagation()}>
           <motion.button
             whileHover={{ scale: 1.1, rotate: 90 }}
             whileTap={{ scale: 0.9 }}
             onClick={() => dispatch(closePlayer())}
             title="Dismiss Player"
             className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-on-surface-variant hover:text-red-500 transition-all shadow-lg"
           >
             <span className="material-symbols-outlined text-[18px]">close</span>
           </motion.button>
        </div>
        
        {/* Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-transparent -z-10 pointer-events-none" />
      </motion.div>
    </div>
  );
};

export default MusicPlayer;
