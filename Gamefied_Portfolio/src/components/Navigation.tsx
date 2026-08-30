import React, { useState } from 'react';
import { Volume2, VolumeX, Download, Menu, X, Cpu } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onNavigate,
}) => {
  const [isMuted, setIsMuted] = useState(soundFx.getMutedState());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'profile', label: 'PROFILE' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'achievements', label: 'ACHIEVEMENTS' },
    { id: 'education', label: 'EDUCATION' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleAudioToggle = () => {
    const muted = soundFx.toggleMute();
    setIsMuted(muted);
  };

  const handleItemClick = (id: string) => {
    soundFx.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Floating Cyber HUD Navbar */}
      <header className="fixed top-4 left-0 right-0 z-40 hidden md:flex justify-center px-4 pointer-events-none">
        <nav className="pointer-events-auto cyber-glass px-5 py-2.5 rounded-full flex items-center gap-6 border border-[#35E5FF]/20 shadow-[0_0_20px_rgba(53,229,255,0.1)]">
          {/* Logo / Brand Indicator */}
          <button
            onClick={() => handleItemClick('hero')}
            className="flex items-center gap-2 pr-2 border-r border-[#35E5FF]/20 text-xs font-mono font-bold text-white hover:text-[#35E5FF] transition-colors cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-[#35E5FF]" />
            <span className="tracking-wider">NAITIK.OS</span>
          </button>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 font-mono text-xs">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => soundFx.playHover()}
                  className={`px-3 py-1.5 rounded-full transition-all cursor-pointer relative ${
                    isActive
                      ? 'text-[#05070D] font-bold bg-[#35E5FF] shadow-[0_0_12px_#35E5FF]'
                      : 'text-slate-300 hover:text-[#35E5FF] hover:bg-[#35E5FF]/10'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* HUD Utility Actions */}
          <div className="flex items-center gap-2 pl-3 border-l border-[#35E5FF]/20">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
              className="p-1.5 rounded-full text-slate-300 hover:text-[#35E5FF] hover:bg-[#35E5FF]/10 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-slate-500" />
              ) : (
                <Volume2 className="w-4 h-4 text-[#35E5FF]" />
              )}
            </button>

            {/* Download Resume Button */}
            <a
              href="/Naitik_Goyal_Resume.pdf"
              download="Naitik_Goyal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFx.playClick()}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30 hover:bg-[#4DA3FF] hover:text-[#05070D] transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>RESUME</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Mobile Floating HUD Top Bar */}
      <div className="fixed top-3 left-3 right-3 z-40 md:hidden flex items-center justify-between px-4 py-2.5 cyber-glass rounded-xl border border-[#35E5FF]/25">
        <button
          onClick={() => handleItemClick('hero')}
          className="flex items-center gap-2 text-xs font-mono font-bold text-white"
        >
          <Cpu className="w-4 h-4 text-[#35E5FF]" />
          <span>NAITIK.OS</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Resume PDF Mobile Link */}
          <a
            href="/Naitik_Goyal_Resume.pdf"
            download="Naitik_Goyal_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-[#4DA3FF]/15 text-[#4DA3FF] border border-[#4DA3FF]/30"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>

          {/* Audio toggle */}
          <button
            onClick={handleAudioToggle}
            className="p-1.5 text-slate-300 rounded border border-[#35E5FF]/20"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#35E5FF]" />}
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#35E5FF] rounded border border-[#35E5FF]/30"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#05070D]/95 backdrop-blur-xl md:hidden pt-20 px-6 pb-8 flex flex-col justify-between font-mono">
          <div className="space-y-3">
            <div className="text-xs text-slate-400 border-b border-[#35E5FF]/20 pb-2 mb-4">
              SYSTEM NAVIGATION MENU
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center justify-between text-sm transition-all ${
                    isActive
                      ? 'bg-[#35E5FF] text-[#05070D] font-bold shadow-[0_0_15px_#35E5FF]'
                      : 'text-slate-200 border border-[#35E5FF]/10 hover:border-[#35E5FF]/40'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-60">›</span>
                </button>
              );
            })}
          </div>

          <div className="pt-6 border-t border-[#35E5FF]/20">
            <a
              href="/Naitik_Goyal_Resume.pdf"
              download="Naitik_Goyal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 rounded bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-sm"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
