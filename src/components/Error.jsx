import { motion } from 'framer-motion';
import { WifiOff } from 'lucide-react';

const Error = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full h-[60vh] flex flex-col justify-center items-center gap-6 bg-surface-mid rounded-3xl ghost-border p-12 text-center"
  >
    <div className="p-6 rounded-full bg-red-500/10" style={{ border: '1px solid rgba(255, 107, 107, 0.2)' }}>
      <WifiOff size={40} className="text-red-400" />
    </div>
    <div>
      <h2 className="font-black text-2xl text-onSurface mb-2">Connection Error</h2>
      <p className="text-onSurfaceVariant text-sm max-w-sm">
        Unable to fetch data. Please check your internet connection and try again.
      </p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className="px-8 py-3 bg-brand-gradient text-dark font-black rounded-xl text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-primary/20"
    >
      Retry
    </button>
  </motion.div>
);

export default Error;
