import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings as SettingsIcon, 
  User, 
  Music2, 
  Palette, 
  ShieldCheck, 
  Volume2, 
  Globe, 
  Zap, 
  LogOut,
  ChevronRight,
  ShieldHalf
} from 'lucide-react';

const Settings = () => {
  const [audioQuality, setAudioQuality] = useState(localStorage.getItem('aurality-quality') || 'High');
  const [normalization, setNormalization] = useState(JSON.parse(localStorage.getItem('aurality-norm')) || true);
  const [auroraIntensity, setAuroraIntensity] = useState(localStorage.getItem('aurality-aurora') || 50);
  const [publishActivity, setPublishActivity] = useState(JSON.parse(localStorage.getItem('aurality-social')) || true);

  useEffect(() => {
    localStorage.setItem('aurality-quality', audioQuality);
    localStorage.setItem('aurality-norm', JSON.stringify(normalization));
    localStorage.setItem('aurality-aurora', auroraIntensity);
    localStorage.setItem('aurality-social', JSON.stringify(publishActivity));
  }, [audioQuality, normalization, auroraIntensity, publishActivity]);

  const SettingSection = ({ icon: Icon, title, children }) => (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Icon size={20} />
        </div>
        <h3 className="text-xl font-bold text-on-surface font-headline uppercase tracking-wider">{title}</h3>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );

  const SettingRow = ({ label, description, children }) => (
    <div className="flex items-center justify-between p-5 rounded-2xl bg-surface-mid/40 ghost-border hover:bg-surface-high/60 transition-all group">
      <div className="flex flex-col gap-1 pr-8">
        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{label}</span>
        {description && <span className="text-xs text-on-surface-variant font-medium opacity-70">{description}</span>}
      </div>
      <div className="flex-shrink-0">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ enabled, setEnabled }) => (
    <button 
      onClick={() => setEnabled(!enabled)}
      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${enabled ? 'bg-primary shadow-neon-sm' : 'bg-surface-highest border border-white/10'}`}
    >
      <motion.div 
        animate={{ x: enabled ? 26 : 4 }}
        className={`absolute top-1 w-4 h-4 rounded-full transition-colors ${enabled ? 'bg-on-primary' : 'bg-on-surface-variant'}`}
      />
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto flex flex-col animate-slowfade py-6">
      <div className="flex items-center justify-between mb-12">
        <div className="flex flex-col">
          <h2 className="font-black text-4xl text-on-surface text-left tracking-tight flex items-center gap-4">
             <div className="p-2.5 rounded-2xl bg-primary/10 text-primary">
               <SettingsIcon size={28} />
             </div>
             Settings
          </h2>
          <p className="text-on-surface-variant font-bold mt-2 ml-14">Configure your personalized Aurality experience.</p>
        </div>
      </div>

      {/* Account Section */}
      <SettingSection icon={User} title="Account Management">
        <div className="p-6 rounded-2xl bg-surface-mid/40 ghost-border flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full border-2 border-primary p-0.5">
               <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDah5dJUJWGignZGqs0tYazIDvb3ToSs3HRPLgkyHOKmJkHCVXadqPjhz1vF22pelQuqyKdxKDRsZ0mxjLAeWPIfHrnY-vkxZ899TtDCjWERQuZZRt-WtQyK78DJ6Y8qWBjSRSc37eSFsQnheZhzeg0sd6qtkbTuWFtpw37SdLThibhjAZd_ywk5dOpCbz9ZkTjvOHrg3Aieqq7G_bO_C1VDmyf5Y-dSLfvq1t6ybIFzLZv0j2cYzZZrwnICYvtZXHaZggNcy2mVjfN" alt="Profile" className="w-full h-full rounded-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-on-surface">zxpr27</span>
              <span className="text-sm text-on-surface-variant font-bold">Premium Cybernetic Account</span>
            </div>
          </div>
          <button className="px-6 py-2.5 rounded-xl bg-surface-highest text-on-surface font-bold text-sm border border-white/5 hover:border-primary/50 transition-all">Edit Profile</button>
        </div>
        <SettingRow label="Change Password" description="Last updated 3 months ago">
          <ChevronRight className="text-on-surface-variant hover:text-primary transition-colors cursor-pointer" />
        </SettingRow>
        <SettingRow label="Session Security" description="Currently logged in from 2 devices">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded-md">High Security</span>
        </SettingRow>
      </SettingSection>

      {/* Audio Quality Section */}
      <SettingSection icon={Music2} title="Audio Fidelity">
        <SettingRow label="Streaming Quality" description="Higher quality uses more data">
          <div className="flex bg-surface-highest rounded-xl p-1 gap-1">
            {['Auto', 'High', 'Data'].map((q) => (
              <button 
                key={q}
                onClick={() => setAudioQuality(q)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${audioQuality === q ? 'bg-primary text-on-primary shadow-neon-sm' : 'text-on-surface-variant hover:text-white'}`}
              >
                {q}
              </button>
            ))}
          </div>
        </SettingRow>
        <SettingRow label="Audio Normalization" description="Same volume level for all tracks">
          <Toggle enabled={normalization} setEnabled={setNormalization} />
        </SettingRow>
        <SettingRow label="Hardware Acceleration" description="Use GPU for decoding (Restarts required)">
           <Toggle enabled={true} setEnabled={() => {}} />
        </SettingRow>
      </SettingSection>

      {/* Appearance Section */}
      <SettingSection icon={Palette} title="Aesthetic Controls">
        <SettingRow label="Aurora Intensity" description="Speed and glow of background animations">
           <div className="flex items-center gap-4">
             <input 
               type="range" 
               min="0" 
               max="100" 
               value={auroraIntensity}
               onChange={(e) => setAuroraIntensity(e.target.value)}
               className="w-32 h-1.5 bg-surface-highest rounded-full overflow-hidden appearance-none cursor-pointer accent-primary"
             />
             <span className="text-[10px] font-black w-6 text-primary">{auroraIntensity}%</span>
           </div>
        </SettingRow>
        <SettingRow label="App Theme" description="Current: Neon Nocturne (Default)">
           <div className="flex gap-2">
              <div className="w-5 h-5 rounded-full bg-primary shadow-neon-sm ring-2 ring-white/20" />
              <div className="w-5 h-5 rounded-full bg-tertiary opacity-30 hover:opacity-100 transition-opacity cursor-pointer" />
              <div className="w-5 h-5 rounded-full bg-secondary opacity-30 hover:opacity-100 transition-opacity cursor-pointer" />
           </div>
        </SettingRow>
      </SettingSection>

      {/* Social & Privacy Section */}
      <SettingSection icon={ShieldHalf} title="Social & Privacy">
        <SettingRow label="Publish listening activity" description="Followers can see what you play">
          <Toggle enabled={publishActivity} setEnabled={setPublishActivity} />
        </SettingRow>
        <SettingRow label="Private Session" description="Temporary pause sharing with followers">
          <Toggle enabled={false} setEnabled={() => {}} />
        </SettingRow>
      </SettingSection>

      <div className="pt-10 flex border-t border-white/5">
         <button className="flex items-center gap-3 px-8 py-4 bg-red-500/10 text-red-500 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all group">
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            Sign Out of Account
         </button>
      </div>
    </div>
  );
};

export default Settings;
