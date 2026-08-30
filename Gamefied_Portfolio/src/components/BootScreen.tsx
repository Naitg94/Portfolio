import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Zap, ArrowRight, SkipForward } from 'lucide-react';
import { soundFx } from '../utils/sound';

interface BootScreenProps {
  onBootComplete: () => void;
}

export const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const steps = [
    'Initializing Core Kernel...',
    'Loading Developer Profile...',
    'Loading Project Database...',
    'Loading Skill Matrix...',
    'Initializing Interactive Systems...'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 4;
        if (next >= 100) {
          clearInterval(timer);
          setIsReady(true);
          soundFx.playSystemReady();
          return 100;
        }
        
        // Update step based on progress
        const stepIdx = Math.min(
          Math.floor((next / 100) * steps.length),
          steps.length - 1
        );
        setCurrentStep(stepIdx);
        soundFx.playBootStep();
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  const handleEnter = () => {
    soundFx.playUnlock();
    onBootComplete();
  };

  const handleSkip = () => {
    soundFx.playClick();
    onBootComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070D] text-[#35E5FF] px-4 font-mono select-none pointer-events-auto"
      >
        {/* Separate Background Scanline & Radial Overlay (Non-blocking pointer events) */}
        <div className="absolute inset-0 scanline-overlay pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(53,229,255,0.08)_0,transparent_70%)] pointer-events-none z-0" />

        {/* Top Skip Button */}
        <button
          onClick={handleSkip}
          type="button"
          className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded border border-[#35E5FF]/40 bg-[#0A1020]/80 text-xs text-slate-300 hover:text-[#35E5FF] hover:border-[#35E5FF] hover:bg-[#35E5FF]/10 transition-all cursor-pointer z-20 pointer-events-auto"
        >
          <span>SKIP INTRO</span>
          <SkipForward className="w-3.5 h-3.5" />
        </button>

        {/* Boot Terminal Box */}
        <div className="w-full max-w-lg border border-[#35E5FF]/30 bg-[#0A1020]/90 rounded-lg p-6 sm:p-8 shadow-2xl relative cyber-border-corner z-10">
          {/* Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#35E5FF]/20">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-wider text-slate-200">
              <Terminal className="w-4 h-4 text-[#35E5FF]" />
              <span>NAITIK.OS v2.6.0</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#35E5FF] animate-ping" />
              <span className="text-slate-400">BOOTING</span>
            </div>
          </div>

          {/* Title Branding */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white tracking-widest mb-1 text-glow-cyan">
              NAITIK.OS
            </h1>
            <p className="text-xs text-slate-400 tracking-widest uppercase">
              Intelligent Portfolio Operating System
            </p>
          </div>

          {/* Progress Logs */}
          <div className="space-y-3 mb-6 text-xs text-slate-300">
            {steps.slice(0, currentStep + 1).map((step, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="text-[#35E5FF]">›</span> {step}
                </span>
                <span className="text-[#35E5FF] font-semibold">
                  {idx < currentStep || isReady ? '100%' : `${progress}%`}
                </span>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[#080C16] border border-[#35E5FF]/20 rounded-full h-3 p-0.5 mb-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#35E5FF] via-[#4DA3FF] to-[#8D7BFF] rounded-full shadow-[0_0_10px_#35E5FF]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>

          {/* Status & Enter Action */}
          <div className="text-center pt-2">
            {!isReady ? (
              <div className="text-xs text-slate-400 flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-[#35E5FF] animate-bounce" />
                <span>INITIALIZING SYSTEM... {progress}%</span>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#35E5FF]/10 border border-[#35E5FF]/40 text-xs font-semibold text-[#35E5FF]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SYSTEM READY — STATUS: ONLINE</span>
                </div>

                <div>
                  <button
                    onClick={handleEnter}
                    type="button"
                    className="w-full sm:w-auto px-8 py-3.5 rounded bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold text-sm font-heading tracking-wider hover:shadow-[0_0_25px_rgba(53,229,255,0.6)] hover:opacity-95 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 mx-auto cursor-pointer pointer-events-auto relative z-20"
                  >
                    <span>ENTER NAITIK.OS</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
