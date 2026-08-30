import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Compass, ArrowDown, Sparkles } from 'lucide-react';
import { JOURNEY_LEVELS } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const Journey: React.FC = () => {
  return (
    <section id="journey" className="py-20 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-16">
        <div className="w-1.5 h-8 bg-[#4DA3FF] rounded-full shadow-[0_0_10px_#4DA3FF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>ORIGIN STORY</span>
            <Compass className="w-5 h-5 text-[#4DA3FF] animate-spin-slow" />
          </h2>
          <p className="text-xs font-mono text-slate-400">Interactive Development Map & Level Unlocks</p>
        </div>
      </div>

      {/* Level Progression Map Container */}
      <div className="relative pl-6 sm:pl-10 space-y-12">
        {/* Connecting Vertical Cyber Line */}
        <div className="absolute left-[19px] sm:left-[35px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#35E5FF] via-[#4DA3FF] to-[#8D7BFF] shadow-[0_0_8px_#35E5FF]" />

        {JOURNEY_LEVELS.map((item, idx) => {
          const isCurrent = item.isCurrent;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              onMouseEnter={() => soundFx.playHover()}
              className="relative group"
            >
              {/* Level Node Pin */}
              <div
                className={`absolute -left-[30px] sm:-left-[46px] top-1.5 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCurrent
                    ? 'bg-[#8D7BFF] border-white shadow-[0_0_20px_#8D7BFF] scale-110'
                    : 'bg-[#0A1020] border-[#35E5FF] group-hover:border-white group-hover:shadow-[0_0_15px_#35E5FF]'
                }`}
              >
                {isCurrent ? (
                  <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#35E5FF]" />
                )}
              </div>

              {/* Card Container */}
              <div
                className={`cyber-glass p-6 rounded-xl border transition-all duration-300 relative cyber-glass-hover ${
                  isCurrent
                    ? 'border-[#8D7BFF]/60 bg-[#8D7BFF]/10 shadow-[0_0_25px_rgba(141,123,255,0.15)]'
                    : 'border-[#35E5FF]/20 hover:border-[#35E5FF]/50'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2 font-mono">
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded tracking-wider ${
                      isCurrent
                        ? 'bg-[#8D7BFF] text-white shadow-[0_0_10px_#8D7BFF]'
                        : 'bg-[#35E5FF]/10 text-[#35E5FF] border border-[#35E5FF]/30'
                    }`}
                  >
                    {item.level}
                  </span>
                  {isCurrent && (
                    <span className="text-xs text-[#8D7BFF] font-semibold flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 animate-bounce" />
                      ACTIVE STAGE
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-heading text-white tracking-wide mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed font-sans">
                  {item.description}
                </p>

                {/* Level Step Pointer */}
                {idx < JOURNEY_LEVELS.length - 1 && (
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1 text-[11px] font-mono text-slate-400">
                    <span>NEXT LEVEL UNLOCK</span>
                    <ArrowDown className="w-3 h-3 text-[#35E5FF]" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
