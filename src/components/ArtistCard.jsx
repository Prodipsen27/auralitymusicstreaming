import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="flex flex-col w-[250px] p-4 bg-surface-high hover:bg-surface-highest transition-all duration-300 rounded-3xl cursor-pointer group ghost-border"
      onClick={() => navigate(`/artists/${track?.artists?.[0]?.id}`)}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-square">
        <img
          alt="artist"
          src={track?.album?.images?.[0]?.url || 'https://via.placeholder.com/250x250'}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {/* Neon glow behind on hover */}
        <div className="absolute -inset-2 bg-brand-primary/10 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      </div>
      
      <p className="mt-4 font-bold text-lg text-onSurface truncate group-hover:text-brand-primaryText transition-colors">
        {track?.subtitle || track?.artists?.[0]?.name}
      </p>
      <p className="text-sm text-onSurfaceVariant uppercase tracking-widest font-bold mt-1">Artist</p>
    </motion.div>
  );
};

export default ArtistCard;
