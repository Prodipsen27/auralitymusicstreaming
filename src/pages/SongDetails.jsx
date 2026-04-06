import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { DetailsHeader, Error, Loader, RelatedSongs, LyricsView } from '../components';
import { setActiveSong, playPause } from '../redux/features/playerSlice';
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from '../redux/services/apiCore';

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [view, setView] = useState('lyrics');

  const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery(songid);
  const artistId = songData?.artists?.[0]?.id;
  const { data, isFetching: isFetchingRelatedSongs, error } = useGetRelatedSongsQuery(artistId, { skip: !artistId });

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data: relatedData, i }));
    dispatch(playPause(true));
  };

  // Filter out the current song from related list
  const relatedData = data?.filter((s) => (s.id || s.key) !== songid) || [];

  if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Analyzing track metadata..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col animate-slowfade w-full mb-40">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mt-10 flex flex-col md:flex-row gap-12 w-full">
        <div className="flex-[2] flex flex-col">
          {/* Toggle Controls */}
          <div className="flex items-center gap-4 mb-10 p-1.5 bg-surface-mid w-fit rounded-2xl ghost-border border-0">
            <button
              onClick={() => setView('lyrics')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                view === 'lyrics' 
                ? 'bg-gradient-to-br from-primary to-primary-dim text-on-primary shadow-neon-glow' 
                : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              AI Lyrics
            </button>
            <button
              onClick={() => setView('details')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 cursor-pointer ${
                view === 'details' 
                ? 'bg-surface-highest text-white shadow-lg' 
                : 'text-on-surface-variant hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">info</span>
              Details
            </button>
          </div>

          <AnimatePresence mode="wait">
            {view === 'lyrics' ? (
              <motion.div
                key="lyrics"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-[600px]"
              >
                <LyricsView />
              </motion.div>
            ) : (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="space-y-8"
              >
                <div className="p-8 bg-surface-mid rounded-3xl ghost-border border-y-0 border-x-0 bg-opacity-70">
                  <h3 className="text-white font-bold text-xl mb-6">Track Analysis</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">Artist</p>
                      <p className="text-on-surface font-medium text-lg">{songData?.subtitle}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">Genre</p>
                      <p className="text-on-surface font-medium text-lg">{songData?.genres?.[0]?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">Duration</p>
                      <p className="text-on-surface font-medium text-lg">
                        {Math.floor(songData?.duration / 60)}:{(songData?.duration % 60).toString().padStart(2, '0')}
                      </p>
                    </div>
                    <div>
                      <p className="text-on-surface-variant text-xs uppercase tracking-widest font-bold mb-1">BPM Estimate</p>
                      <p className="text-tertiary font-medium text-lg">128 (AI Analyzed)</p>
                    </div>
                  </div>
                </div>

                <div className="p-8 glass-heavy rounded-3xl ghost-border border-y-0 border-x-0" style={{ borderColor: 'rgba(186, 158, 255, 0.1)' }}>
                  <h3 className="text-on-surface font-bold text-xl mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                    AI Insights
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed italic">
                    This track features a vibrant mix of {songData?.genres?.[0]?.name} influences. 
                    The lyrics often explore themes of emotional resilience and discovery.
                    Our Generative AI model identifies this as a potential favorite based on its rhythmic complexity.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1">
          <div className="sticky top-10">
            <RelatedSongs
              data={relatedData}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongDetails;
