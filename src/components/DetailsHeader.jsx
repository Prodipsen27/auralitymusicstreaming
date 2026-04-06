import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DetailsHeader = ({ artistId, artistData, songData, firstSongImage }) => {
  const heroImage = artistId
    ? firstSongImage || 'https://via.placeholder.com/600x600?text=Artist'
    : songData?.album?.images?.[0]?.url || 'https://via.placeholder.com/600x600?text=Track';

  const title = artistId ? artistData?.name || 'Artist' : songData?.name || 'Track';

  return (
    <div className="relative w-full flex flex-col">
      {/* Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-tertiary/20 to-transparent blur-3xl opacity-30 -z-10" />

      <div className="w-full bg-surface-low sm:h-64 h-52 flex items-center p-6 sm:p-8 rounded-3xl ghost-border relative overflow-hidden border-y-0 border-x-0 bg-opacity-70">
        <span className="material-symbols-outlined absolute -bottom-12 -right-12 text-primary/5 animate-pulse pointer-events-none text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>

        <motion.img
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          alt="art"
          src={heroImage}
          className="sm:w-44 w-24 sm:h-44 h-24 rounded-xl object-cover shadow-[0_20px_40px_rgba(0,0,0,0.6)] shrink-0 ghost-border"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/600x600?text=Music'; }}
        />

        <div className="ml-6 sm:ml-8 flex flex-col justify-center overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="px-2 py-0.5 rounded-md bg-primary/20 text-primary text-[10px] font-black uppercase tracking-widest whitespace-nowrap">
              {artistId ? 'Artist Profile' : 'Verified Track'}
            </div>
            <span className="material-symbols-outlined text-[12px] text-tertiary animate-pulse">trending_up</span>
          </div>

          <h2 className="font-extrabold font-headline sm:text-5xl text-3xl text-on-surface tracking-tighter truncate max-w-[400px]">
            {title}
          </h2>

          {!artistId && (
            <Link to={`/artists/${songData?.artists?.[0]?.id}`} className="mt-4 flex items-center gap-3 group/link w-fit">
              <div className="p-2 rounded-full bg-surface-highest group-hover/link:bg-primary/20 transition-colors">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover/link:text-primary transition-colors">mic</span>
              </div>
              <p className="sm:text-lg text-base font-bold text-on-surface group-hover/link:text-primary transition-colors truncate max-w-[250px]">
                {songData?.subtitle}
              </p>
            </Link>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            {(artistId ? [] : songData?.genres || []).map((genre, i) => (
              <span key={i} className="text-[10px] font-bold text-secondary uppercase tracking-widest px-3 py-1 bg-secondary/10 rounded-full border border-secondary/20">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
