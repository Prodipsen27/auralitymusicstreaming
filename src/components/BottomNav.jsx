import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const BottomNav = () => {
  const links = [
    { name: 'Home', to: '/', icon: 'home' },
    { name: 'Studio', to: '/studio', icon: 'auto_awesome' },
    { name: 'Library', to: '/library', icon: 'library_music' },
    { name: 'Account', to: '/account', icon: 'person' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1100] lg:hidden">
      <div className="mx-4 mb-4 glass-heavy ghost-border rounded-2xl flex items-center justify-around px-2 py-3 shadow-neon-lg relative overflow-hidden">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `
              flex flex-col items-center justify-center space-y-1 transition-all relative z-10
              ${isActive ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-white'}
            `}
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>
                    {item.icon}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="bottomNavIndicator"
                      className="absolute -inset-2 bg-primary/10 rounded-full -z-10"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter">{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
        
        {/* Subtle Ambient Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      </div>
    </nav>
  );
};

export default BottomNav;
