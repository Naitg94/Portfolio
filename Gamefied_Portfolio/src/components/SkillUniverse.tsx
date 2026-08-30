import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, Cpu, Code, Database, Bot, Wrench, Sparkles, Filter } from 'lucide-react';
import { SKILL_NODES } from '../data/portfolioData';
import type { SkillNode } from '../data/portfolioData';
import { soundFx } from '../utils/sound';

export const SkillUniverse: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeSkill, setActiveSkill] = useState<SkillNode | null>(null);

  const categories = [
    'ALL',
    'PROGRAMMING',
    'FRONTEND',
    'BACKEND / SYSTEMS',
    'AI & INTELLIGENT SYSTEMS',
    'TOOLS & PLATFORMS',
  ];

  const filteredSkills =
    selectedCategory === 'ALL'
      ? SKILL_NODES
      : SKILL_NODES.filter((s) => s.category === selectedCategory);

  const handleCategorySelect = (cat: string) => {
    soundFx.playClick();
    setSelectedCategory(cat);
    setActiveSkill(null);
  };

  const handleSkillClick = (skill: SkillNode) => {
    soundFx.playUnlock();
    setActiveSkill(activeSkill?.name === skill.name ? null : skill);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'PROGRAMMING':
        return <Code className="w-4 h-4 text-[#35E5FF]" />;
      case 'FRONTEND':
        return <Cpu className="w-4 h-4 text-[#4DA3FF]" />;
      case 'BACKEND / SYSTEMS':
        return <Database className="w-4 h-4 text-[#8D7BFF]" />;
      case 'AI & INTELLIGENT SYSTEMS':
        return <Bot className="w-4 h-4 text-emerald-400" />;
      case 'TOOLS & PLATFORMS':
        return <Wrench className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#35E5FF]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'BUILDING WITH':
        return 'text-[#35E5FF] border-[#35E5FF]/40 bg-[#35E5FF]/10 shadow-[0_0_10px_rgba(53,229,255,0.2)]';
      case 'LEARNING':
        return 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10 shadow-[0_0_10px_rgba(52,211,153,0.2)]';
      case 'WORKING WITH':
        return 'text-[#4DA3FF] border-[#4DA3FF]/40 bg-[#4DA3FF]/10 shadow-[0_0_10px_rgba(77,163,255,0.2)]';
      case 'EXPLORING':
        return 'text-[#8D7BFF] border-[#8D7BFF]/40 bg-[#8D7BFF]/10 shadow-[0_0_10px_rgba(141,123,255,0.2)]';
      default:
        return 'text-slate-300 border-slate-700 bg-slate-800/40';
    }
  };

  return (
    <section id="skills" className="py-20 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-1.5 h-8 bg-[#8D7BFF] rounded-full shadow-[0_0_10px_#8D7BFF]" />
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white tracking-wider flex items-center gap-3">
            <span>SKILL UNIVERSE</span>
            <Network className="w-5 h-5 text-[#8D7BFF]" />
          </h2>
          <p className="text-xs font-mono text-slate-400">Connected Technology Nodes & Proficiency Parameters</p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-10 font-mono text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 pr-2 border-r border-[#35E5FF]/20 mr-1">
          <Filter className="w-3.5 h-3.5 text-[#35E5FF]" />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              onMouseEnter={() => soundFx.playHover()}
              className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#35E5FF] to-[#4DA3FF] text-[#05070D] font-bold shadow-[0_0_12px_#35E5FF]'
                  : 'cyber-glass text-slate-300 hover:text-[#35E5FF] hover:border-[#35E5FF]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skill Constellation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredSkills.map((skill, idx) => {
          const isSelected = activeSkill?.name === skill.name;
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              onClick={() => handleSkillClick(skill)}
              onMouseEnter={() => soundFx.playHover()}
              className={`cyber-glass p-4 rounded-xl border transition-all duration-300 cursor-pointer relative group flex flex-col justify-between min-h-[110px] ${
                isSelected
                  ? 'border-[#35E5FF] bg-[#35E5FF]/15 shadow-[0_0_25px_rgba(53,229,255,0.3)] scale-105'
                  : 'border-[#35E5FF]/20 hover:border-[#35E5FF]/60 hover:shadow-[0_0_15px_rgba(53,229,255,0.15)]'
              }`}
            >
              {/* Category Icon Badge */}
              <div className="flex items-center justify-between mb-2">
                <div className="p-1.5 rounded-lg bg-[#080C16] border border-[#35E5FF]/20">
                  {getCategoryIcon(skill.category)}
                </div>
                <span className="w-2 h-2 rounded-full bg-[#35E5FF] opacity-50 group-hover:opacity-100 group-hover:animate-ping" />
              </div>

              {/* Node Name */}
              <div>
                <h4 className="text-sm sm:text-base font-bold font-heading text-white tracking-wide mb-1 group-hover:text-[#35E5FF] transition-colors">
                  {skill.name}
                </h4>

                {/* Status Badge */}
                <div className="mt-2">
                  <span
                    className={`inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${getStatusColor(
                      skill.status
                    )}`}
                  >
                    {skill.status}
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Selected Skill Information HUD Modal / Drawer */}
      <AnimatePresence>
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="mt-8 p-6 cyber-glass rounded-xl border border-[#35E5FF]/40 bg-[#0A1020]/90 font-mono shadow-2xl relative cyber-border-corner"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#35E5FF]/20">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[#35E5FF]/10 text-[#35E5FF]">
                  {getCategoryIcon(activeSkill.category)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white font-heading tracking-wide">
                    {activeSkill.name}
                  </h3>
                  <span className="text-xs text-slate-400">{activeSkill.category}</span>
                </div>
              </div>
              <button
                onClick={() => setActiveSkill(null)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-[#080C16] border border-slate-800"
              >
                CLOSE [X]
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400">PROFICIENCY STATUS:</span>
                <span className="ml-2 text-[#35E5FF] font-bold">{activeSkill.status}</span>
              </div>
              <div>
                <span className="text-slate-400">NODE ID:</span>
                <span className="ml-2 text-slate-200">SKILL_NODE_{activeSkill.name.toUpperCase().replace(/[^A-Z]/g, '_')}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
