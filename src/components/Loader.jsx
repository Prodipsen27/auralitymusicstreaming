import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';

const Loader = ({ title }) => (
  <div className="w-full h-[60vh] flex flex-col justify-center items-center gap-6">
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 rounded-full border-2 border-transparent border-t-brand-primary border-r-brand-secondaryLight"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <Music2 size={24} className="text-brand-primary animate-pulse" />
      </div>
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="text-onSurfaceVariant font-bold text-sm uppercase tracking-widest text-center"
    >
      {title || 'Loading...'}
    </motion.p>
  </div>
);

export default Loader;
