import { motion } from 'framer-motion';
import { Users, Sparkles, Star } from 'lucide-react';
import { Error, Loader, ArtistCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/apiCore';

const TopArtists = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  if (isFetching) return <Loader title="Syncing artist profiles..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col animate-slowfade">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <div className="flex flex-col">
          <h2 className="font-black text-4xl text-onSurface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-brand-primary/10 text-brand-primary">
               <Users />
             </div>
             Top Artists
          </h2>
          <p className="text-onSurfaceVariant font-bold mt-2 ml-14 flex items-center gap-2">
             <Star size={14} className="text-brand-accent" />
             The most influential artists in the current AI era
          </p>
        </div>

        <div className="flex items-center gap-3 px-6 py-3 bg-surface-mid rounded-2xl ghost-border sm:mt-0 mt-8">
           <Sparkles size={16} className="text-brand-secondaryLight" />
           <p className="text-xs font-black text-onSurfaceVariant uppercase tracking-widest">Profiles Verified</p>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((track) => (
          <ArtistCard
            key={track.id}
            track={track}
          />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
