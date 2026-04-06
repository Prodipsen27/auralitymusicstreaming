import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper';
import { motion } from 'framer-motion';
import { TrendingUp, Users, ChevronRight } from 'lucide-react';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import { useGetTopChartsQuery } from '../redux/services/apiCore';
import 'swiper/css';
import 'swiper/css/free-mode';

const TopChartCard = ({ song, i, isPlaying, activeSong, handlePauseClick, handlePlayClick }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: i * 0.1 }}
    className={`w-full flex flex-row items-center hover:bg-surface-bright ${activeSong?.id === song?.id ? 'bg-surface-highest' : 'bg-transparent'} py-2 p-4 rounded-2xl cursor-pointer mb-2 transition-all group`}
  >
    <h3 className="font-black text-xs text-onSurfaceVariant mr-3 w-4">{i + 1}</h3>
    <div className="flex-1 flex flex-row justify-between items-center overflow-hidden">
      <img className="w-14 h-14 rounded-xl object-cover shadow-lg" src={song?.album?.images?.[0]?.url} alt={song?.name} />
      <div className="flex-1 flex flex-col justify-center mx-3 overflow-hidden">
        <Link to={`/songs/${song.id}`}>
          <p className="text-sm font-bold text-onSurface truncate group-hover:text-brand-primaryText transition-colors">
            {song?.name}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists?.[0]?.id}`}>
          <p className="text-[10px] text-onSurfaceVariant mt-1 truncate hover:text-onSurface transition-colors uppercase tracking-widest font-black">
            {song?.subtitle || song?.artists?.[0]?.name}
          </p>
        </Link>
      </div>
    </div>
    <PlayPause
      isPlaying={isPlaying}
      activeSong={activeSong}
      song={song}
      handlePause={handlePauseClick}
      handlePlay={handlePlayClick}
    />
  </motion.div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopChartsQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const topPlays = data?.slice(0, 5);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  return (
    <div ref={divRef} className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[450px] w-full flex flex-col pt-4">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center mb-6">
          <h2 className="text-onSurface font-black text-xl flex items-center gap-2">
             <div className="p-2 rounded-xl bg-brand-primary/10 text-brand-primary">
                <TrendingUp size={18} />
             </div>
             Top Charts
          </h2>
          <Link to="/top-charts" className="group/see flex items-center gap-1">
            <p className="text-onSurfaceVariant text-xs font-bold uppercase tracking-widest cursor-pointer group-hover/see:text-brand-primary transition-colors">See more</p>
            <ChevronRight size={14} className="text-onSurfaceVariant group-hover/see:text-brand-primary transition-all" />
          </Link>
        </div>

        <div className="flex flex-col gap-1">
          {topPlays?.map((song, i) => (
            <TopChartCard
              key={song.id}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={() => handlePlayClick(song, i)}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-12 bg-surface-mid rounded-[40px] p-8 ghost-border relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/10 to-transparent z-0" />
        
        <div className="flex flex-row justify-between items-center relative z-10 mb-6">
          <h2 className="text-onSurface font-black text-xl flex items-center gap-2">
             <div className="p-2 rounded-xl bg-brand-secondary/20 text-brand-secondaryLight">
                <Users size={18} />
             </div>
             Top Artists
          </h2>
          <Link to="/top-artists">
            <ChevronRight size={20} className="text-onSurfaceVariant hover:text-onSurface transition-colors" />
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="w-full relative z-10"
        >
          {topPlays?.map((song) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: '25%', height: 'auto' }}
              className="shadow-2xl rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.artists?.[0]?.id}`} className="block relative group/artist">
                <div className="absolute inset-0 bg-brand-primary shadow-[0_0_20px_rgba(0,245,212,0.5)] rounded-full opacity-0 group-hover/artist:opacity-100 transition-opacity duration-500 -z-10 blur-md scale-110" />
                <img src={song?.album?.images?.[0]?.url} alt="name" className="rounded-full w-full object-cover border-2 border-surface-highest group-hover/artist:border-brand-primary transition-all duration-500" />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
