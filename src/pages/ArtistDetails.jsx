import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';
import { useGetArtistDetailsQuery } from '../redux/services/apiCore';
import { setActiveSong, playPause } from '../redux/features/playerSlice';

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetArtistDetailsQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, i, data: data?.songs }));
    dispatch(playPause(true));
  };

  if (isFetching) return <Loader title="Syncing artist metadata..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col animate-slowfade w-full mb-40">
      <DetailsHeader 
        artistId={artistId} 
        artistData={data?.artist} 
        firstSongImage={data?.songs?.[0]?.album?.images?.[0]?.url}
      />

      <div className="mt-12 grid grid-cols-1 xl:grid-cols-3 gap-12 w-full">
        {/* Main Content Area */}
        <div className="xl:col-span-2 flex flex-col space-y-12">
          
          {/* Artist Stats */}
          <div className="flex flex-wrap gap-6">
            <div className="flex-1 min-w-[150px] p-6 bg-surface-mid rounded-3xl ghost-border border-0 bg-opacity-70">
              <span className="material-symbols-outlined text-primary mb-3 text-[24px]">group</span>
              <p className="text-3xl font-extrabold font-headline text-on-surface">42M+</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mt-1">Monthly Listeners</p>
            </div>
            <div className="flex-1 min-w-[150px] p-6 bg-surface-mid rounded-3xl ghost-border border-0 bg-opacity-70">
              <span className="material-symbols-outlined text-secondary mb-3 text-[24px]">trending_up</span>
              <p className="text-3xl font-extrabold font-headline text-on-surface">#12</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mt-1">Global Ranking</p>
            </div>
            <div className="flex-1 min-w-[150px] p-6 bg-surface-mid rounded-3xl ghost-border border-0 bg-opacity-70">
              <span className="material-symbols-outlined text-tertiary mb-3 text-[24px]">location_on</span>
              <p className="text-3xl font-extrabold font-headline text-on-surface">L.A.</p>
              <p className="text-xs text-on-surface-variant uppercase tracking-widest font-bold mt-1">Artist Location</p>
            </div>
          </div>

          <RelatedSongs
            data={data?.songs}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
          />
        </div>

        {/* Sidebar Space */}
        <div className="flex flex-col space-y-8">
           <div className="p-8 glass-heavy rounded-3xl ghost-border relative overflow-hidden group border-0" style={{ borderColor: 'rgba(186, 158, 255, 0.1)' }}>
              <span className="material-symbols-outlined absolute -top-10 -right-10 text-primary/5 group-hover:scale-110 transition-transform duration-1000 text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                AI Discovery
              </h3>
              <p className="text-on-surface-variant leading-relaxed italic text-sm">
                Our GenAI engine identifies this artist as a key influencer in the modern {data?.artist?.genres?.[0]?.name || 'Pop'} movement. Their latest works exhibit a unique structural complexity derived from electronic roots.
              </p>
              <div className="mt-8 pt-8 flex items-center gap-4" style={{ borderTop: '1px solid rgba(186, 158, 255, 0.15)' }}>
                 <button className="flex-1 py-3 bg-gradient-to-br from-primary to-primary-dim text-on-primary font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-neon-glow cursor-pointer">
                   Follow
                 </button>
                 <button className="p-3 bg-surface-highest rounded-xl text-on-surface hover:text-red-400 transition-colors ghost-border cursor-pointer">
                   <span className="material-symbols-outlined text-[18px]">favorite</span>
                 </button>
              </div>
           </div>

           <div className="p-8 bg-surface-mid rounded-3xl ghost-border border-0 bg-opacity-70">
              <h3 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">calendar_today</span>
                Artist About
              </h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                No verified biography available yet. Check back soon for the full GenAI-enriched history!
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <p className="text-xs text-on-surface-variant">Active since 2012</p>
                 </div>
                 <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    <p className="text-xs text-on-surface-variant">Collaborated with AI models</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
