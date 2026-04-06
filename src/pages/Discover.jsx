import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import { Error, Loader, SongCard } from '../components';
import { selectGenreListId } from '../redux/features/playerSlice';
import { useGetSongsByGenreQuery } from '../redux/services/apiCore';
import { genres } from '../assets/constants';

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId, isLoggedIn } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || '20');
  const [prompt, setPrompt] = useState('');

  if (isFetching) return <Loader title="Syncing with Sonic Canvas AI..." />;
  if (error) return <Error />;

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title || 'Pop';

  return (
    <div className={`flex flex-col animate-slowfade w-full ${!isLoggedIn ? 'px-12 pt-24' : ''}`}>
      {/* Gen AI Creation Studio Hero - Only for logged in */}
      {isLoggedIn && (
        <div className="bg-surface-low rounded-xl p-8 overflow-hidden relative group mb-12 shadow-ambient ghost-border border-y-0 border-r-0 border-l-0">
          <div className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"></div>
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Creation Studio</span>
            </div>
            <h2 className="font-headline text-5xl font-extrabold tracking-tighter mb-4 leading-tight">
              Prompt the <br/><span className="text-primary text-gradient">Neon Future.</span>
            </h2>
            
            <div className="bg-surface-highest rounded-2xl p-4 mt-8 flex flex-col space-y-4 ghost-border">
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="bg-transparent border-none focus:ring-0 text-lg w-full resize-none h-24 placeholder:text-on-surface-variant/50 text-white outline-none" 
                placeholder="Describe the mood, instruments, and BPM (e.g., 'Cyberpunk ambient with heavy synth bass, 110 BPM')"
              />
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2 hidden sm:flex">
                  <button className="px-3 py-1 bg-surface-low hover:bg-surface-mid rounded-full text-xs font-medium border border-outline-variant/30 transition-colors cursor-pointer text-on-surface-variant" onClick={() => setPrompt('Vaporwave synthwave, 80s retro grid')}>Vaporwave</button>
                  <button className="px-3 py-1 bg-surface-low hover:bg-surface-mid rounded-full text-xs font-medium border border-outline-variant/30 transition-colors cursor-pointer text-on-surface-variant" onClick={() => setPrompt('Melodic techno with deep bass')}>Melodic Techno</button>
                </div>
                <button className="flex items-center space-x-2 bg-gradient-to-br from-primary to-primary-dim text-on-primary px-6 py-2 rounded-full font-bold hover:scale-105 transition-transform active:scale-95 ml-auto cursor-pointer">
                  <span>Synthesize</span>
                  <span className="material-symbols-outlined text-sm">bolt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid Header */}
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mb-10">
        <div className="flex flex-col">
          <h2 className="font-black font-headline text-4xl text-on-surface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-secondary/20 text-secondary">
               <span className="material-symbols-outlined">queue_music</span>
             </div>
             Discover <span className="text-primary ml-2">{genreTitle}</span>
          </h2>
          {isLoggedIn && (
            <p className="text-on-surface-variant font-bold mt-2 ml-[60px] flex items-center gap-2 text-sm uppercase tracking-widest">
               <span className="material-symbols-outlined text-sm text-primary">trending_up</span>
               Aggregated from global AI trends
            </p>
          )}
        </div>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || '20'}
          className="bg-surface-mid ghost-border text-on-surface-variant p-4 text-sm font-black rounded-2xl outline-none sm:mt-0 mt-8 focus:shadow-neon-glow transition-all uppercase tracking-widest cursor-pointer"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value} className="bg-surface-mid text-on-surface">
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* Songs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6 gap-y-10 w-full mb-40">
        {data?.map((song, i) => (
          <SongCard
            key={song.id || i}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Discover;
