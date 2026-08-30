import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Gamepad2, Briefcase, CheckCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ACHIEVEMENTS } from '../data/portfolioData';
import type { Achievement } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const AchievementVault: React.FC = () => {
  const triggerUnlockEffect = (_achievement: Achievement) => {
    soundFx.playUnlock();

    // Trigger subtle confetti burst
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#35E5FF', '#4DA3FF', '#8D7BFF']
    });
  };

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'CERTIFICATION':
        return <Award className="w-6 h-6 text-[#35E5FF]" />;
      case 'EVENT':
        return <Gamepad2 className="w-6 h-6 text-[#4DA3FF]" />;
      case 'EXPERIENCE':
        return <Briefcase className="w-6 h-6 text-[#8D7BFF]" />;
      default:
        return <Trophy className="w-6 h-6 text-[#35E5FF]" />;
    }
  };

  return (
    <section id="achievements" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-12">
        <div className="w-1.5 h-8 bg-[#35E5FF] rounded-full shadow-[0_0_10px_#35E5FF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>ACHIEVEMENT VAULT</span>
            <Trophy className="w-5 h-5 text-[#35E5FF]" />
          </h2>
          <p className="text-xs font-mono text-slate-400">System Milestones & Collectible Badges</p>
        </div>
      </div>

      {/* Achievements Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
            onClick={() => triggerUnlockEffect(item)}
            onMouseEnter={() => soundFx.playHover()}
            className="cyber-glass p-6 rounded-2xl border border-[#35E5FF]/30 hover:border-[#35E5FF] transition-all duration-300 cursor-pointer relative group flex flex-col justify-between cyber-glass-hover shadow-xl"
          >
            {/* Top Badge Banner */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-[#080C16] border border-[#35E5FF]/30 group-hover:border-[#35E5FF] transition-colors">
                  {getAchievementIcon(item.type)}
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>UNLOCKED</span>
                </div>
              </div>

              {/* Title & Metadata */}
              <h3 className="text-lg font-bold font-heading text-white tracking-wide mb-2 group-hover:text-[#35E5FF] transition-colors">
                {item.title}
              </h3>

              {item.organization && (
                <div className="text-xs font-mono text-[#35E5FF] font-semibold mb-1">
                  {item.organization} {item.date ? `// ${item.date}` : ''}
                </div>
              )}

              {item.assessmentScore && (
                <div className="inline-block mb-3 px-2.5 py-0.5 rounded bg-[#35E5FF]/10 text-[#35E5FF] border border-[#35E5FF]/30 text-xs font-mono font-bold">
                  FINAL ASSESSMENT: {item.assessmentScore}
                </div>
              )}

              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed mt-2">
                {item.description}
              </p>

              {/* Event Activities bullet points if available */}
              {item.activities && (
                <div className="mt-3 space-y-1.5 font-mono text-xs text-slate-300 border-t border-slate-800 pt-3">
                  {item.activities.map((act, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <span className="text-[#4DA3FF]">›</span>
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Interaction Hint */}
            <div className="mt-6 pt-3 border-t border-[#35E5FF]/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="group-hover:text-[#35E5FF] transition-colors flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#35E5FF]" />
                CLICK TO INSPECT BADGE
              </span>
              <span className="text-slate-500">#UNLOCK_0{idx + 1}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
