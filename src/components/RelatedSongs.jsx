import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({ data, isPlaying, activeSong, artistId, handlePauseClick, handlePlayClick }) => (
  <div className="flex flex-col">
    <h1 className="font-extrabold font-headline text-2xl text-on-surface flex items-center gap-3">
      <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
        <span className="material-symbols-outlined text-[20px]">queue_music</span>
      </div>
      {artistId ? 'Top Songs' : 'Related Songs'}
    </h1>

    <div className="mt-6 w-full flex flex-col space-y-2">
      {data && data.length > 0 ? (
        data.map((song, i) => (
          <SongBar
            key={`${song.id}-${i}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-12 bg-surface-mid/30 rounded-3xl ghost-border border-0">
           <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
             <span className="material-symbols-outlined text-[32px]">searching_hands</span>
           </div>
           <p className="text-xs font-black uppercase tracking-widest text-on-surface-variant">No matching sonic patterns found</p>
           <p className="text-[10px] text-on-surface-variant/60 mt-2">Try exploring other dimensions or genres.</p>
        </div>
      )}
    </div>
  </div>
);

export default RelatedSongs;
