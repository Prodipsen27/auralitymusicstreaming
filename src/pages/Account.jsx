import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { setLoggedIn } from '../redux/features/playerSlice';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const { favorites, playlists, isLoggedIn } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = {
    name: 'zxpr27',
    email: 'zxprgaming27@gmail.com',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDah5dJUJWGignZGqs0tYazIDvb3ToSs3HRPLgkyHOKmJkHCVXadqPjhz1vF22pelQuqyKdxKDRsZ0mxjLAeWPIfHrnY-vkxZ899TtDCjWERQuZZRt-WtQyK78DJ6Y8qWBjSRSc37eSFsQnheZhzeg0sd6qtkbTuWFtpw37SdLThibhjAZd_ywk5dOpCbz9ZkTjvOHrg3Aieqq7G_bO_C1VDmyf5Y-dSLfvq1t6ybIFzLZv0j2cYzZZrwnICYvtZXHaZggNcy2mVjfN',
    plan: 'Quantum Access',
    joined: 'April 2026'
  };

  const handleLogout = () => {
    dispatch(setLoggedIn(false));
    navigate('/');
  };

  if (!isLoggedIn) {
     return (
       <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <span className="material-symbols-outlined text-6xl text-primary/30 mb-4 animate-pulse">lock</span>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Access Denied</h2>
          <p className="text-on-surface-variant max-w-sm mb-8">Please establish a connection to view your neural telemetry.</p>
          <button 
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-primary text-on-primary rounded-xl font-bold uppercase tracking-widest text-xs shadow-neon-lg transition-transform hover:scale-105"
          >
            Go to Login
          </button>
       </div>
     );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 animate-slowfade">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
         <div className="relative group">
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-br from-primary to-primary-dim shadow-neon-lg overflow-hidden">
               <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-all duration-700" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-surface-highest p-2 rounded-xl ghost-border shadow-xl">
               <span className="material-symbols-outlined text-primary text-[20px]">verified_user</span>
            </div>
         </div>
         
         <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl font-black text-white font-headline tracking-tighter uppercase mb-2">
               User: <span className="text-primary italic inline-block">{user.name}</span>
            </h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-on-surface-variant">
               <div className="flex items-center gap-2 px-3 py-1 bg-surface-high rounded-full border border-white/5 text-xs font-bold transition-all hover:bg-surface-highest">
                  <span className="material-symbols-outlined text-[14px]">alternate_email</span>
                  {user.email}
               </div>
               <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full border border-primary/20 text-xs font-bold text-primary">
                  <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                  {user.plan}
               </div>
               <div className="text-[10px] font-black uppercase tracking-widest opacity-40">
                  Joined: {user.joined}
               </div>
            </div>
         </div>
         
         <div className="flex gap-3">
            <button className="px-6 py-3 rounded-xl bg-surface-highest hover:bg-white/10 transition-colors border border-white/5 font-bold text-xs uppercase tracking-widest cursor-pointer">
               Edit Profile
            </button>
            <button 
              onClick={handleLogout}
              className="px-6 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors border border-red-500/20 font-bold text-xs uppercase tracking-widest cursor-pointer"
            >
               Log out
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         {[
           { label: 'Favorites', value: favorites.length, icon: 'favorite', color: 'text-red-500' },
           { label: 'Playlists', value: playlists.length, icon: 'queue_music', color: 'text-primary' },
           { label: 'AI Synthesis', value: '14.2h', icon: 'bolt', color: 'text-secondary' },
         ].map((stat) => (
           <div key={stat.label} className="bg-surface-mid/40 p-8 rounded-3xl ghost-border transition-all hover:bg-surface-mid group cursor-default">
              <div className={`w-12 h-12 rounded-2xl bg-surface-high flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${stat.color}`}>
                 <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
              </div>
              <h3 className="text-4xl font-black text-white font-headline mb-2">{stat.value}</h3>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">{stat.label}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-40">
         {/* Preferences */}
         <div className="bg-surface-low rounded-[32px] p-10 ghost-border relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 blur-[80px] rounded-full" />
            <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-primary">tune</span>
               Deep Preferences
            </h4>
            
            <div className="space-y-6">
               {[
                 { title: 'Neural Curation', desc: 'Allow AI to auto-queue related tracks', active: true },
                 { title: 'Spatial Rendering', desc: 'Enable 3D audio synthesis for compatible tracks', active: false },
                 { title: 'Public Telemetry', desc: 'Share your listening stats with the network', active: true },
               ].map((pref) => (
                 <div key={pref.title} className="flex items-center justify-between group cursor-pointer p-2 rounded-2xl hover:bg-white/5 transition-all">
                    <div>
                       <p className="font-bold text-on-surface text-sm">{pref.title}</p>
                       <p className="text-[10px] text-on-surface-variant font-medium mt-1">{pref.desc}</p>
                    </div>
                    <div className={`w-10 h-5 rounded-full relative transition-colors ${pref.active ? 'bg-primary' : 'bg-surface-mid'}`}>
                       <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${pref.active ? 'right-1' : 'left-1 shadow-lg shadow-black/20'}`} />
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Security */}
         <div className="bg-surface-low rounded-[32px] p-10 ghost-border relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/5 blur-[80px] rounded-full" />
            <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-8 flex items-center gap-3">
               <span className="material-symbols-outlined text-secondary">security</span>
               Protection & Access
            </h4>
            
            <div className="space-y-4">
               <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-high/50 hover:bg-surface-high transition-all border border-white/5 group">
                  <span className="text-sm font-bold text-on-surface">Change Encryption Pass</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
               </button>
               <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-high/50 hover:bg-surface-high transition-all border border-white/5 group">
                  <span className="text-sm font-bold text-on-surface">Manage Linked Bio-Nodes</span>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
               </button>
               <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-high/50 hover:bg-surface-high transition-all border border-white/5 group">
                  <span className="text-sm font-bold text-on-surface text-red-400">Deactivate Neural Link</span>
                  <span className="material-symbols-outlined text-[18px] text-red-500/50 group-hover:translate-x-1 transition-transform">delete_forever</span>
               </button>
            </div>
            
            <div className="mt-10 p-5 rounded-2xl bg-primary/5 border border-primary/10">
               <p className="text-[10px] uppercase font-black tracking-widest text-primary mb-2">Access Token v2.4</p>
               <p className="text-[11px] text-on-surface-variant leading-relaxed">Your data is secured with quantum-lattice encryption. No third-party nodes have access to your sonic telemetry.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Account;
