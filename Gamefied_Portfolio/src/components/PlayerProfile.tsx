import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, MapPin, Cpu, Activity, Download, Shield } from 'lucide-react';
import { PLAYER_PROFILE } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const PlayerProfile: React.FC = () => {
  return (
    <section id="profile" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Title */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-1.5 h-8 bg-[#35E5FF] rounded-full shadow-[0_0_10px_#35E5FF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>PLAYER PROFILE</span>
            <span className="text-xs font-mono text-[#35E5FF] px-2.5 py-0.5 rounded border border-[#35E5FF]/30 bg-[#35E5FF]/10">
              HUD ID: #001
            </span>
          </h2>
          <p className="text-xs font-mono text-slate-400">Core Developer Identity & Parameters</p>
        </div>
      </div>

      {/* Main Grid: Visual AI Holographic Core (Left) + Player Data Panel (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Holographic Visual Core Node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 flex flex-col items-center justify-center p-8 cyber-glass rounded-2xl border border-[#35E5FF]/30 relative overflow-hidden group shadow-[0_0_30px_rgba(53,229,255,0.08)]"
        >
          {/* Ambient Background Pulse */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#35E5FF]/10 via-transparent to-[#8D7BFF]/10 pointer-events-none" />

          {/* Animated Futuristic Hologram Core */}
          <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center my-4">
            {/* Outer Rotating Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#35E5FF]/50 animate-[spin_12s_linear_infinite]" />
            
            {/* Middle Reverse Ring */}
            <div className="absolute inset-3 rounded-full border border-dotted border-[#8D7BFF]/60 animate-[spin_8s_linear_infinite_reverse]" />
            
            {/* Inner Glowing Orb */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#35E5FF] via-[#4DA3FF] to-[#8D7BFF] animate-pulse flex items-center justify-center shadow-[0_0_40px_#35E5FF]">
              <Cpu className="w-12 h-12 text-[#05070D]" />
            </div>

            {/* Orbiting Satellite Dots */}
            <div className="absolute top-2 left-1/2 w-2 h-2 rounded-full bg-[#35E5FF] shadow-[0_0_8px_#35E5FF]" />
            <div className="absolute bottom-2 right-1/4 w-2 h-2 rounded-full bg-[#8D7BFF] shadow-[0_0_8px_#8D7BFF]" />
          </div>

          <div className="text-center space-y-1 font-mono z-10 mt-2">
            <div className="text-xs text-[#35E5FF] font-semibold tracking-widest uppercase">
              AI Holographic Identity Matrix
            </div>
            <div className="text-xs text-slate-400">STATUS: ACTIVE // 100% OPERATIONAL</div>
          </div>
        </motion.div>

        {/* Player Data Card Specifications */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="lg:col-span-7 cyber-glass p-6 sm:p-8 rounded-2xl border border-[#35E5FF]/30 space-y-6 shadow-2xl relative cyber-border-corner"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-[#35E5FF]/20 pb-4">
            <div className="flex items-center gap-2 text-sm font-mono font-bold text-white">
              <Shield className="w-4 h-4 text-[#35E5FF]" />
              <span>PLAYER CHARACTER DATA</span>
            </div>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              ONLINE
            </span>
          </div>

          {/* Data List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono text-sm">
            <div className="space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-[#35E5FF]" />
                <span>NAME</span>
              </div>
              <div className="text-base font-bold text-white font-heading tracking-wide">
                {PLAYER_PROFILE.name}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#4DA3FF]" />
                <span>ROLE</span>
              </div>
              <div className="text-sm font-semibold text-[#35E5FF]">
                {PLAYER_PROFILE.role}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#8D7BFF]" />
                <span>LOCATION</span>
              </div>
              <div className="text-sm text-slate-200">
                {PLAYER_PROFILE.location}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                <span>STATUS</span>
              </div>
              <div className="text-sm font-semibold text-emerald-300">
                {PLAYER_PROFILE.status}
              </div>
            </div>

            <div className="sm:col-span-2 space-y-1 pt-2 border-t border-[#35E5FF]/10">
              <div className="text-xs text-slate-400">CURRENT PATH</div>
              <div className="text-sm text-slate-200 leading-relaxed bg-[#080C16] p-3 rounded-lg border border-[#35E5FF]/20">
                {PLAYER_PROFILE.currentPath}
              </div>
            </div>
          </div>

          {/* Action: Download Resume Button */}
          <div className="pt-4 border-t border-[#35E5FF]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
            <span className="text-xs text-slate-400">
              Official Verified Resume Document Available
            </span>
            <a
              href="/Naitik_Goyal_Resume.pdf"
              download="Naitik_Goyal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-xs tracking-wider hover:shadow-[0_0_20px_#35E5FF] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
