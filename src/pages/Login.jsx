import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

import { logo } from '../assets';
import { setLoggedIn } from '../redux/features/playerSlice';

const Login = () => {
  const [email, setEmail] = useState('testuser@gmail.com');
  const [password, setPassword] = useState('testUser@');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const isAuthorized = (email === 'zxprgaming27@gmail.com' && password === 'zxpr27@') || 
                        (email === 'testuser@gmail.com' && password === 'testUser@');
    
    if (isAuthorized) {
      dispatch(setLoggedIn(true));
      navigate('/');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden font-body px-6">
      {/* Expansive Full-Page Aurora Background for Login */}
      <div className="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-primary/20 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[1200px] h-[1200px] bg-secondary/10 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute top-[20%] left-[-10%] w-[800px] h-[800px] bg-tertiary/10 blur-[150px] rounded-full animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[-5%] w-[900px] h-[900px] bg-primary/15 blur-[150px] rounded-full animate-pulse" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full max-w-[450px] z-10"
      >
        <div className="glass-heavy ghost-border rounded-[32px] p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl bg-surface-mid/40">
           {/* Logo Section */}
           <div className="flex flex-col items-center mb-10">
              <div className="w-16 h-16 mb-4 p-2 bg-surface-high rounded-2xl flex items-center justify-center shadow-neon-glow">
                 <img src={logo} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-3xl font-black text-white font-headline tracking-tighter uppercase mb-1">Aurality</h1>
              <p className="text-xs text-on-surface-variant font-bold uppercase tracking-[0.2em] opacity-60">Sonic Authentication</p>
           </div>

           <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant ml-1">Email Domain</label>
                 <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[20px]">alternate_email</span>
                    <input 
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full bg-surface-high/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                      required
                    />
                 </div>
              </div>

              <div className="space-y-2">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-xs font-black uppercase tracking-widest text-on-surface-variant">Access Code</label>
                    <button type="button" className="text-[10px] uppercase font-bold text-primary hover:underline transition-all">Forgot Pass?</button>
                 </div>
                 <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors text-[20px]">lock</span>
                    <input 
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface-high/50 border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all"
                      required
                    />
                 </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center"
                >
                   {error}
                </motion.div>
              )}

              <button 
                type="submit"
                className="w-full bg-gradient-to-br from-primary to-primary-dim py-4 rounded-xl text-on-primary font-black uppercase tracking-widest text-sm shadow-neon-lg hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                Establish Connection
              </button>
           </form>

           <div className="mt-10 pt-10 border-t border-white/5 text-center">
              <p className="text-xs text-on-surface-variant font-bold mb-4 uppercase tracking-widest">or login with</p>
              <div className="flex gap-4 justify-center">
                 {['google', 'apple', 'facebook'].map(provider => (
                   <button key={provider} className="w-12 h-12 rounded-xl bg-surface-high/50 flex items-center justify-center hover:bg-surface-high transition-colors cursor-pointer group">
                      <span className={`material-symbols-outlined text-on-surface-variant group-hover:text-white transition-colors`}>{provider === 'apple' ? 'logo_apple' : (provider === 'facebook' ? 'facebook' : 'auto_awesome')}</span>
                   </button>
                 ))}
              </div>
           </div>

           <div className="mt-8 text-center text-[10px] text-on-surface-variant/40 uppercase tracking-[0.2em] font-black">
              Aurality Quantum Authorization v1.0
           </div>
        </div>

        <div className="mt-8 text-center">
           <p className="text-on-surface-variant text-sm font-medium">
             Don't have an endpoint? <Link to="/signup" className="text-primary font-bold hover:underline">Request Access</Link>
           </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
