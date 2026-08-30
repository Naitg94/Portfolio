import React from 'react';
import { Cpu, Mail, ArrowUp } from 'lucide-react';
import { CONTACT_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { soundFx } from '../utils/sound';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#35E5FF]/20 bg-[#05070D] py-12 px-4 font-mono text-xs text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Branding & Status */}
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-base font-bold text-white font-heading">
            <Cpu className="w-5 h-5 text-[#35E5FF]" />
            <span>NAITIK.OS</span>
            <span className="text-xs text-slate-500 font-mono font-normal">v2.6.0</span>
          </div>
          <p className="text-slate-300">
            SYSTEM SESSION COMPLETE // THANKS FOR EXPLORING.
          </p>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>STATUS: STILL BUILDING.</span>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={CONTACT_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#35E5FF] transition-colors p-2 rounded bg-[#080C16] border border-[#35E5FF]/20 flex items-center justify-center"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#35E5FF] transition-colors p-2 rounded bg-[#080C16] border border-[#35E5FF]/20 flex items-center justify-center"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hover:text-[#35E5FF] transition-colors p-2 rounded bg-[#080C16] border border-[#35E5FF]/20 flex items-center justify-center"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#35E5FF]/10 text-[#35E5FF] border border-[#35E5FF]/40 hover:bg-[#35E5FF] hover:text-[#05070D] transition-all cursor-pointer"
              title="Return to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          <div className="text-slate-500">
            © 2026 NAITIK GOYAL. ALL RIGHTS RESERVED.
          </div>
        </div>

      </div>
    </footer>
  );
};
