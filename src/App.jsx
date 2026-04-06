import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Routes, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { Searchbar, Sidebar, MusicPlayer, RightSidebar, AIAssistant, BottomNav } from './components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts, Login, Library, Settings, Account } from './pages';
import { logo } from './assets';
import { setLoggedIn } from './redux/features/playerSlice';

const App = () => {
  const { activeSong, isLoggedIn } = useSelector((state) => state.player);
  const dispatch = useDispatch();

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(window.innerWidth > 1024);
  const [showRightSidebar, setShowRightSidebar] = useState(window.innerWidth > 1280);
  const [rightSidebarTab, setRightSidebarTab] = useState('social');
  const [searchExpanded, setSearchExpanded] = useState(false);
  const menuRef = useRef(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleQueue = () => {
    setRightSidebarTab('queue');
    setShowRightSidebar(true);
  };

  // Handle Logout
  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    setProfileMenuOpen(false);
  };

  return (
    <div className="relative flex bg-background text-on-surface min-h-screen overflow-hidden font-body selection:bg-primary/30">
      {/* Animated Aurora Background Layer */}
      <div className="aurora-bg" />

      <Sidebar isVisible={showSidebar} setIsVisible={setShowSidebar} isLoggedIn={isLoggedIn} />

      <div className={`flex-1 transition-[margin,padding,transform] duration-500 ease-out flex flex-col h-screen relative will-change-[margin,padding,transform] ${isLoggedIn ? (showSidebar ? 'lg:ml-64 ml-0' : 'ml-0') : 'ml-0'} ${isLoggedIn && showRightSidebar ? 'xl:mr-80 mr-0' : 'mr-0'}`}>
        {isLoggedIn ? (
          <header className={`fixed top-0 left-0 right-0 h-16 sm:h-20 z-[110] bg-background/60 backdrop-blur-3xl flex justify-between items-center px-4 sm:px-8 lg:px-12 transition-all duration-500 border-b border-white/5`}>

            <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-2xl min-w-0 pr-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                title={showSidebar ? 'Collapse Sidebar' : 'Expand Sidebar'}
                className={`hover:text-primary transition-colors cursor-pointer bg-surface-high/50 p-2 rounded-xl flex items-center justify-center shrink-0 ${showSidebar ? 'text-primary' : 'text-on-surface-variant'}`}
              >
                <span className="material-symbols-outlined">{showSidebar ? 'menu_open' : 'menu'}</span>
              </button>
              <div className="flex-1 w-full min-w-0">
                <Searchbar
                  expandable={window.innerWidth < 1024}
                  onToggle={(state) => setSearchExpanded(state)}
                />
              </div>
              <div className={searchExpanded ? 'w-0 overflow-hidden' : 'block sm:hidden shrink-0'}>
                <Link to="/" className="flex items-center">
                  <img src={logo} alt="Logo" className="w-8 h-8 object-contain" />
                </Link>
              </div>
            </div>

            <div className={`flex items-center gap-3 sm:gap-6 text-on-surface-variant shrink-0 ${searchExpanded ? 'hidden xs:flex' : 'flex'}`}>
              <>
                <div
                  className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-high/50 hover:bg-surface-high transition-colors cursor-pointer text-xs font-bold text-on-surface"
                  title="Install Aurality Desktop App"
                >
                  <span className="material-symbols-outlined text-[18px]">arrow_circle_down</span>
                  <span>Install App</span>
                </div>
                <button className="hover:text-primary transition-colors cursor-pointer" title="Notifications">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
                <button
                  onClick={() => setShowRightSidebar(!showRightSidebar)}
                  title={showRightSidebar ? 'Hide Social Activity' : 'Show Social Activity'}
                  className={`hover:text-primary transition-colors cursor-pointer relative group ${showRightSidebar ? 'text-primary' : ''}`}
                >
                  <span className="material-symbols-outlined">group</span>
                  {/* Party Hover Text */}
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-surface-highest rounded-lg text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-neon-lg border border-primary/20">
                    Party
                  </div>
                </button>

                <div className="relative mr-2 sm:mr-4" ref={menuRef}>
                  <div
                    title="Account Settings"
                    className={`w-10 h-10 rounded-full border-2 transition-all p-[2px] cursor-pointer ${profileMenuOpen ? 'border-primary ring-4 ring-primary/10' : 'border-primary/30'}`}
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                  >
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDah5dJUJWGignZGqs0tYazIDvb3ToSs3HRPLgkyHOKmJkHCVXadqPjhz1vF22pelQuqyKdxKDRsZ0mxjLAeWPIfHrnY-vkxZ899TtDCjWERQuZZRt-WtQyK78DJ6Y8qWBjSRSc37eSFsQnheZhzeg0sd6qtkbTuWFtpw37SdLThibhjAZd_ywk5dOpCbz9ZkTjvOHrg3Aieqq7G_bO_C1VDmyf5Y-dSLfvq1t6ybIFzLZv0j2cYzZZrwnICYvtZXHaZggNcy2mVjfN" alt="Profile" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-14 right-0 w-72 bg-surface-mid rounded-2xl shadow-2xl overflow-hidden ghost-border z-50 border-0"
                      >
                        <div className="p-2 space-y-0.5">
                          <Link to="/account" className="flex items-center justify-between px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm group">
                            <span>Account</span>
                            <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:opacity-100">open_in_new</span>
                          </Link>
                          <Link to="/profile" className="flex items-center justify-between px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm">
                            <span>Profile</span>
                          </Link>
                          <a href="https://prodipsengupta.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center justify-between px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm group">
                            <span>Support</span>
                            <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:opacity-100">open_in_new</span>
                          </a>
                          <Link to="/download" className="flex items-center justify-between px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm group">
                            <span>Download</span>
                            <span className="material-symbols-outlined text-[18px] opacity-60 group-hover:opacity-100">open_in_new</span>
                          </Link>
                          <Link to="/settings" className="flex items-center justify-between px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm">
                            <span>Settings</span>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-4 py-3 hover:bg-surface-highest transition-colors rounded-xl text-on-surface font-bold text-sm text-left"
                          >
                            Log out
                          </button>
                        </div>

                        <div className="bg-surface-low/50 p-6 space-y-4">
                          <h4 className="text-xs font-black uppercase tracking-widest text-on-surface font-headline">Your Updates</h4>
                          <div className="flex flex-col items-center py-4 text-center">
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                              <span className="material-symbols-outlined text-[28px]">done</span>
                            </div>
                            <p className="font-bold text-on-surface text-sm">You're all caught up</p>
                            <p className="text-[11px] text-on-surface-variant mt-2 leading-relaxed">Watch this space for news on your followers, playlists, events and more.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            </div>
          </header>
        ) : (
          <header className={`fixed top-0 left-0 right-0 h-16 sm:h-20 z-[110] bg-background/60 backdrop-blur-3xl flex justify-between items-center px-4 sm:px-8 border-b border-white/5 transition-all`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="hover:text-primary transition-colors cursor-pointer bg-surface-high/50 p-2 rounded-xl flex items-center justify-center text-on-surface-variant shrink-0"
              >
                <span className="material-symbols-outlined">{showSidebar ? 'menu_open' : 'menu'}</span>
              </button>
              <div className="flex-1 max-w-xl">
                <Searchbar
                  expandable={window.innerWidth < 1024}
                  onToggle={(state) => setSearchExpanded(state)}
                />
              </div>
            </div>

            {!searchExpanded && (
              <div className="flex items-center ml-4 shrink-0">
                <Link to="/" className="flex items-center space-x-2">
                  <img src={logo} alt="Aurality Logo" className="w-8 h-8 object-contain" />
                  <h1 className="text-xl font-black text-white font-headline tracking-tighter uppercase hidden xs:block">Aurality</h1>
                </Link>
              </div>
            )}
          </header>
        )}

        <main className={`w-full h-full pb-32 sm:pb-40 overflow-y-auto hide-scrollbar ${isLoggedIn ? 'pt-16 sm:pt-20 px-4 sm:px-8 lg:px-12' : 'px-0 pt-0'}`}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Discover />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Login />} />
              <Route path="/studio" element={<Discover />} />
              <Route path="/playlists" element={<TopCharts />} />
              <Route path="/library" element={<Library />} />
              <Route path="/analytics" element={<AroundYou />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>

      <RightSidebar
        isVisible={isLoggedIn ? showRightSidebar : false}
        setIsVisible={setShowRightSidebar}
        activeTab={rightSidebarTab}
        setActiveTab={setRightSidebarTab}
      />

      {isLoggedIn && <AIAssistant />}

      {activeSong?.name && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 z-[1200]"
        >
          < MusicPlayer onQueueClick={toggleQueue} />
        </motion.div>
      )}

      {isLoggedIn && <BottomNav />}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{ backgroundColor: '#1A1A1A', color: '#D4AF37', border: '1px solid rgba(212, 175, 55, 0.2)' }}
      />
    </div>
  );
};

export default App;
