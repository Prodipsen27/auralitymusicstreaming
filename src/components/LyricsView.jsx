import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const LyricsView = () => {
  const { activeSong, currentTime } = useSelector((state) => state.player);
  const [lyrics, setLyrics] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [activeLine, setActiveLine] = useState(0);
  const scrollRef = useRef(null);

  const parseLRC = (lrc) => {
    const lines = lrc.split('\n');
    const result = [];
    const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;

    lines.forEach((line) => {
      const match = timeRegex.exec(line);
      if (match) {
        const minutes = parseInt(match[1], 10);
        const seconds = parseInt(match[2], 10);
        const milliseconds = parseInt(match[3], 10);
        const time = minutes * 60 + seconds + (milliseconds / 100);
        const text = line.replace(timeRegex, '').trim();
        if (text) result.push({ time, text });
      }
    });

    return result.sort((a, b) => a.time - b.time);
  };

  useEffect(() => {
    const fetchLyrics = async () => {
      if (!activeSong?.name) return;
      
      setIsFetching(true);
      setLyrics([]);
      
      try {
        const artist = activeSong.subtitle || activeSong.artists?.[0]?.name;
        const track = activeSong.name;
        const url = `https://lrclib.net/api/get?artist_name=${encodeURIComponent(artist)}&track_name=${encodeURIComponent(track)}`;
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.syncedLyrics) {
          setLyrics(parseLRC(data.syncedLyrics));
        } else if (data.plainLyrics) {
          setLyrics(data.plainLyrics.split('\n').map((text, i) => ({ time: i * 5, text })));
        }
      } catch (error) {
        console.error('Error fetching lyrics:', error);
      } finally {
        setIsFetching(false);
      }
    };

    fetchLyrics();
  }, [activeSong?.id]);

  useEffect(() => {
    if (lyrics.length > 0) {
      const currentLine = lyrics.findLastIndex((line) => currentTime >= line.time);
      if (currentLine !== -1 && currentLine !== activeLine) {
        setActiveLine(currentLine);
        const lineElement = document.getElementById(`lyric-line-${currentLine}`);
        if (lineElement && scrollRef.current) {
          scrollRef.current.scrollTo({
            top: lineElement.offsetTop - scrollRef.current.offsetHeight / 2,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [currentTime, lyrics]);

  if (isFetching) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-on-surface-variant">
        <span className="material-symbols-outlined animate-spin mb-4 text-primary text-[40px]">progress_activity</span>
        <p className="animate-pulse">Retrieving synced lyrics...</p>
      </div>
    );
  }

  if (lyrics.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-on-surface-variant bg-surface-mid rounded-3xl ghost-border border-dashed">
        <span className="material-symbols-outlined mb-4 opacity-20 text-[48px]">speaker_notes_off</span>
        <p className="text-lg">No lyrics found for this track.</p>
        <p className="text-sm mt-2">We're expanding our AI database daily.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full items-center justify-center text-center">
      <div className="flex items-center gap-3 mb-12">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>music_note</span>
        </div>
        <h2 className="text-2xl font-extrabold text-on-surface font-headline uppercase tracking-tighter">Live Lyrics</h2>
        <span className="px-2 py-0.5 rounded-md bg-secondary/20 text-secondary text-[10px] font-black uppercase tracking-widest">
          Synced
        </span>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 w-full overflow-y-auto hide-scrollbar space-y-12 pb-[50vh] pt-10"
      >
        <AnimatePresence>
          {lyrics.map((line, i) => (
            <motion.p
              id={`lyric-line-${i}`}
              key={i}
              initial={{ opacity: 0.1, y: 10 }}
              animate={{ 
                opacity: activeLine === i ? 1 : 0.25,
                scale: activeLine === i ? 1.15 : 1,
                y: activeLine === i ? 0 : 0,
                color: activeLine === i ? '#ffffff' : '#9ca3af'
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`text-3xl sm:text-4xl lg:text-5xl font-black font-headline transition-all duration-700 cursor-default px-4 leading-tight ${
                activeLine === i ? 'drop-shadow-[0_0_25px_rgba(212,175,55,0.4)]' : 'blur-[0.5px]'
              }`}
            >
              {line.text}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LyricsView;
