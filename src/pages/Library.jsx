import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { LibraryBig, Heart, ListMusic, Sparkles, Plus } from 'lucide-react';
import { SongCard, SongBar } from '../components';
import { useDispatch } from 'react-redux';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const Library = () => {
  const dispatch = useDispatch();
  const { favorites, playlists, activeSong, isPlaying } = useSelector((state) => state.player);
  const [activeTab, setActiveTab] = useState('favorites');
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    const data = selectedPlaylist ? selectedPlaylist.songs : favorites;
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const handlePlaylistClick = (pl) => {
    setSelectedPlaylist(pl);
  };

  const handleBackToLibrary = () => {
    setSelectedPlaylist(null);
  };

  return (
    <div className="flex flex-col animate-slowfade">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-8">
        <div className="flex flex-col">
          <h2 className="font-black text-4xl text-on-surface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-primary/10 text-primary group-hover:rotate-6 transition-transform">
               <LibraryBig size={28} />
             </div>
             Your Library
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 ml-14 flex items-center gap-2">
             <Sparkles size={14} className="text-tertiary" />
             Everything you've curated in your sonic journey
          </p>
        </div>

        <div className="flex items-center gap-4 sm:mt-0 mt-8">
           <button className="flex items-center gap-2 px-6 py-3 bg-primary text-on-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon-lg hover:scale-105 transition-transform cursor-pointer">
              <Plus size={16} />
              New Playlist
           </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selectedPlaylist ? (
          <motion.div
            key="library-tabs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-8 mb-10 border-b border-white/5 pb-2">
              <button 
                onClick={() => setActiveTab('favorites')}
                className={`flex items-center gap-3 pb-3 px-2 transition-all relative ${activeTab === 'favorites' ? 'text-primary' : 'text-on-surface-variant hover:text-white cursor-pointer'}`}
              >
                <Heart size={18} fill={activeTab === 'favorites' ? "currentColor" : "none"} />
                <span className="font-headline font-bold">Liked Songs</span>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-black">{favorites.length}</span>
                {activeTab === 'favorites' && <motion.div layoutId="libTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
              </button>

              <button 
                onClick={() => setActiveTab('playlists')}
                className={`flex items-center gap-3 pb-3 px-2 transition-all relative ${activeTab === 'playlists' ? 'text-primary' : 'text-on-surface-variant hover:text-white cursor-pointer'}`}
              >
                <ListMusic size={18} />
                <span className="font-headline font-bold">Your Playlists</span>
                <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-black">{playlists.length}</span>
                {activeTab === 'playlists' && <motion.div layoutId="libTab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full" />}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'favorites' ? (
                <motion.div 
                  key="favs"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="flex flex-col gap-1"
                >
                  {favorites.length > 0 ? (
                    favorites.map((song, i) => (
                      <SongBar
                        key={song.id || song.key}
                        song={song}
                        i={i}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        handlePauseClick={handlePauseClick}
                        handlePlayClick={handlePlayClick}
                      />
                    ))
                  ) : (
                    <div className="w-full flex flex-col items-center justify-center py-24 text-center">
                       <div className="w-20 h-20 rounded-full bg-surface-high flex items-center justify-center mb-6 text-on-surface-variant/20">
                          <Heart size={40} />
                       </div>
                       <h3 className="text-xl font-bold text-on-surface">No liked songs yet</h3>
                       <p className="text-on-surface-variant mt-2 max-w-sm">Tap the heart on any track to start building your personal collection.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="pls"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {playlists.map((pl) => (
                    <div onClick={() => handlePlaylistClick(pl)} key={pl.id} className="group p-5 rounded-2xl bg-surface-mid ghost-border hover:bg-surface-high transition-all cursor-pointer">
                      <div className="aspect-square rounded-xl overflow-hidden bg-primary/10 flex items-center justify-center mb-4 relative">
                         {pl.songs.length > 0 ? (
                            <img src={pl.songs[0]?.images?.coverart || pl.songs[0]?.album?.images?.[0]?.url} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                         ) : (
                            <ListMusic size={48} className="text-primary/40 group-hover:scale-110 transition-transform" />
                         )}
                         <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all scale-75 group-hover:scale-100">
                             <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-neon-lg">
                                 <span className="material-symbols-outlined text-3xl font-black">play_arrow</span>
                             </div>
                         </div>
                      </div>
                      <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">{pl.name}</h3>
                      <p className="text-xs text-on-surface-variant mt-1 mb-4 line-clamp-2">{pl.description}</p>
                      <div className="flex items-center justify-between mt-auto">
                         <p className="text-[10px] font-black uppercase tracking-widest text-on-surface-variant/60">{pl.songs.length} Tracks</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="playlist-detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex flex-col gap-8"
          >
            {/* Playlist Header */}
            <div className="flex flex-col md:flex-row items-center md:items-end gap-10">
              <div className="w-64 h-64 rounded-3xl overflow-hidden shadow-ambient-lg border border-white/5 relative group">
                {selectedPlaylist.songs.length > 0 ? (
                  <img src={selectedPlaylist.songs[0]?.images?.coverart || selectedPlaylist.songs[0]?.album?.images?.[0]?.url} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-surface-high flex items-center justify-center text-primary/20">
                    <ListMusic size={120} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="flex-1 flex flex-col items-center md:items-start">
                <button 
                  onClick={handleBackToLibrary}
                  className="flex items-center gap-2 mb-6 text-on-surface-variant hover:text-primary transition-all font-black text-xs uppercase tracking-[0.2em] group"
                >
                   <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">arrow_back</span>
                   Back to Library
                </button>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-3">Playlist</p>
                <h1 className="text-5xl lg:text-7xl font-black text-on-surface font-headline tracking-tighter mb-4">{selectedPlaylist.name}</h1>
                <p className="text-on-surface-variant max-w-2xl font-bold">{selectedPlaylist.description}</p>
              </div>
            </div>

            {/* Playlist Actions */}
            <div className="flex items-center gap-6 mt-4">
               <button 
                 onClick={() => handlePlayClick(selectedPlaylist.songs[0], 0)}
                 className="px-8 py-4 bg-primary text-on-primary rounded-2xl font-black text-xs uppercase tracking-widest shadow-neon-lg hover:scale-105 transition-transform flex items-center gap-3"
               >
                 <span className="material-symbols-outlined font-black">play_arrow</span>
                 Play All
               </button>
               <button className="w-14 h-14 rounded-2xl bg-surface-high flex items-center justify-center text-on-surface hover:text-primary transition-all border border-white/5 group">
                  <span className="material-symbols-outlined text-[24px]">more_horiz</span>
               </button>
            </div>

            {/* Song List */}
            <div className="flex flex-col gap-1 mt-6">
              {selectedPlaylist.songs.length > 0 ? (
                selectedPlaylist.songs.map((song, i) => (
                  <SongBar
                    key={song.id || song.key}
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    handlePauseClick={handlePauseClick}
                    handlePlayClick={handlePlayClick}
                  />
                ))
              ) : (
                <div className="w-full h-64 rounded-3xl bg-surface-mid/50 border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12">
                   <span className="material-symbols-outlined text-[48px] text-on-surface-variant/20 mb-4">music_off</span>
                   <h3 className="text-xl font-bold text-on-surface/50">This sequence is empty</h3>
                   <p className="text-on-surface-variant/40 mt-2">Begin your journey by adding sonic patterns to this collection.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Library;
