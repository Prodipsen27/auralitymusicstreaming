import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, Filter } from 'lucide-react';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/apiCore';

const TopCharts = () => {
  const { activeSong, isPlaying, isLoggedIn } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title={isLoggedIn ? "Retrieving global AI charts..." : "Loading Top Charts..."} />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col animate-slowfade">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <div className="flex flex-col">
          <h2 className="font-black text-4xl text-on-surface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-secondary/20 text-secondary">
               <TrendingUp />
             </div>
             Global Top Charts
          </h2>
          {isLoggedIn && (
            <p className="text-on-surface-variant font-bold mt-2 ml-14 flex items-center gap-2 text-sm uppercase tracking-widest">
               <Sparkles size={14} className="text-primary" />
               The most analyzed tracks across all regions
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 px-6 py-3 bg-surface-mid rounded-2xl ghost-border sm:mt-0 mt-8 cursor-pointer hover:bg-surface-high transition-colors">
           <Filter size={16} className="text-brand-accent" />
           <p className="text-xs font-black text-onSurfaceVariant uppercase tracking-widest">Sort & Refine</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
        {data?.map((song, i) => (
          <SongCard
            key={song.id}
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

export default TopCharts;
