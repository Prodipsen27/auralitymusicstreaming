import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { logo } from '../assets';

const links = [
  { name: 'Discover', to: '/', icon: 'explore' },
  { name: 'Gen AI Studio', to: '/studio', icon: 'auto_awesome' },
  { name: 'Smart Playlists', to: '/playlists', icon: 'queue_music' },
  { name: 'Library', to: '/library', icon: 'library_music' },
  { name: 'Analytics', to: '/analytics', icon: 'bar_chart' },
];

const guestLinks = [
  { name: 'Discover', to: '/', icon: 'explore' },
  { name: 'Top Charts', to: '/top-charts', icon: 'trending_up' },
  { name: 'Top Artists', to: '/top-artists', icon: 'person_star' },
];

const NavLinks = ({ handleClick, isLoggedIn }) => {
  const currentLinks = isLoggedIn ? links : guestLinks;
  return (
    <div className="flex-1 space-y-2">
      {currentLinks.map((item) => (
        <NavLink
          key={item.name}
          to={item.to}
          end={item.to === '/'}
          title={`Go to ${item.name}`}
          className={({ isActive }) => `
            flex items-center space-x-3 px-4 py-3 font-body text-sm font-medium transition-all
            ${isActive 
              ? 'bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-4 border-primary' 
              : 'text-on-surface-variant hover:bg-surface-high hover:text-white tap-highlight-transparent active:opacity-80 border-l-4 border-transparent'}
          `}
          onClick={() => handleClick && handleClick()}
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            {item.icon}
          </span>
          <span>{item.name}</span>
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = ({ isVisible, setIsVisible, isLoggedIn }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`h-screen w-64 fixed left-0 top-0 bg-surface-low shadow-2xl flex-col pt-24 pb-8 px-2 space-y-6 z-[60] hidden lg:flex transition-transform duration-500 ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between mb-6 px-6">
          <Link to="/" className="flex items-center space-x-3" title="Aurality Home">
            <img src={logo} alt="Aurality Logo" className="w-30 h-30 object-contain" />
          </Link>
          <button onClick={() => setIsVisible(false)} className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Collapse Sidebar">
            <span className="material-symbols-outlined">first_page</span>
          </button>
        </div>

        <NavLinks isLoggedIn={isLoggedIn} />
        
        {!isLoggedIn && (
          <div className="pt-6 space-y-2 px-2">
             <Link to="/login" className="flex items-center justify-center w-full py-3 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-xl text-sm font-black shadow-neon-glow hover:scale-[1.02] transition-all uppercase tracking-widest">
                Log In
             </Link>
             <Link to="/login" className="flex items-center justify-center w-full py-3 bg-white/5 text-on-surface hover:bg-white/10 rounded-xl text-sm font-bold transition-all ghost-border">
                Sign Up
             </Link>
          </div>
        )}

        {isLoggedIn && (
          <div className="pt-6 space-y-1">
            <NavLink 
              to="/settings" 
              title="Manage Settings"
              className={({ isActive }) => `flex items-center space-x-3 px-4 py-2 font-body text-sm font-medium transition-all ${isActive ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}
            >
              <span className="material-symbols-outlined">settings</span>
              <span>Settings</span>
            </NavLink>
          </div>
        )}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsVisible(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] lg:hidden"
            />
            
            {/* Drawer Content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-screen w-[280px] glass-heavy z-[130] py-8 px-6 flex flex-col justify-between lg:hidden shadow-ambient"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <img src={logo} alt="Aurality Logo" className="w-8 h-8 object-contain" />
                    <h1 className="text-xl font-black text-white font-headline tracking-tighter uppercase">Aurality</h1>
                  </div>
                  <button onClick={() => setIsVisible(false)} className="text-on-surface-variant hover:text-white">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <NavLinks isLoggedIn={isLoggedIn} handleClick={() => setIsVisible(false)} />
                
                {!isLoggedIn && (
                  <div className="mt-8 space-y-2">
                     <Link to="/login" onClick={() => setIsVisible(false)} className="flex items-center justify-center w-full py-4 bg-gradient-to-br from-primary to-primary-dim text-on-primary rounded-2xl text-sm font-black shadow-neon-glow transition-all uppercase tracking-widest">
                        Log In
                     </Link>
                     <Link to="/login" onClick={() => setIsVisible(false)} className="flex items-center justify-center w-full py-4 bg-white/5 text-on-surface rounded-2xl text-sm font-bold transition-all border border-white/10 hover:bg-white/10">
                        Create Account
                     </Link>
                  </div>
                )}
              </div>
              
              <div className="pt-10 ghost-border border-t border-b-0 border-r-0 border-l-0 mt-8">
                 <p className="text-[10px] text-center text-on-surface-variant uppercase tracking-widest font-black">Aurality v1.0 • Sonic Canvas</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
