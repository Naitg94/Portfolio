import React from 'react';
import { ArrowUp, Mail, Zap, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_CONTENT } from '../data/content';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSocialIcon = (icon: 'github' | 'linkedin' | 'email') => {
    switch (icon) {
      case 'github':
        return <GithubIcon className="w-4 h-4" />;
      case 'linkedin':
        return <LinkedinIcon className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950/80 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Mini Strip: Engineering Credibility */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/60 dark:border-zinc-800/60 text-xs">
          <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">{PORTFOLIO_CONTENT.statusBadge}</span>
            <span className="text-zinc-400">({PORTFOLIO_CONTENT.availableFrom})</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Sub-second FCP</span>
            </span>
            <span>·</span>
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
              <span>Strict TypeScript</span>
            </span>
          </div>
        </div>

        {/* Bottom Bar: Brand & Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
          {/* Left: Brand & Monogram */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              NG
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              © {new Date().getFullYear()} {PORTFOLIO_CONTENT.name} · Architected for performance & accessibility.
            </p>
          </div>

          {/* Right: Social Links & Back to Top */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {PORTFOLIO_CONTENT.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-lg text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 transition-colors"
                >
                  {getSocialIcon(social.icon)}
                </a>
              ))}
            </div>

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />

            <button
              onClick={scrollToTop}
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/80 cursor-pointer"
              aria-label="Back to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
