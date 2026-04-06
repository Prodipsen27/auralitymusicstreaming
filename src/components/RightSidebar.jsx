import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const RightSidebar = ({ isVisible, setIsVisible, activeTab, setActiveTab }) => {
  const { currentSongs, currentIndex, activeSong, isPlaying } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const handlePlayPause = (song, i) => {
    dispatch(setActiveSong({ song, data: currentSongs, i }));
    dispatch(playPause(true));
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop (Only for Drawer mode) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] xl:hidden"
          />

          {/* Sidebar Panel */}
          <motion.aside 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-screen w-80 bg-surface flex flex-col z-[105] py-8 px-6 ghost-border border-y-0 border-r-0 shadow-ambient will-change-transform"
          >
            <div className="flex items-center justify-between mb-8 pt-20">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsVisible(false)}
                  className="xl:hidden text-on-surface-variant hover:text-white transition-colors"
                >
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <h2 className="font-headline font-bold text-lg text-secondary">
                  {activeTab === 'social' ? 'Activity' : 'Current Queue'}
                </h2>
              </div>
              <button className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Add Friends">
                <span className="material-symbols-outlined">person_add</span>
              </button>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setActiveTab('social')}
                className={`pb-1 font-headline text-sm font-bold transition-all ${activeTab === 'social' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-white cursor-pointer'}`}
              >
                Social Feed
              </button>
              <button 
                onClick={() => setActiveTab('queue')}
                className={`pb-1 font-headline text-sm font-bold transition-all ${activeTab === 'queue' ? 'border-b-2 border-primary text-primary' : 'text-on-surface-variant hover:text-white cursor-pointer'}`}
              >
                Queue
              </button>
            </div>

            <div className="flex flex-col gap-6 overflow-y-auto hide-scrollbar flex-1 pb-24">
              {activeTab === 'social' ? (
                <>
                  {/* Friend Activity 1 - Bhagyadeep (The Goblin) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="relative">
                      <img src="/images/avatars/bhagyadeep.jpg" alt="Bhagyadeep" className="w-10 h-10 rounded-full bg-surface-high ring-2 ring-primary p-0.5 object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-on-primary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>graphic_eq</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Bhagyadeep</p>
                      <p className="text-xs text-on-surface-variant">Lurking through <span className="text-primary font-medium">Solar Wind</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">Just now</p>
                    </div>
                  </div>

                  {/* Friend Activity 2 - Nandita (Scholar Girl) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="relative">
                      <img src="/images/avatars/nandita.webp" alt="Nandita" className="w-10 h-10 rounded-full bg-surface-high ring-2 ring-secondary p-0.5 object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-on-secondary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Nandita</p>
                      <p className="text-xs text-on-surface-variant">Studying to <span className="text-secondary font-medium">Neon Midnight</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">2m ago</p>
                    </div>
                  </div>

                  {/* Friend Activity 3 - Biswarup (Nestling Chicken) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <img src="/images/avatars/biswarup.jpg" alt="Biswarup" className="w-10 h-10 rounded-full bg-surface-high grayscale group-hover:grayscale-0 transition-all p-0.5 object-cover" />
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Biswarup</p>
                      <p className="text-xs text-on-surface-variant">Last clucked <span className="text-on-surface font-medium">Quantum Wave</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">1h ago</p>
                    </div>
                  </div>

                  {/* Friend Activity 4 - Soumyajit (Chibi Warrior) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <img src="/images/avatars/soumyajit.webp" alt="Soumyajit" className="w-10 h-10 rounded-full bg-surface-high p-0.5 object-cover" />
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Soumyajit</p>
                      <p className="text-xs text-on-surface-variant">Infiltrating <span className="text-white">Amber Glow</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">3h ago</p>
                    </div>
                  </div>

                  {/* Friend Activity 5 - Rajdeep (Genius Boy) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <img src="/images/avatars/rajdeep.jpg" alt="Rajdeep" className="w-10 h-10 rounded-full bg-surface-high grayscale group-hover:grayscale-0 transition-all p-0.5 object-cover" />
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Rajdeep</p>
                      <p className="text-xs text-on-surface-variant">Analyzing <span className="text-on-surface font-medium">Techno State</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">5h ago</p>
                    </div>
                  </div>

                  {/* Friend Activity 6 - Srikant (The Strategist) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg ring-2 ring-primary/30 p-0.5">S</div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-surface flex items-center justify-center">
                        <span className="material-symbols-outlined text-[10px] text-on-primary font-bold" style={{ fontVariationSettings: "'FILL' 1" }}>leaderboard</span>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Srikant</p>
                      <p className="text-xs text-on-surface-variant">Strategizing <span className="text-primary font-medium">Cosmic Beats</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">8h ago</p>
                    </div>
                  </div>

                  {/* Friend Activity 7 - Arnab (The Architect) */}
                  <div className="flex gap-3 group cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg p-0.5">A</div>
                    <div className="flex flex-col">
                      <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">Arnab</p>
                      <p className="text-xs text-on-surface-variant">Architecting <span className="text-white">Sonic Structures</span></p>
                      <p className="text-[10px] text-on-surface-variant mt-1 opacity-60">12h ago</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  {currentSongs.length > 0 ? (
                    currentSongs.map((song, i) => (
                      <div 
                        key={`${song.id}-${i}`}
                        onClick={() => handlePlayPause(song, i)}
                        className={`flex items-center gap-3 p-2 rounded-xl transition-all cursor-pointer group ${activeSong?.id === song.id ? 'bg-primary/10' : 'hover:bg-surface-highest'}`}
                      >
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <img 
                            src={song?.images?.coverart || song?.album?.images?.[0]?.url || 'https://via.placeholder.com/150'} 
                            alt={song.name} 
                            className="w-full h-full rounded-lg object-cover" 
                          />
                          {activeSong?.id === song.id && isPlaying && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg">
                              <span className="material-symbols-outlined text-primary animate-pulse">graphic_eq</span>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col flex-1 overflow-hidden">
                          <p className={`text-sm font-bold truncate ${activeSong?.id === song.id ? 'text-primary' : 'text-on-surface'}`}>{song.name}</p>
                          <p className="text-xs text-on-surface-variant truncate">{song.subtitle || song?.artists?.[0]?.name}</p>
                        </div>
                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity text-on-surface-variant hover:text-red-400">
                          <span className="material-symbols-outlined text-[18px]">favorite</span>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <span className="material-symbols-outlined text-4xl text-on-surface-variant/30 mb-4">queue_music</span>
                      <p className="text-sm text-on-surface-variant">Your queue is empty</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-auto bg-surface-low p-4 rounded-xl ghost-border mb-24 sm:mb-20">
              <p className="text-xs font-bold text-primary mb-3">Live Session</p>
              <div className="flex -space-x-3 mb-3">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN2Jhbz8pnVCq6hJXJut_NvNiHMhMBCkp4lfZf4dZOUlZdMSAvp4AxITIUARc611LAXOIJu8vCbfLZomXPZDL89gxlba5vGUOE5JXiGbVaTG5eHQItjBlz1CgrxA9dRopzBFV__rnlp2au7OK8r48W1Nbvq9CYzqHbT0fJC26OV40DM0Vm1LdeNzHMGb-U0JKOlK91PTsbENLV4C8u3tYWWYPNf-uX5iN6EcY59TUQkSgZo8_RW0TBFeTzN7gww_r3vyjgKwE_wufP" className="w-8 h-8 rounded-full border-2 border-surface-low" alt="user" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuChZ1Kt5Ep4hnhFshiUZGQy6j8hWstO6mq0w9zO48rSPkmFGNgUlaPf7murNxaEeffP6rSw4N25o8bmKk4nM4taiw4V5m43bNV58fEd2CFdIpT3LbanofXMKb6Vv-a0DPdhpj1MurCpbEQsoKOvWsRKYlxiJlgTUbhwqvzPCjouWY_W0V2LAgYn1ErAyFIqxhLfphQhRG1cVhqASFUgpalZfkW86xbvPlm20Nx0TuRHlFFGS6O7Xj5Ut69WHdJNCwRI1i_LXRITrucE" className="w-8 h-8 rounded-full border-2 border-surface-low" alt="user" />
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN3KOKb37QANIOMgnuboKydCJ_unp6F0Y2_VMUfgBJXDuLfRPNqMiDTmom_5izJcldJ87tjQ9vDEhZd2G--_vApKuW7tI6UWCzWWBTpYT7hTSVwfGfh8Q6D06dvVO8G6Ei1R6J937VTbPIqRFvlpiut2zBa4jDdPcD6folO4NNdWU7aaieRNw2MXXxnG5rh5tOKcxOaTv7-9A3UmvrBpULxaNryRDSIuXrAHeGHuNf7wAGtydX4FPANnYP56UciIkFGA_gsNCy-gRH" className="w-8 h-8 rounded-full border-2 border-surface-low" alt="user" />
                <div className="w-8 h-8 rounded-full bg-surface-high border-2 border-surface-low flex items-center justify-center text-[10px] font-bold">+12</div>
              </div>
              <button className="w-full py-2 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all cursor-pointer">
                Join Listening Party
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default RightSidebar;
