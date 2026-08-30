import React from 'react';
import { motion } from 'framer-motion';
import { Layers3, User, Sparkles, ChevronDown } from 'lucide-react';
import { PLAYER_PROFILE } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const handleAction = (sectionId: string) => {
    soundFx.playClick();
    onNavigate(sectionId);
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 pt-20 pb-12 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(53,229,255,0.12)_0%,rgba(141,123,255,0.05)_50%,transparent_70%)] pointer-events-none rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto text-center z-10 space-y-6">
        {/* System Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full cyber-glass border border-[#35E5FF]/40 text-xs font-mono text-[#35E5FF] shadow-[0_0_15px_rgba(53,229,255,0.2)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#35E5FF] animate-pulse" />
          <span className="font-semibold tracking-wider">SYSTEM STATUS: ONLINE</span>
          <Sparkles className="w-3.5 h-3.5 ml-1 text-[#8D7BFF]" />
        </motion.div>

        {/* Main Name Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold font-heading tracking-tight text-white">
            {PLAYER_PROFILE.name.toUpperCase()}
          </h1>
          <div className="inline-block text-base sm:text-xl font-mono font-medium text-[#35E5FF] tracking-widest uppercase">
            {PLAYER_PROFILE.role}
          </div>
        </motion.div>

        {/* Cinematic Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="py-2"
        >
          <p className="text-xl sm:text-2xl md:text-3xl font-heading font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#35E5FF] via-[#4DA3FF] to-[#8D7BFF] max-w-3xl mx-auto leading-tight">
            "{PLAYER_PROFILE.tagline}"
          </p>
        </motion.div>

        {/* Intro Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          {PLAYER_PROFILE.intro}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 font-mono"
        >
          <button
            onClick={() => handleAction('projects')}
            onMouseEnter={() => soundFx.playHover()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-sm tracking-wider hover:shadow-[0_0_25px_rgba(53,229,255,0.5)] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Layers3 className="w-4 h-4" />
            <span>EXPLORE PROJECTS</span>
          </button>

          <button
            onClick={() => handleAction('profile')}
            onMouseEnter={() => soundFx.playHover()}
            className="w-full sm:w-auto px-8 py-3.5 rounded-lg cyber-glass border border-[#35E5FF]/40 text-slate-100 font-bold text-sm tracking-wider hover:text-[#35E5FF] hover:border-[#35E5FF] transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <User className="w-4 h-4 text-[#35E5FF]" />
            <span>VIEW PROFILE</span>
          </button>
        </motion.div>
      </div>

      {/* Down Scroll Indicator */}
      <motion.button
        onClick={() => handleAction('profile')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-400 hover:text-[#35E5FF] transition-colors cursor-pointer"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.button>
    </section>
  );
};
