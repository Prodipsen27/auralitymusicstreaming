import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Searchbar = ({ expandable = false, onToggle }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!expandable);

  const toggleSearch = (state) => {
     setIsExpanded(state);
     if (onToggle) onToggle(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
      if (expandable) toggleSearch(false);
    }
  };

  return (
    <div className={`transition-all duration-500 h-fit flex items-center justify-center ${isExpanded ? 'flex-1 max-w-xl' : 'w-10 overflow-hidden'}`}>
       {!isExpanded ? (
          <motion.button
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.1)' }}
            whileTap={{ scale: 0.9 }}
            onClick={() => toggleSearch(true)}
            className="w-10 h-10 rounded-xl bg-surface-high/40 flex items-center justify-center text-on-surface-variant hover:text-primary transition-all border border-white/5 shadow-lg"
          >
             <span className="material-symbols-outlined text-[20px]">search</span>
          </motion.button>
       ) : (
          <motion.form 
            initial={{ width: 40, opacity: 0 }}
            animate={{ width: '100%', opacity: 1 }}
            onSubmit={handleSubmit} 
            autoComplete="off" 
            className={`relative flex flex-row justify-start items-center p-2 sm:p-2.5 bg-surface-high/60 backdrop-blur-3xl rounded-2xl transition-all duration-500 border border-white/5 ${isFocused ? 'bg-surface-high shadow-neon-lg border-primary/20' : 'hover:border-white/10 shadow-2xl'}`}
          >
            <div className={`absolute inset-0 bg-primary/5 blur-2xl opacity-0 transition-opacity duration-500 pointer-events-none ${isFocused ? 'opacity-100' : ''}`} />
            
            <span className={`material-symbols-outlined ml-3 transition-colors ${isFocused ? 'text-primary' : 'text-on-surface-variant'}`}>search</span>
            
            <input
              name="search-field"
              autoComplete="off"
              id="search-field"
              placeholder="Search tracks..."
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="flex-1 bg-transparent border-none outline-none placeholder-on-surface-variant text-sm sm:text-base text-on-surface px-3 sm:px-4 font-medium tracking-tight"
            />
    
            <AnimatePresence>
              {(searchTerm || expandable) && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  type="button"
                  onClick={() => {
                    if (searchTerm) setSearchTerm('');
                    else if (expandable) toggleSearch(false);
                  }}
                  title="Close Search"
                  className="p-1.5 hover:bg-surface-highest rounded-lg text-on-surface-variant hover:text-white transition-colors h-fit mr-1 cursor-pointer flex items-center justify-center"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </motion.button>
              )}
            </AnimatePresence>
    
            <div 
              title="Sonic AI Search" 
              className="flex items-center gap-2 pr-2 ml-1 pl-2 cursor-pointer group/ai border-l border-white/5" 
            >
               <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover/ai:animate-pulse flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
               </div>
            </div>
          </motion.form>
       )}
    </div>
  );
};

export default Searchbar;
